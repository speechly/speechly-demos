import React, { useEffect } from 'react';
import { SpeechProvider, useSpeechContext } from "@speechly/react-client";
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
  BigTranscript,
  BigTranscriptContainer,
  ErrorPanel
} from "@speechly/react-ui";
import { ChakraProvider } from "@chakra-ui/react"
import FlightContextProvider from '../../context/flightDataContext';
import { useUpdateFlightData } from '../../hooks/useUpdateFlightData';

import Form from '../Form/Form';
import './App.css'


export default function App() {
  const { segment } = useSpeechContext()
  useUpdateFlightData(segment)
  return (

    <FlightContextProvider>
      <ChakraProvider>
        <SpeechProvider appId="26569795-9f37-435e-8b44-78caa7f10dff" language="en-US">
          <BigTranscriptContainer>
            <BigTranscript />
          </BigTranscriptContainer>

          <div className='app'>
            <Form />
          </div>

          <PushToTalkButtonContainer>
            <PushToTalkButton captureKey="" />
            <ErrorPanel />
          </PushToTalkButtonContainer>
        </SpeechProvider>
      </ChakraProvider>
    </FlightContextProvider>

  );
}