import React from 'react';
import { PushToTalkButton, BigTranscript, ErrorPanel } from '@speechly/react-ui';
import './App.css';

function App() {
  return (
    <>
      <BigTranscript placement="top" />
      <PushToTalkButton placement="bottom" captureKey=" " />
      <ErrorPanel placement="bottom" />

      <div className="App">
        <div className="block">
          <h1>Speechly React App</h1>
        </div>
      </div>
    </>
  );
}

export default App;
