import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
  useSpeechContext,
  SpeechState,
  SpeechSegment,
} from '@speechly/react-client'

import './App.css'
import { SpeechlyUiEvents } from '@speechly/react-ui/types'
import VGUIContext, { NoSelection } from '../../VGUIContext'
import TextField from '../TextField'
import './SpeechlyApp.css'
import countries from '../../countries.json'
import Dropdown from '../Dropdown'
import Button from '../Button'

const DEBUG_STATUSLINE = false

type IAppState = IKeys<string | number | null | undefined | Array<any>>

const DefaultAppState: IAppState = {
  name: '',
  email: '',
  zip: '',
  phone: '',
  address: '',
  country: 'FINLAND',
  city: '',
  card_name: '',
  card_number: '',
  card_cvc: '',
  card_expiration: '',
}

const SpeechlyApp: React.FC<{capture: any, sal: any, setCapture: any}> = (props) => {
  const { segment, speechState } = useSpeechContext()
  const [tentativeAppState, setTentativeAppState] = useState(DefaultAppState)
  const [appState, setAppState] = useState(DefaultAppState)
  const {focused, setFocused, refMap, uiState} = useContext(VGUIContext)

  const updateField = (appState: IAppState, field_name: string, value: string, tentative: boolean): IAppState => {
    uiState.current.fieldEdited = true
    return {...appState, [field_name]: value}
  }

  // This effect is fired whenever there's a new speech segment available
  useEffect(() => {
    uiState.current.lastSegment = segment
    if (segment) {
      const alteredState = alterAppState(segment)
      // Set current app state
      if (segment.isFinal) {
        // Remove focus after edit
        console.log('Final state: ',alteredState)
        setTentativeAppState(alteredState)
        selectAllWidgetText()
        // Store the final app state as basis of next utterance
        setAppState(alteredState)
  
      } else {
        // console.log('Tentative state: ',alteredState)
        setTentativeAppState(alteredState)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segment])

  // Create a modified app state by applying the speech segment info to the base state
  const alterAppState = useCallback((segment: SpeechSegment) => {
    // Handle voice input when field is focused
    if (uiState.current.widgetFocused) {
      const newValue = [appState[uiState.current.widgetFocused], ...segment.words.map(w => w.value)].filter(w => w).join(' ')
      if (newValue === appState[uiState.current.widgetFocused]) {
        uiState.current.fieldEdited = false
      } else {
        uiState.current.fieldEdited = true
      }
      const newState = {...appState, [uiState.current.widgetFocused]: newValue}
      return newState
    }
    
    // Handle voice input if no field is focused
    switch (segment.intent.intent) {
      case 'fill':
      {
        let alteredState = appState
        let i = 0
        while (i < segment.entities.length) {
          const entity = segment.entities[i]
          if (i === segment.entities.length - 1)
            setFocused({id: entity.type, finalId: segment.intent.isFinal ? entity.type : null, voiceInitiated: true})

          alteredState = updateField(
            alteredState,
            entity.type,
            entity.value,
            entity.isFinal
          )
          i++
        }
        return alteredState
        break
      }
/*
        case 'noop':
        case 'tasks':
        case 'notes':
        {
          // selection only
          const field_name = segment.intent.intent! as string
          setFocused({id: field_name, finalId: segment.intent.isFinal ? field_name : null, voiceInitiated: true})
          break
        }
        case 'complete':
        {
          const newState = produce(appState, (draft) => {
            const array = draft.tasks as any[]
            let i = 0
            for ( ; i < array.length; i++ ) {
              const listItem: any = array[i]
              if (listItem && (listItem['checked'] as boolean) === false) {
                (listItem['checked'] as boolean) = true
                setFocused(listItem['key'])
                break
              }
            }
            if (i >= array.length) setFocused(NoSelection)
          })
          return newState
        }
        case 'add_task':
        {
          let date = segment.entities
            .find((entity) => entity.type === 'date')
            ?.value
          if (date) {
            const d = new Date(date)
            if (!isNaN(d.valueOf())) {
              date = `${monthAbbreviations[d.getMonth()]} ${d.getDate()}`
            } else {
              date = 'Today'
            }
          } else {
            date = 'Today'
          }
          const collection = 'tasks'
          const key = `${collection}.${uuidv1()}`
          setFocused({id: key, finalId: segment.intent.isFinal ? key : null, voiceInitiated: true})
          const dictation = Dictation.toHTML(Dictation.getDictation(segment))
          uiState.current.fieldEdited = true

          return {...appState, [collection]: [...appState[collection] as [], {...TaskDefaults, value: dictation, due: date, key}] }
        }
        case 'add_note':
        {
          const collection = 'notes'
          const key = `${collection}.${uuidv1()}`
          setFocused({id: key, finalId: segment.intent.isFinal ? key : null, voiceInitiated: true})
          const dictation = Dictation.toHTML(Dictation.getDictation(segment))
          uiState.current.fieldEdited = true

          return {...appState, [collection]: [...appState[collection] as [], {value: dictation, key}] }
        }
*/
    }
    return appState
  }, [appState, focused])

  // Side-effects of state sets
  const selectAllWidgetText = () => {
    if (focused.id) {
      const inputElement = refMap.get(focused.id)
      if (inputElement) {
        inputElement.selectionStart = 0
        inputElement.selectionEnd = inputElement.value.length
      }
    }
  }

  // Help out in case of completely failed utterance
  useEffect(() => {
    switch (speechState) {
      case SpeechState.Recording:
        uiState.current.utteranceStarted = true
        uiState.current.lastSegment = undefined
        break
      case SpeechState.Ready:
        if (uiState.current.utteranceStarted) {
          uiState.current.utteranceStarted = false
          const segment = uiState.current.lastSegment
          if (!segment || segment.words.length === 0) {
            const tips = [
              'Try: \'Name: John Smith\'',
              'Try: \'Phone: +1 123 123 123\'',
            ]
            const tip = tips[Math.floor(Math.random() * tips.length)]
            PubSub.publish(SpeechlyUiEvents.Notification, {message: 'Please say again', footnote: tip})
          }
        }
        break
    }
  }, [speechState])
  
  // Scroll into view. Remember CSS scroll-margins
  useEffect(() => {
    if (focused.id) {
      const inputElement = refMap.get(focused.id)
      if (inputElement) {
        inputElement.scrollIntoView({behavior: 'smooth'})
      }
    }
  }, [focused.finalId])
  
  const change = (name: string, value: string) => {
    if (props.capture) {
      return
    }

    // Enable hotkey when possible: In case of an empty field
    if (value.length === 0) {
      props.setCapture(true)
    }
    const newState = {...appState, [name]: value}
    console.log(newState)
    setTentativeAppState(newState)
    setAppState(newState)
  }

  // Render the app state as outlined boxes representing rooms with devices in them
  return (
    <>
      { DEBUG_STATUSLINE && 
        <div style={{position: 'fixed', bottom:'2rem', left:'2rem', color:'white', backgroundColor:'black', padding:'0.5rem'}}>
          {props.capture ? ' HOTKEY' : ''}{' SAL:'}{props.sal}{focused.id !== null ? ` FIELD:${focused.id}` : ''}
        </div>
      }
      <form>
        <h2>Speechly Express Checkout</h2>
        <h3>Recipient Details</h3>
        <div className="group">
          <TextField
            name='name'
            label='Name'
            value={tentativeAppState.name as string}
            sal='free'
            onChange={change}
          />
          <TextField
            name='phone'
            label='Phone'
            value={tentativeAppState.phone as string}
            sal='phone'
            onChange={change}
          />
          <TextField
            name='email'
            label='Email'
            value={tentativeAppState.email as string}
            sal='free'
            onChange={change}
          />
        </div>

        <h3 className='headerTopGap'>Shipping Details</h3>
        <div className="group">
          <TextField
            name='address'
            label='Address'
            value={tentativeAppState.address as string}
            sal='free'
            onChange={change}
          />
          <TextField
            name='city'
            label='City'
            value={tentativeAppState.city as string}
            sal='free'
            onChange={change}
          />

          <div className='multiFieldRow'>
            <TextField
              name='zip'
              label='Zip'
              value={tentativeAppState.zip as string}
              sal='free'
              onChange={change}
            />
            <Dropdown
              options={countries}
              name='country'
              label='Country'
              value={tentativeAppState.country as string}
              sal='free'
              onChange={change}
            />
          </div>
        </div>

        <h3 className='headerTopGap'>Payment Details</h3>
        <div className="group">
          <TextField
            name='card_name'
            label='Name on card'
            value={tentativeAppState.card_name as string}
            sal='free'
            onChange={change}
          />
          <TextField
            name='card_number'
            label='Credit card number'
            value={tentativeAppState.card_number as string}
            sal='free'
            onChange={change}
          />
          <div className='multiFieldRow'>
            <TextField
              name='card_cvc'
              label='CVC'
              value={tentativeAppState.card_cvc as string}
              sal='free'
              onChange={change}
            />
            <TextField
              name='card_expiration'
              label='Expiration date'
              value={tentativeAppState.card_expiration as string}
              sal='free'
              onChange={change}
            />
          </div>
        </div>

        <div className="group headerTopGap">
          <Button name='place_order' onClick={() => alert('Thank you for trying Speechly Express Checkout!\n\nPlease visit speechly.com for more information.')}>Place the order</Button>
        </div>

      </form>
    </>
  )
}

export default SpeechlyApp