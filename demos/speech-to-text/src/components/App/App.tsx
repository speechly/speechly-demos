import React, { useContext, useEffect, useState } from 'react'
import { SpeechProvider, useSpeechContext } from '@speechly/react-client'
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
        <SpeechProvider appId="6f1c7eaa-53fa-495e-9319-4ceacfa88cfe" language="en-US">
            <PushToTalkButtonContainer>
                <PushToTalkButton captureKey="" intro="" showTime={30000} />
                <ErrorPanel />
            </PushToTalkButtonContainer>

            <SpeechlyApp></SpeechlyApp>

        </SpeechProvider>
    )
}

const SpeechlyApp: React.FC = (): JSX.Element => {

    const [textContent, setTextContent] = useState<string>("");
    const [tentativeTextContent, setTentativeTextContent] = useState<string>("");
    const { segment } = useSpeechContext();

    useEffect(() => {
        console.log(segment);
        if (segment) {
            const alteredTextContent = [textContent, ...segment.words.map(w => w.value)].join(" ")
            setTentativeTextContent(alteredTextContent);
            if (segment.isFinal) {
                setTextContent(alteredTextContent);
            }
        }
    }, [segment])

    return (
        <p contentEditable="true" style={{display: "block", fontSize: "2rem", width: "100%", height: "100vh"}}>
            {tentativeTextContent}
        </p>
    )
}

export default App