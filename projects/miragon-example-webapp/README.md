# Miragon Example Webapp
Miragon is your best choice for process automation projects. The Startup based in Augsburg is specialised in Software Development using the Camunda Process Engine and provides professional IT expertise. Visit our website: https://www.flowsquad.io/ </br>
This project is part of our blog post series, in which we show how to implement various challenging requirements with the highest code quality.

## Start working
Please start miragons [example-backend](https://github.com/FlowSquad/code-examples/tree/main/projects/miragon-example-project) first. 
Make sure its docker services nginx and postgres are running. Nginx will expect 

### 1. Run the application
``` bash
yarn start
```

### 2. Development
- `environment.tsx`: Using localhost for dev and cluster-endpoint for prod -> for local development start backend first (Visit backends Readme)
- `app.json`: App config
- `App.tsx`: Root component
- `./api`: Generated Client Api (Don't modify this): Checkout '3. Update generated api'
- `./components`: Reusable non domain specific React Native objects
- `./constants`: Global App constants, like color and styling
- `./hoc`: React Native Navigation components
- `./sites`: Main domains containing UI logic
- `./store/actions`: Providing Methods for updating store and controlling backend communication
- `./store/reducers`: Catching action dispatches and updating Redux in memory store

### 3. Update generated api
1. Run Miragons example backend and open its api definition (refer the backends Readme)
2. Run `yarn api-gen` in the projects root folder
3. The api is used in `./store/actions`. Refactor the updated code

### 4. Remote debugging
