import React, { useEffect, useState } from 'react'
import { SpeechProvider, SpeechSegment, SpeechState, useSpeechContext } from '@speechly/react-client'
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
  ErrorPanel
} from '@speechly/react-ui'
import { TranscriptDrawer } from '@speechly/react-ui/components/TranscriptDrawer'
import { startDemo, stopDemo } from '@speechly/browser-ui/demomode'

import LuxonUtils from '@date-io/luxon'
import { ChakraProvider, Center } from '@chakra-ui/react'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import FlightContextProvider from '../../context/flightDataContext'


import Form from '../Form/Form'

const UsageHints = [
  'Try: "Book a return flight from London to New York"',
  'Try: "Departing next Tuesday"',
  'Try: "Returning next Friday"',
  'Try: "Direct flights only"',
  'Try: "Business class"',
  'Try: "2 passengers"',
  'Try: "One way"',
  'Try: "Clear" to restart',
]

const DemoStrings = [
  '*book Book a return flight from London(from) to New York(to)',
  '*clear clear',
]

const App: React.FC = (): JSX.Element => {
  return (
    <FlightContextProvider>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <ChakraProvider>
          <SpeechProvider appId="1ea63538-f95c-4259-b8af-923994424137" language="en-US">
            <SpeechlyApp/>
          </SpeechProvider>
        </ChakraProvider>
      </MuiPickersUtilsProvider>
    </FlightContextProvider>
  )
}

const SpeechlyApp: React.FC = (): JSX.Element => {
  const [mockSegment, setMockSegment] = useState<SpeechSegment | undefined>()
  const { speechState } = useSpeechContext()

  useEffect(() => {
    startDemoMode()
  }, [])

  useEffect(() => {
    if (speechState === SpeechState.Recording) {
      stopDemoMode()
    }
  }, [speechState])

  const startDemoMode = () => {
    startDemo(DemoStrings, (s: SpeechSegment) => {
      setMockSegment(s)
      if (s.isFinal) {
        window.postMessage({ type: 'speechhandled', success: true }, '*')
      }
    })
  }

  const stopDemoMode = () => {
    stopDemo()
  }
  
  return (
    <>
      <TranscriptDrawer
        mockSegment={mockSegment}
        height='6rem'
        hint={UsageHints}
        highlightColor='#0f4e92'
        smallTextColor='#187ce7'
        backgroundColor='rgba(162, 213, 240, 0.4)' />

      <PushToTalkButtonContainer>
        <PushToTalkButton captureKey="" intro="Hold to book a flight with voice" showTime={30000} />
        <ErrorPanel />
      </PushToTalkButtonContainer>

      <Center
        display='flex'
        flexDirection='row'
        alignItems='center'
        bgGradient="linear(150deg, #53A3F9 17.8%, #75DFFF 48.54%, #DBFFF6 78.65%)"
        h='100vh'>
        <Form />
      </Center>
    </>
  )
}

export default App