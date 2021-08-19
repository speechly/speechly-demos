import React from 'react'
import { SpeechProvider } from '@speechly/react-client'
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
  ErrorPanel
} from '@speechly/react-ui'
import { TranscriptDrawer } from '@speechly/react-ui/components/TranscriptDrawer'
import HttpsRedirect from '@speechly-demos/common/ui/components/HttpsRedirect'
import AnalyticsWrapper from '@speechly-demos/common/utils/AnalyticsWrapper'

const App: React.FC = (): JSX.Element => {
  
  const UsageHints = [
    'Add usage hints',
  ]
  
  return (
    <HttpsRedirect>

      <SpeechProvider appId="" language="en-US">
        <AnalyticsWrapper appName="" appVersion={0}>
          
          <TranscriptDrawer hint={UsageHints} />
          
          <PushToTalkButtonContainer>
            <PushToTalkButton captureKey="" intro="" showTime={30000} />
            <ErrorPanel />
          </PushToTalkButtonContainer>
        
        </AnalyticsWrapper>
      </SpeechProvider>
    </HttpsRedirect>
    )
  }
  
  export default App