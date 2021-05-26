
import React from 'react'
import { SpeechProvider } from '@speechly/react-client'
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
  ErrorPanel
} from '@speechly/react-ui'
import LuxonUtils from '@date-io/luxon'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { ChakraProvider } from '@chakra-ui/react'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

import FlightContextProvider from '../../context/flightDataContext'


import Form from '../Form/Form'
import './App.css'


const App: React.FC = (): JSX.Element => {
  // const breakpoints = createBreakpoints({
  //   sm: "30em",
  //   md: "48em",
  //   lg: "62em",
  //   xl: "80em",
  //   "2xl": "96em",
  // })

  return (
    <FlightContextProvider>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <ChakraProvider>
          <SpeechProvider appId="26569795-9f37-435e-8b44-78caa7f10dff" language="en-US">


            <div className='app'>
              <Form />
            </div>

            <PushToTalkButtonContainer>
              <PushToTalkButton captureKey="" />
              <ErrorPanel />
            </PushToTalkButtonContainer>
          </SpeechProvider>
        </ChakraProvider>
      </MuiPickersUtilsProvider>
    </FlightContextProvider>

  )
}

export default App