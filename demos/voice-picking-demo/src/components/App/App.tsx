import React from 'react'
import { SpeechProvider } from '@speechly/react-client'
import {
    PushToTalkButton,
    PushToTalkButtonContainer,
    ErrorPanel
} from '@speechly/react-ui'
import { TranscriptDrawer } from '@speechly/react-ui/components/TranscriptDrawer'

const App: React.FC = (): JSX.Element => {

    const UsageHints = [
        'Add usage hints',
    ]

    return (
        <SpeechProvider appId="" language="en-US">
            <TranscriptDrawer hint={UsageHints} />

            <PushToTalkButtonContainer>
                <PushToTalkButton captureKey="" intro="" showTime={30000} />
                <ErrorPanel />
            </PushToTalkButtonContainer>

        </SpeechProvider>
    )
}

export default App