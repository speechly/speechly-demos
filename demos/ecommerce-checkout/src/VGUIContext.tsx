/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useRef, useState } from 'react'
import { SpeechSegment, SpeechState, useSpeechContext } from '@speechly/react-client'
import { useKeyboardEvent } from '@speechly/react-ui/hooks/useKeyboardEvent'

const USE_VOICE_SAL_CHANGE = false
export const SAL_DEFAULT = 'default'

export type ISpeechlyWidget = {
  name: string
  label: string
  value: string
  onChange: (name: string, value: string) => void
  sal: string
  borderless?: boolean
  classes?: string
}

export type IFocus = {
  id: string | null
  finalId: string | null
  voiceInitiated: boolean
}

export type IVGUIContextProps = {
  setSal?: (name: string) => void,
  setCapture?: (enabled: boolean) => void,
  hotKey?: string,
}

export type IUIAuxState = {
  preFocused: string | null,
  keyboardEditStarted: boolean,
  focusedElement: HTMLElement | null
  programmaticFocusChange: boolean
  lastSegment?: SpeechSegment
  utteranceStarted: boolean
  fieldEdited: boolean
}

const DefaultAuxState: IUIAuxState = {
  preFocused: null,
  fieldEdited: false,
  keyboardEditStarted: false,
  focusedElement: null,
  programmaticFocusChange: false,
  utteranceStarted: false,
}

export const NoSelection: IFocus = {
  id: null,
  finalId: null,
  voiceInitiated: false,
}

export type IVGUIState = {
  focused: IFocus,
  setFocused: React.Dispatch<React.SetStateAction<IFocus>>,
  refMap: Map<string, any>,
  uiState: React.MutableRefObject<IUIAuxState>,
  isFocused: (name: string) => boolean,
  focus: (e: React.FocusEvent<HTMLElement>) => void,
  blur: (e: React.FocusEvent) => void,
}

const DefaultVGUIState: IVGUIState = {
  focused: NoSelection,
  setFocused: () => { throw Error('Not implemented') },
  refMap: new Map(),
  uiState: { current: DefaultAuxState },
  isFocused: (name: string) => false,
  focus: () => { throw Error('Not implemented') },
  blur: () => { throw Error('Not implemented') },
}

const VGUIContext = React.createContext(DefaultVGUIState)

/*
const VGUIReducer = (filters: IFilters, action: any) => {
  switch (action.type) {
    case 'set': {
      const { filterKey, value }: { filterKey: string value: string, segmentId: string } = action
      debugInfo.numFilterChanges.current++
      return {
        ...filters,
        [filterKey]: {
          ...filters[filterKey],
          value: value,
        },
      }
    }
    case 'clear_all': {
      return FilterDefaultState
    }
    case 'clear': {
      const { filterKey }: { filterKey: string } = action
      const { [filterKey]: removedProp, ...filterCopy } = filters
      return filterCopy
    }
    case 'segment': {
      const { segment }: { segment: SpeechSegment } = action
      const segmentId = `${segment.contextId}/${segment.id}`
      if (segmentId !== debugInfo.lastSegmentId) {
        // Track start of new segment
        debugInfo.lastSegmentId = segmentId
        debugInfo.numFilterChanges.last = debugInfo.numFilterChanges.current
        debugInfo.numActiveFilters.last = Object.keys(filters).length
      }
      return filters
    }
    case 'segment_finalized': {
      const { segment }: { segment: SpeechSegment } = action
      if (segment.intent.intent === 'filter') {
        Analytics.trackFiltering(
          debugInfo.numFilterChanges.current-debugInfo.numFilterChanges.last,
          segment.entities.length,
          debugInfo.numActiveFilters.last,
          Object.keys(filters).length,
          segment
        )

      }
      return filters
    }
    default:
      throw new Error()
  }
}
*/

export const VGUIContextProvider: React.FC<IVGUIContextProps> = ({
  setSal = (name: string) => { throw Error('Not implemented') },
  setCapture = (enabled: boolean) => { throw Error('Not implemented') },
  ...props
}) => {
/*
  const [filters, filterDispatch] = useReducer(
    VGUIReducer,
    VGUIContextDefaultState.filters
  )
*/
  const { speechState } = useSpeechContext()
  const [focused, setFocused] = useState<IFocus>(NoSelection)
  const [refMap] = useState(() => new Map())
  const uiState = useRef(DefaultAuxState)

  useKeyboardEvent(
    (event: KeyboardEvent) => onKeyDown(event),
    (event: KeyboardEvent) => {},
    [], // useState dependencies used in the callback, or in the functions used by the callback
  )

  const isFocused = (name: string) => {
    return focused.id === name
  }

  const focus = (e: React.FocusEvent<HTMLElement>) => {
    console.log('Focus')
    // setFocused(e.target.name)
    uiState.current.focusedElement = e.target
    // console.log('Focusing', e.target.name)
    if (!uiState.current.programmaticFocusChange) {
      const field_name = e.target.dataset['name']
      if (field_name) {
        console.log('Focus',field_name)
        setFocused({id: field_name, finalId: field_name, voiceInitiated: false})
      }
    }
    uiState.current.programmaticFocusChange = false
  }

  const blur = (e: React.FocusEvent) => {
    // console.log('Unfocusing ', e.target.name)
    // setFocused(null)
    uiState.current.focusedElement = null
    if (!uiState.current.programmaticFocusChange) {
      setFocused(NoSelection)
      setCapture(true)
      setSal(SAL_DEFAULT)
    }
    uiState.current.programmaticFocusChange = false
  }

  // Programmatically control focus
  useEffect(() => {
    if (focused.id) {
      const inputElement = refMap.get(focused.id)
      // console.log('Focused ref', inputElement)
      if (inputElement) {
        console.log('Focusing...', focused.id, focused.voiceInitiated)
        if (inputElement instanceof HTMLInputElement || inputElement instanceof HTMLTextAreaElement) {
          setCapture(
            focused.voiceInitiated ||
            inputElement.value.length === 0 ||
            ((inputElement.selectionEnd && inputElement.selectionStart) ? inputElement.selectionEnd > inputElement.selectionStart + 1 : false)
          )
        } else {
          setCapture(
            focused.voiceInitiated
          )
        }
        // props.setSal(inputElement.dataset.sal)
      }
    } else {
      console.log('Unfocusing...')
      if (uiState.current.focusedElement) {
        uiState.current.programmaticFocusChange = true
        uiState.current.focusedElement.blur()
        setCapture(true)
        setSal(SAL_DEFAULT)
      }
      uiState.current.keyboardEditStarted = false
    }
  }, [focused.id])
  
  // Control prefocus
  useEffect(() => {
    if (speechState === SpeechState.Recording) {
      uiState.current.preFocused = focused.id
    }
  }, [speechState])
  
  // Unfocus after successful edit
  useEffect(() => {
    if (speechState === SpeechState.Ready) {
      if (uiState.current.fieldEdited || !USE_VOICE_SAL_CHANGE) {
        setFocused(NoSelection)
      }
      if (uiState.current.fieldEdited) {
        // PubSub.publish(SpeechlyUiEvents.DismissNotification)
      }
      uiState.current.fieldEdited = false
    }
  }, [speechState])

  // Turn off keyboard capture if some other key pressed in input field
  const onKeyDown = (e: KeyboardEvent) => {
    if (uiState.current.focusedElement) {
      if (e.key !== props.hotKey) {
        setCapture(false)
      }
    }
  }

  return (
    <VGUIContext.Provider value={{
      focused,
      refMap,
      uiState,
      setFocused,
      isFocused,
      focus,
      blur,
    }}>
      {props.children}
    </VGUIContext.Provider>
  )
}

export default VGUIContext
