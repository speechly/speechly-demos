import React from 'react'
import { SpeechProvider } from '@speechly/react-client'
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
  ErrorPanel
} from '@speechly/react-ui'
import { TranscriptDrawer } from '@speechly/react-ui/components/TranscriptDrawer'

import LuxonUtils from '@date-io/luxon'
import { ChakraProvider, useMediaQuery } from '@chakra-ui/react'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import FlightContextProvider from '../../context/flightDataContext'


import Form from '../Form/Form'

const App: React.FC = (): JSX.Element => {
  const [isMobile] = useMediaQuery('(max-width: 62em)')
  const transcriptFontSize = isMobile ? '3rem' : '1.5rem'

  return (
    <FlightContextProvider>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <ChakraProvider>
          <SpeechProvider appId="26569795-9f37-435e-8b44-78caa7f10dff" language="en-US">
            <TranscriptDrawer
              hint='Try "Book a flight from London to Helsinki"'
              fontSize={transcriptFontSize}
              highlightColor='#0f4e92'
              smallTextColor='#187ce7'
              backgroundColor='rgba(162, 213, 240, 0.4)' />

            <PushToTalkButtonContainer>
              <PushToTalkButton captureKey="" />
              <ErrorPanel />
            </PushToTalkButtonContainer>

            <Form />

          </SpeechProvider>
        </ChakraProvider>
      </MuiPickersUtilsProvider>
    </FlightContextProvider>

  )
}

export default App