import React, {useState} from 'react'
import { SpeechProvider } from '@speechly/react-client'
import {
  BigTranscript,
  PushToTalkButton,
  PushToTalkButtonContainer,
  BigTranscriptContainer,
  ErrorPanel
} from '@speechly/react-ui'
import { SAL_DEFAULT, VGUIContextProvider } from '../../VGUIContext'
import SpeechlyApp from './SpeechlyApp'
import HttpsRedirect from '@speechly-demos/ui/components/HttpsRedirect'

const CAPTURE_KEY = ' '

// http://localhost:3000/?env=staging&appId=xxxxx

const Sals: IKeys<string | undefined> = {
  [SAL_DEFAULT]: '2e6e6718-8d2d-419a-a89e-92802f5ff3bd',
  'phone': '2e6e6718-8d2d-419a-a89e-92802f5ff3bd',
  'free': '2e6e6718-8d2d-419a-a89e-92802f5ff3bd',
}

/*
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
*/

const App: React.FC = (): JSX.Element => {
  const [capture, setCapture] = useState(true)
  const [sal, setSal] = useState(SAL_DEFAULT)

  return (
    <HttpsRedirect>
      <div className='App'>
        <SpeechProvider
          appId={Sals[sal]!}
        >
          <VGUIContextProvider setSal={setSal} setCapture={setCapture} hotKey={CAPTURE_KEY}>
            <BigTranscriptContainer>
              <BigTranscript />
            </BigTranscriptContainer>
            <SpeechlyApp capture={capture} setCapture={setCapture} sal={sal}/>
            <PushToTalkButtonContainer>
              <PushToTalkButton captureKey={capture ? CAPTURE_KEY : undefined} />
              <ErrorPanel/>
            </PushToTalkButtonContainer>
          </VGUIContextProvider>
        </SpeechProvider>
      </div>
    </HttpsRedirect>
  )
}
  
export default App