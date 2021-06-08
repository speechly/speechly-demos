# Speechly Demos
Monorepo containing Speechly Application demos

### Built With
* [React](https://reactjs.org/)
* [Typescript](https://www.typescriptlang.org/)
* [Speechly](https://github.com/speechly/react-client)
* [NPM Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)

### Installation And Running

1. Clone the repo
   ```sh
   git clone https://github.com/speechly/flight-booking-2021.git
   ```
2. Install NPM packages
   ```sh
   npm ci
   ```
3. Run following command in command line`
   ```sh
   npm run dev
   ```


### Creating a new demo
template-speechly-demos folder can be found from repository root that contains a simple skeleton for a new speechly demo application

package.json file has "generate-project" script that creates a new folder inside demos folder with given name and copies the contents of template-speechly-demos folder inside it

You can create a new demo with following steps:

1. run generate-project script
   ```sh
   NAME='example-speechly-app' npm run generate-project
   ```
   
2. Navigate to new project folder
   ```sh
   cd demos/example-speechly-app
   ```
3. Edit "name" field in package.json file of the new demo to for example "example-speechly-app"
 {
    "name": "to-be-filled" --> name: "example-speechly-app"
    "version": "1.0.0",
    "description": "",
    "main": "./index.js",
....
}

4. Navigate to speechly-demos repository root and run
    ```sh
   npm install
   ```
   so that npm detects that generated demo is a workspace
   
5. Edit root applications App.tsx file by adding a new link and route for generated demo
    ```JSX
    import React from 'react'
    import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
    import FlightBookingDemo from 'flight-booking-demo/src/components/App/App'
    import ExampleDemoApp from 'example-speechly-app/src/components/App/App'
    
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
                    <Link to="/example-demo">Example Demo</Link>
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
            <Route path='/example-demo'>
              <ExampleDemoApp />
            </Route>
          </Switch>
        </Router>
    
      )
    }
    
    export default App
    ```

6. Run following command in speechly-demos root 
    ```sh
   npm run dev
   ```
   and navigate to localhost:8081 in browser
   Link to your new demo should be displayed in list
   
   