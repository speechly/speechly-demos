import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import FlightBookingDemo from 'flight-booking-demo/src/components/App/App'
import VoicePickingDemo from 'voice-picking-demo/src/components/App/App'
import FastFoodDemo from 'fast-food-demo/src/components/App/App'
import SpeechToTextDemo from 'speech-to-text/src/components/App/App'

const App: React.FC = (): JSX.Element => {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/flight-booking">Flight Booking Demo</Link>
              </li>
              <li>
                <Link to="/voice-picking">Voice Picking Demo</Link>
              </li>
              <li>
                <Link to="/fast-food">Fast Food Demo</Link>
              </li>
              <li>
                <Link to="/speech-to-text">Speech-to-Text Demo</Link>
              </li>
            </ul>
            <hr />
            <div>
              Welcome to speechly demos
            </div>
          </div>
        </Route>
        <Route path="/flight-booking">
          <FlightBookingDemo />
        </Route>
        <Route path='/voice-picking'>
          <VoicePickingDemo />
        </Route>
        <Route exact path='/fast-food'>
          <FastFoodDemo />
        </Route>
        <Route exact path='/speech-to-text'>
          <SpeechToTextDemo />
        </Route>
      </Switch>
    </Router>

  )
}

export default App