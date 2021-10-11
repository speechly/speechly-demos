import React from 'react';
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from '@speechly/react-ui';
import BookingForm from './components/BookingForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <div id="container">
        <BookingForm />
      </div>
      <PushToTalkButtonContainer>
        <PushToTalkButton captureKey=" " />
        <ErrorPanel />
      </PushToTalkButtonContainer>
    </div>
  );
}

export default App;
