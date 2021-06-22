import React, {
  useEffect,
  useState,
  useContext,
  useCallback
} from 'react'

import {
  SpeechProvider,
  SpeechSegment,
  SpeechState,
  useSpeechContext
} from '@speechly/react-client'

import {
  PushToTalkButton,
  PushToTalkButtonContainer,
  ErrorPanel,
  BigTranscript
} from '@speechly/react-ui'

import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import theme from '@speechly-demos/ui/constants/theme'
import { TranscriptDrawer } from '@speechly/react-ui/components/TranscriptDrawer'
import { startDemo, stopDemo } from '@speechly/browser-ui/demomode'
import { useLocation } from 'react-router'

import LuxonUtils from '@date-io/luxon'
import { ChakraProvider, Center, Box } from '@chakra-ui/react'
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
  '*book Book a [return](round_trip) flight from London(from) to [New York](to)',
  '*book For 2(passengers) passengers',
  '*book In business(class) class',
  '*book Direct(direct) flights only',
  '*clear clear',
]

const App: React.FC = (): JSX.Element => {
  const history = createBrowserHistory()
  return (
    <Router {...{ history }}>
      <FlightContextProvider>
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          <ChakraProvider>
            <SpeechProvider appId="1ea63538-f95c-4259-b8af-923994424137" language="en-US">
              <SpeechlyApp />
            </SpeechProvider>
          </ChakraProvider>
        </MuiPickersUtilsProvider>
      </FlightContextProvider>
    </Router>
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
    <Box h='100vh' overflowY='auto' overflowX='hidden'>
      {!(heroMode && hidePushToTalkButton) &&
        <TranscriptDrawer
          mockSegment={mockSegment}
          height={theme.transcriptDrawer.defaultHeight}
          hint={UsageHints}
          highlightColor={theme.colors.yaleBlue}
          smallTextColor={theme.colors.deepSkyBlue}
          backgroundColor='rgba(162, 213, 240, 0.4)' />
      }

      {!hidePushToTalkButton &&
        <PushToTalkButtonContainer>
          <PushToTalkButton
            captureKey=""
            intro="Hold to talk"
            showTime={30000}
            size="72px"
          />
          <ErrorPanel />
        </PushToTalkButtonContainer>
      }

      <Center
        paddingTop='5rem'
        paddingBottom='6rem'
        pointerEvents={demoMode ? 'none' : 'all'}
        display='flex'
        flexDirection='column'
        alignItems='center'
        bgGradient={heroMode ? undefined : "linear(150deg, #53A3F9 17.8%, #75DFFF 48.54%, #DBFFF6 78.65%)"}
        minH='100%'>
        <Box w='100%' flex='1' display='flex' alignItems='center' justifyContent='center'>
          <Box display='flex' minH='100%' flexDir='column' margin='0.4rem' alignItems='center' alignContent='center'>
            {(heroMode && hidePushToTalkButton) &&
              <div style={{width: '100%', minHeight: '6rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
                <BigTranscript highlightColor={theme.colors.yaleBlue} backgroundColor='transparent' marginBottom='2.5rem' mockSegment={mockSegment}>
                </BigTranscript>
              </div>
              }
            <Form />
          </Box>
        </Box>
      </Center>
    </Box>
  )
}

export default App