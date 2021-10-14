import React from 'react';
import { PushToTalkButton, ErrorPanel } from '@speechly/react-ui';
import { TranscriptDrawer } from '@speechly/react-ui/components/TranscriptDrawer';
import BookingForm from './components/BookingForm';
import './voice-form-component-calendar.css';
import './voice-form-theme-capsule.css';
import './App.css';

function App() {
  return (
    <>
      <TranscriptDrawer/>
      <PushToTalkButton captureKey=" " placement="bottom" size="88px" />
      <ErrorPanel placement="bottom" />

      <div className="App">
        <BookingForm />
      </div>
    </>
  );
}

export default App;
