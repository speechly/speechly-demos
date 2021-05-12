import React from 'react';
import { SpeechProvider } from "@speechly/react-client";
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
  BigTranscript,
  BigTranscriptContainer,
  ErrorPanel
} from "@speechly/react-ui";
import { ChakraProvider } from "@chakra-ui/react"

import Form from '../Form/Form';
import './App.css'

export default function App() {
  return (
    <ChakraProvider>
      <SpeechProvider appId="3ef7fd8a-ac47-40d7-9a45-e28dce453ae0" language="en-US">
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
  );
}