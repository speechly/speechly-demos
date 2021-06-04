import React from 'react'
import { SpeechProvider } from '@speechly/react-client'
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
  ErrorPanel
} from '@speechly/react-ui'
import { TranscriptDrawer } from '@speechly/react-ui/components/TranscriptDrawer'

import LuxonUtils from '@date-io/luxon'
import { ChakraProvider, useMediaQuery, Center } from '@chakra-ui/react'
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

const App: React.FC = (): JSX.Element => {
  return (
    <FlightContextProvider>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <ChakraProvider>
          <SpeechProvider appId="1ea63538-f95c-4259-b8af-923994424137" language="en-US">
            <TranscriptDrawer
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

          </SpeechProvider>
        </ChakraProvider>
      </MuiPickersUtilsProvider>
    </FlightContextProvider>

  )
}

export default App