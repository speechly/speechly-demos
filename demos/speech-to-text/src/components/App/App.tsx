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
      <PushToTalkButtonContainer voffset="calc(1.8rem + 4vh)" size="5rem">
        <PushToTalkButton size="5rem" backgroundColor="#494287" captureKey=" " intro="Hold to dictate" showTime={0} />
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
        <textarea placeholder=">" onChange={e => setText(e.target.value)} value={tentativeTextContent} />
      </main>
    </div>
  )
}
    
export default App