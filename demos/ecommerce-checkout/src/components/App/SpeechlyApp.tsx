import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
  useSpeechContext,
  SpeechState,
  SpeechSegment,
} from '@speechly/react-client'

import './App.css'
import produce from 'immer'
import { v1 as uuidv1 } from 'uuid'
import { SpeechlyUiEvents } from '@speechly/react-ui/types'
import VGUIContext, { NoSelection } from '../../VGUIContext'
import Textarea from '../Textarea'
import Input from '../Input'
import Group from '../Group'
import EditableElement from '../EditableElement'
import Dictation from '@speechly-demos/ui/utils/Dictation'
import NotificationIcon from '../../images/notification.svg'

const DEBUG_STATUSLINE = false

type IAppState = IKeys<string | number | null | undefined | Array<any>>

const TaskDefaults = {
  checked: false,
  due: 'Today',
}

const DefaultAppState: IAppState = {
  company: 'Acme Corp',
  contact: 'Edwin Collins',
  phone: '',
  email: '',
  probability: 50,
  deal_size: 10,
  stage: 1,
  tasks: [
    {value: 'Meet Edwin', checked: false, due: 'Today', key: 'tasks.1'},
//    {value: 'Send the deck', checked: false, due: 'Today', key: 'tasks.2'},
//    {value: 'Book a meeting with Peter for next week', checked: false, due: 'Today', key: 'tasks.3'},
//    {value: 'Follow up with Edwin by 15th of April', checked: false, due: 'Apr. 15', key: 'tasks.4'},
  ],
  notes: [
//    {value: 'Edwin was very interested in our solution for the web.', key: 'notes.1'},
//    {value: 'Had problems integrating existing solutions.', key: 'notes.2'},
//    {value: 'Will decide next month.', key: 'notes.3'},
//    {value: 'Peter Smith mentioned as the technical contact point.', key: 'notes.4'},
//    {value: 'His email is peter.smith@acme.com', key: 'notes.5'},
  ],
}

const Dictionaries: IKeys<IKeys<string | number>> = {
  'phone': {
    'plus': '+',
    'zero': 0,
    'oh': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
  },
  'email': {
    'dot': '.',
    'at': '@',
  },
  'stage': {
    'send proposal': 3,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'meet': 1,
    'follow up': 2,
    'proposal': 3,
    'negotiation': 4,
    'signed': 5,
  },
}

const stages = [
  'Meet',
  'Follow up',
  'Proposal',
  'Negotiation',
  'Signed',
]

const monthAbbreviations = [
  'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June',
  'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.',
]

const SpeechlyApp: React.FC<{capture: any, sal: any, setCapture: any}> = (props) => {
  const { segment, speechState } = useSpeechContext()
  const [tentativeAppState, setTentativeAppState] = useState(DefaultAppState)
  const [appState, setAppState] = useState(DefaultAppState)
  const {focused, setFocused, refMap, uiState} = useContext(VGUIContext)

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
        finalEffects(alteredState, segment)
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
    console.log(segment)
    if (uiState.current.preFocused) {
      const newValue = [appState[uiState.current.preFocused], ...segment.words.map(w => w.value)].filter(w => w).join(' ')
      if (newValue === appState[uiState.current.preFocused]) {
        uiState.current.fieldEdited = false
      } else {
        uiState.current.fieldEdited = true
      }
      const newState = {...appState, [uiState.current.preFocused]: newValue}
      return newState
    } else {
      switch (segment.intent.intent) {
        case 'email':
        case 'phone':
        case 'contact':
        case 'deal_size':
        case 'probability':
        case 'stage':
        {
          const field_name = segment.intent.intent! as string
          setFocused({id: field_name, finalId: segment.intent.isFinal ? field_name : null, voiceInitiated: true})
    
          const value = segment.entities
            .find((entity) => entity.type === field_name)
            ?.value
          if (value) {
            let translatedValue: string | number = value
            if (Dictionaries[field_name]) {
              translatedValue = Dictionaries[field_name][value.toLowerCase()] || value
            } else {
              if (typeof translatedValue === 'string') {
                translatedValue = translatedValue.slice(0,1).toUpperCase()+translatedValue.slice(1)
              }
            }
            uiState.current.fieldEdited = true

            return {...appState, [field_name]: translatedValue}
          } else {
            // Hacky 'streaming simulation'
            if (!refMap.get(field_name).dataset['nostream']) {
              const dictation = Dictation.getDictation(segment)
              if (Dictionaries[field_name]) {
                dictation.forEach(w => {
                  const replacement = Dictionaries[field_name][w.word.toLowerCase()]
                  if (replacement !== undefined) {
                    w.word = replacement as string
                  }
                })
              }
              const translatedValue = Dictation.toText(dictation.slice(1))
              uiState.current.fieldEdited = translatedValue.length > 0
              return {...appState, [field_name]: translatedValue}
            }
          }
          break
        }
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
/*        case 'update':
          // console.log('Update', selectedWidget.selectedWidget)
          const newFocus = segment.entities
            .find((entity) => entity.type === 'focus')
            ?.value.toLowerCase()
          if (newFocus) {
            // console.log('Update: Focused', newFocus)
            const inputElement = refMap.get(newFocus)
            // console.log('Update: Focused ref', inputElement)
            if (inputElement) {
              uiState.current.initialVoiceEdit = newFocus
              uiState.current.keyboardEditStarted = false
              uiState.current.programmaticFocusChange = true
              inputElement.focus()
              uiState.current.lastEdit = null
              setSelectedWidget({selectedWidget: newFocus, voiceInitiated: true})
              return appState
            } else {
              if (uiState.current.focusedElement) {
                uiState.current.programmaticFocusChange = true
                uiState.current.focusedElement.blur()
              }
              setSelectedWidget(NoSelection)
              return appState
            }
          }
          break
        */     }
    }
    return appState
  }, [appState, focused])

  // Side-effects of state sets
  const finalEffects = useCallback((newState: IAppState, segment: SpeechSegment) => {
    if (focused.id) {
      const inputElement = refMap.get(focused.id)
      if (inputElement) {
        inputElement.selectionStart = 0
        inputElement.selectionEnd = inputElement.value.length
      }
    }
    switch (segment.intent.intent) {
      case 'email':
      case 'phone':
      case 'contact':
      case 'deal_size':
      case 'probability':
      case 'stage':
        if (segment.entities.length === 0 && !uiState.current.fieldEdited) {
          let title = segment.intent.intent.replace(/_/g, ' ')
          title = title.slice(0,1).toUpperCase()+title.slice(1).toLowerCase()
          PubSub.publish(SpeechlyUiEvents.Notification, {message: `Please go on: '${title} ...'`})
        }
    }
  }, [])

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
              'Try: \'Contact: John Smith\'',
              'Try: \'Phone: +1 123 123 123\'',
              'Try: \'Finished the task\'',
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

    // Restore hotkey in some conditions
    if (value.length === 0) {
      props.setCapture(true)
    }
    const newState = {...appState, [name]: value}
    console.log(newState)
    setTentativeAppState(newState)
    setAppState(newState)
  }

  const toggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name
    const fieldPath = e.target.name.split('.')
    const newState = produce(appState, (draft) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const listItems = draft[fieldPath[0]]! as any[]
      const listItem = listItems.find(item => item['key'] === fieldName) as any
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (listItem!['checked'] as boolean) = !listItem!['checked']
    })

    setTentativeAppState(newState)
    setAppState(newState)
  }

  const removeFromList = (e: any) => {
    const fieldName = e.target.name
    const fieldPath = e.target.name.split('.')
    const newState = produce(appState, (draft) => {
      draft[fieldPath[0]] = (draft[fieldPath[0]]! as []).filter(item => item['key'] !== fieldName)
    })

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

      <main>
        <div className='group'>
          <Textarea borderless name='company' label='Company' value={tentativeAppState.company as string} sal='free' onChange={change} classes='big'/>
          <Input
            borderless
            type='text'
            name='contact'
            label='Contact'
            value={tentativeAppState.contact as string}
            sal='phone'
            onChange={change}
            classes='medium'
          />
        </div>
        <Input type='text' name='phone' label='Phone' value={tentativeAppState.phone as string} sal='phone' onChange={change}/>
        <Input type='text' name='email' label='Email' value={tentativeAppState.email as string} sal='free' onChange={change}/>
        <div className='dashboard'>
          <div className='dashboardrow'>
            <div
              data-name='deal_size'
              data-nostream
              className={['dashboardwidget', focused.id === 'deal_size' ? 'highlight' : ''].join(' ')}
              ref={ref => ref && refMap.set(ref.dataset['name']!, ref)}
            >
              <label>
                Deal size
              </label>
              ${tentativeAppState.deal_size}k
            </div>
            <div
              data-name='probability'
              data-nostream
              className={['dashboardwidget', focused.id === 'probability' ? 'highlight' : ''].join(' ')}
              ref={ref => ref && refMap.set(ref.dataset['name']!, ref)}
            >
              <label>
                Probability
              </label>
              {tentativeAppState.probability}%
            </div>
          </div>
          <div
            data-name='stage'
            data-nostream
            className={['dashboardwidget', focused.id === 'stage' ? 'highlight' : ''].join(' ')}
            ref={ref => ref && refMap.set(ref.dataset['name']!, ref)}
          >
            <label style={{textAlign: 'center', marginBottom: '0.2rem'}}>Stage</label>
            <div className='progress'>
              {
                [...Array(5)].map((e, i) =>
                  <div
                    key={`stage-${i}`}
                    className={`progressarrow ${i < (tentativeAppState.stage as number) ? 'active' : 'inactive'}`}
                    style={{transitionDelay: `${i*0.05}s`}}
                  >
                    {Arrow}
                    <label>
                      {stages[i]}
                    </label>
                  </div>
                )}
            </div>
          </div>
        </div>
        <Group name='tasks' label='Tasks'>
          <ul>
            {(tentativeAppState.tasks! as []).map(item => (
              <li key={item['key']} className={focused.id === item['key'] ? 'highlight' : ''}>
                <div className='startadornment'>
                  <input type='checkbox' name={item['key']} checked={item['checked']} onChange={toggle}/>
                </div>
                <EditableElement name={item['key']} label={item['key']} value={item['value']} sal='free' onChange={change}/>
                <div className='endadornment'>
                  <div className='badge'><NotificationIcon/>{item['due']}</div>
                  <button name={item['key']} className='smallbutton' onClick={removeFromList}>&times</button>
                </div>
              </li>
            ))}
            <li><div className='endadornment'><div className='smallbutton'>+</div></div></li>
          </ul>
        </Group>
 
        <Group name='notes' label='Notes'>
          <ul>
            {(tentativeAppState.notes! as []).map(item => (
              <li key={`${item['key']}`} className={focused.id === item['key'] ? 'highlight' : ''}>
                <EditableElement name={item['key']} label={item['key']} value={item['value']} sal='free' onChange={change}/>
                <div className='endadornment'>
                  <button name={item['key']} className='smallbutton' onClick={removeFromList}>&times</button>
                </div>
              </li>
            ))}
            <li><div className='endadornment'><div className='smallbutton'>+</div></div></li>
          </ul>
        </Group>
       </main>
    </>
  )
}

const Arrow =
  <svg
    width='74'
    height='47'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M0 47l10.61-23.5L0 0h63.39L74 23.5 63.39 47z' fill='currentColor' fillRule='evenodd'/>
  </svg>

export default SpeechlyApp