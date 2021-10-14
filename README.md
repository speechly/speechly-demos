# Speechly Demos
Monorepo containing Speechly Application demos

### Built With
* [Node](https://nodejs.org/) (tested with v14.16.1)
* npm (tested with 7.16.0)
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

- Install node and npm from https://nodejs.org/
- Install rush: `npm install -g @microsoft/rush`

### Run an app using Rush

```
rush update
rush build
cd applications/flight-booking-demo
rushx start
```

### Update/add a project dependency

```
rush add --package @speechly/react-ui@latest
```

### Adding a project to the monorepo

Edit the "projects" array in `rush.json`.


### Creating a new demo

```
npx create-react-app new-demo-app --template file:cra-template-speechly
```
