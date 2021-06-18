import React, { useEffect, useState, useContext, useCallback } from 'react'
import {
  SpeechProvider,
  SpeechSegment,
  SpeechState,
  useSpeechContext
} from '@speechly/react-client'
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
  ErrorPanel
} from '@speechly/react-ui'
import theme from '@speechly-demos/ui/constants/theme'
import { TranscriptDrawer } from '@speechly/react-ui/components/TranscriptDrawer'
import { startDemo, stopDemo } from '@speechly/browser-ui/demomode'
import { useLocation } from 'react-router'

import LuxonUtils from '@date-io/luxon'
import { ChakraProvider, Center } from '@chakra-ui/react'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import FlightContextProvider, { defaultFlightInformation, FlightDataContext } from '../../context/flightDataContext'


import Form from '../Form/Form'
import { useUpdateFlightData } from '../../hooks/useUpdateFlightData'
import './App.css'

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
  '*book Book a return flight from London(from) to [New York](to)',
  '*clear clear',
]

const App: React.FC = (): JSX.Element => {
  return (
    <FlightContextProvider>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <ChakraProvider>
          <SpeechProvider appId="1ea63538-f95c-4259-b8af-923994424137" language="en-US">
            <SpeechlyApp />
          </SpeechProvider>
        </ChakraProvider>
      </MuiPickersUtilsProvider>
    </FlightContextProvider>
  )
}

const SpeechlyApp: React.FC = (): JSX.Element => {
  const [mockSegment, setMockSegment] = useState<SpeechSegment | undefined>()
  const [demoMode, setDemoMode] = useState(true)
  const { speechState } = useSpeechContext()
  const { setFlightData } = useContext(FlightDataContext)

  window.addEventListener('message', (e) => {
    if (e.data.type === 'interactive') {
      stopDemoMode()
    }
  })

  function useQuery() {
    return new URLSearchParams(useLocation().search)
  }

  const stopDemoMode = useCallback(() => {
    setDemoMode(false)
    setFlightData(defaultFlightInformation)
    stopDemo()
  }, [setFlightData])

  const startDemoMode = () => {
    startDemo(DemoStrings, (s: SpeechSegment) => {
      setMockSegment(s)
      if (s.isFinal) {
        window.postMessage({ type: 'speechhandled', success: true }, '*')
      }
    })
  }
  const query = useQuery()
  const heroMode = query.get('hero') === 'true'
  const hidePushToTalkButton = heroMode && demoMode

  useEffect(() => {
    startDemoMode()
  }, [])

  useEffect(() => {
    if (speechState === SpeechState.Recording && demoMode) {
      stopDemoMode()
    }
  }, [speechState, stopDemoMode, demoMode])



  useUpdateFlightData(mockSegment)

  return (
    <>
      <TranscriptDrawer
        mockSegment={mockSegment}
        height={theme.transcriptDrawer.defaultHeight}
        hint={UsageHints}
        highlightColor={theme.colors.yaleBlue}
        smallTextColor={theme.colors.deepSkyBlue}
        backgroundColor='rgba(162, 213, 240, 0.4)' />

      {!hidePushToTalkButton &&
        <PushToTalkButtonContainer>
          <PushToTalkButton captureKey="" intro="Hold to book a flight with voice" showTime={30000} />
          <ErrorPanel />
        </PushToTalkButtonContainer>
      }

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