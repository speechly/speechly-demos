import React, { SyntheticEvent, useContext, useEffect, useState } from 'react'
import { SpeechProvider, useSpeechContext } from '@speechly/react-client'
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
  ErrorPanel
} from '@speechly/react-ui'
import './App.css'

const App: React.FC = (): JSX.Element => {
  
  return (
    <SpeechProvider appId="6f1c7eaa-53fa-495e-9319-4ceacfa88cfe" language="en-US">
      <PushToTalkButtonContainer voffset="1.75rem">
        <PushToTalkButton captureKey=" " intro="Hold to dictate" showTime={0} />
        <ErrorPanel />
      </PushToTalkButtonContainer>
      
      <SpeechlyApp/>
      
    </SpeechProvider>
  )
}
  
const SpeechlyApp: React.FC = (): JSX.Element => {
  
  const [textContent, setTextContent] = useState<string>('')
  const [tentativeTextContent, setTentativeTextContent] = useState<string>('')
  const { segment } = useSpeechContext()
  
  const setText = (value: string) => {
    setTextContent(value)
    setTentativeTextContent(value)
  }
  
  useEffect(() => {
    console.log(segment)
    if (segment) {
      const plainString = segment.words.filter(w => w.value).map(w => w.value).join(' ')
      const alteredTextContent = textContent ? [textContent, plainString].join(' ') : plainString
      setTentativeTextContent(alteredTextContent)
      if (segment.isFinal) {
        setTextContent(alteredTextContent)
      }
    }
  }, [segment])
  
  return (
    <div className="pageMargin">
      <main>
        <textarea placeholder="Hold the mic button to dictate" onChange={e => setText(e.target.value)} value={tentativeTextContent} />
      </main>
    </div>
  )
}
    
export default App