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
import HttpsRedirect from '@speechly-demos/common/ui/components/HttpsRedirect'
import { AnalyticsWrapper } from '@speechly-demos/common/utils/AnalyticsWrapper'

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
      <AnalyticsWrapper appName='ecommerce-checkout' appVersion={100}>
        <div className='App CheckoutApp'>
          <SpeechProvider
            appId={Sals[sal]!}
          >
            <VGUIContextProvider setSal={setSal} setCapture={setCapture} hotKey={CAPTURE_KEY}>
              <BigTranscriptContainer>
                <BigTranscript />
              </BigTranscriptContainer>
              <div className='pageLayout'>
                <main>
                  <SpeechlyApp capture={capture} setCapture={setCapture} sal={sal}/>
                </main>
                <div className='sidePanel lightText'>
                  <img className="cartSummaryImage" src='/images/6428508_sd.png'/>
                  <div className="cartSummary">
                    <ul>
                      <li>
                        <h2>My Order</h2>
                        <span className='endadornment'>
                        <div className="cartItemCount">
                          <svg className="ShoppingCartButton" viewBox="0 0 512 512">
                            <g>
                              <path fill="currentColor"
  d="M491.8,352.2H151.9l17.1-34.8l283.5-0.5c9.6,0,17.8-6.8,19.5-16.3l39.3-219.8c1-5.8-0.5-11.7-4.3-16.2
  c-3.8-4.5-9.3-7.1-15.2-7.1l-360.7-1.2l-3.1-14.5c-1.9-9.2-10.3-16-19.7-16H20.1C9,25.8,0,34.8,0,45.9c0,11.1,9,20.1,20.1,20.1H92
  l13.5,64l33.2,160.5l-42.7,69.7c-4.5,6.1-5.2,14.2-1.7,21c3.4,6.8,10.3,11.1,18,11.1H148c-7.6,10.1-11.8,22.5-11.8,35.2
  c0,32.3,26.3,58.6,58.6,58.6s58.6-26.3,58.6-58.6c0-12.7-4.2-25.1-11.8-35.2h91.9c-7.6,10.1-11.8,22.5-11.8,35.2
  c0,32.3,26.3,58.6,58.6,58.6c32.3,0,58.6-26.3,58.6-58.6c0-12.7-4.2-25.1-11.8-35.2h64.7c11.1,0,20.1-9,20.1-20.1
  C511.9,361.2,502.9,352.2,491.8,352.2z M139.5,96l328.6,1.1L436,277.3l-258.1,0.5L139.5,96z M194.8,445.7c-9.9,0-18-8.1-18-18
  c0-9.9,8.1-18,18-18c9.9,0,18,8.1,18,18C212.9,437.6,204.8,445.7,194.8,445.7z M380.4,445.7c-9.9,0-18-8.1-18-18
  c0-9.9,8.1-18,18-18c9.9,0,18,8.1,18,18C398.4,437.6,390.4,445.7,380.4,445.7z"
                              />
                            </g>
                          </svg>
                          1
                        </div>
                        </span>

                      </li>
                      <li>Samsung 70" 4k LED TV<span className='endadornment'>$735</span></li>
                      <li>Total<span className='endadornment'>$735</span></li>
                    </ul>
                  </div>
                </div>
              </div>
              <PushToTalkButtonContainer voffset="calc(1rem + 4vh)" size="5rem">
                <PushToTalkButton size='96px' backgroundColor='#1458c8' captureKey={capture ? CAPTURE_KEY : undefined} showTime={0} />
                <ErrorPanel />
              </PushToTalkButtonContainer>

            </VGUIContextProvider>
          </SpeechProvider>
        </div>
      </AnalyticsWrapper>
    </HttpsRedirect>
  )
}
  
export default App