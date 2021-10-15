# Speechly Demos
Monorepo containing Speechly Application demos

### Built With
* [Node](https://nodejs.org/) (tested with v14.16.1)
* [Rush](https://rushjs.io/) (tested with 5.55.0)
* [Typescript](https://www.typescriptlang.org/)
* [Speechly](https://github.com/speechly/react-client)
* [React](https://reactjs.org/)

### Requirements

Check if you have the tools already installed

```
node --version
npm --version
rush -h
```

If necessary, install the build tools

- Install node and npm from <https://nodejs.org/>
- Install rush: `npm install -g @microsoft/rush`

### Run an app using Rush

```
rush update
cd applications/flight-booking-demo
rushx start
```

### Create release builds of all apps

```
rush build
```

### Update/add a project dependency

```
rush add --package @speechly/react-ui@latest
```

### Creating a new demo

```
npx create-react-app applications/new-demo-app --template file:cra-template-speechly
cd applications/new-demo-app
rushx start
```

Remember to replace `YOUR_APP_ID_FROM_SPEECHLY_DASHBOARD` in `src/App.tsx` with your owm app id.

To compile the new demo along with other project, add the following lines to "projects" array in `rush.json`:

```
{
  "packageName": "new-demo-app",
  "projectFolder": "applications/new-demo-app"
},
```

### Using Voice form components

Add `@speechly/voice-form-elements` dependency to the project:

```
rush add --package @speechly/voice-form-elements
```

Include the components:

```
import {
  VoiceDatePicker,
  VoiceCheckbox,
  VoiceInput,
  VoiceSelect,
  VoiceToggle,
} from '@speechly/voice-form-elements';
```

Place the form components inside your `SpeechProvider` block:

```
<SpeechProvider appId="YOUR_APP_ID_FROM_SPEECHLY_DASHBOARD">
  <VoiceInput label="From" entityName="from" intent="book" />
</SpeechProvider>
```

### Styling Voice form components

Add a `voice-form-theme-mui.css` to your `src` folder, then include it in `index.tsx`:

```
import "voice-form-theme-mui.css";
```

Add a Voice form component in the `main` block of your `App.tsx`.

```
<VoiceInput label="From" entityName="from" intent="book" />
```
