import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import FlightBookingDemo from 'flight-booking-demo/src/components/App/App'

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
      </Switch>
    </Router>

  )
}

export default App