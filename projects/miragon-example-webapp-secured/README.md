# Miragon Example Webapp
Miragon is your best choice for process automation projects. The Startup based in Augsburg is specialised in Software Development using the Camunda Process Engine and provides professional IT expertise. Visit our website: https://www.Miragon.io/ </br>
This project is part of our blog post series, in which we show how to implement various challenging requirements with the highest code quality.

## Start working
Please start miragons [example-backend](../miragon-example-backend) first. Make sure its docker services, nginx and postgres, are running. Check if you have set the issuer-url to your Auth0 domain. </br>
Set the following Environment-Variables in your RunConfiguration:
```
REACT_APP_DOMAIN=<YOUR_DOMAIN> (f.ex.: https://miragon-example-tenant.eu.auth0.com);
REACT_APP_CLIENT_ID=<YOUR_CLIENT_ID> (f.ex.: yXu7adklfU729Hgsdg93p0gag9dC);
```


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
2. Run `yarn generate-api` in the projects root folder
3. The api is used in `./store/actions`. Refactor the updated code

### 4. Remote debugging
Install React Developer Tools (Chrome): https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
