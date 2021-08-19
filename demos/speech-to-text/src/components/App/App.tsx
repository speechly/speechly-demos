import React, { useEffect, useState } from 'react'
import { SpeechProvider, useSpeechContext } from '@speechly/react-client'
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
  ErrorPanel
} from '@speechly/react-ui'
import './App.css'
import HttpsRedirect from '@speechly-demos/common/ui/components/HttpsRedirect'
import AnalyticsWrapper from '@speechly-demos/common/utils/AnalyticsWrapper'

// http://localhost:3000/?backgroundColor=%23ff00ff&zoom=0.5&zoomPan=false
const params = new URLSearchParams(window.location.search)

const queryParams = {
  backgroundColor: params.get('backgroundColor') || '#302865',
  backgroundHighlightColor: params.get('backgroundHighlightColor') || '#494287',
  intro: params.get('intro') || 'Hold to talk',
  placeholder: params.get('placeholder') || 'TRY SPEECHLY SPEECH-TO-TEXT!',
  padding: params.get('padding') || '2rem',
  //zoom: Number(QueryString.parse(window.location.search).zoom || 0.9),
  //zoomPan: !(QueryString.parse(window.location.search).zoomPan === "false"),
}

const App: React.FC = (): JSX.Element => {
  
  return (
    <HttpsRedirect>
      <SpeechProvider appId="6f1c7eaa-53fa-495e-9319-4ceacfa88cfe" language="en-US">
        <AnalyticsWrapper appName='speech-to-text' appVersion={100}>
          <PushToTalkButtonContainer voffset="calc(1rem + 4vh)" size="5rem">
            <PushToTalkButton
              size="5rem" backgroundColor={queryParams.backgroundHighlightColor} captureKey=" " intro={queryParams.intro} showTime={0} 
            />
            <ErrorPanel />
          </PushToTalkButtonContainer>
          
          <SpeechlyApp/>
        </AnalyticsWrapper>
      </SpeechProvider>
    </HttpsRedirect>
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
    <>
      <div className="pageMargin">
        <main>
          <textarea
            style={{padding: queryParams.padding, backgroundColor: queryParams.backgroundColor}}
            placeholder={queryParams.placeholder}
            onChange={e => setText(e.target.value)} value={tentativeTextContent} />
        </main>
      </div>
    </>
  )
}
    
export default App