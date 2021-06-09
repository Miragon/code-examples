# Miragon Example App
Miragon is your best choice for process automation projects. The Startup based in Augsburg is specialised in Software Development using the Camunda Process Engine and provides professional IT expertise. Visit our website: https://www.flowsquad.io/ </br>
This project is part of our blog post series, in which we show how to implement various challenging requirements with the highest code quality.

## Start working

### 1. Installation
#### a) Download tools and Emulators
``` bash
brew install watchman
sudo npm install expo-cli --global
```

Phone-Emulators: Install Android Studio and/or XCode and follow the instructions of Expo's documentation: https://docs.expo.io/workflow/ios-simulator/


#### b) Configure app.json
Set `owner` to your expo-username or your organisation

#### c) Configure Authentication with Auth0
The following description builds on top of the [miragon-example-project](../miragon-example-project) instructions how to create an account and a new tenant.

1. In Auth0: Create a new Application and select "Native" as Application Type  and set Allowed-Callback URLs to https://auth.expo.io/@<OWNER>/miragon-example-app
1. In Auth0: Register a user and his/her password
1. Change ClientId and ClientDomain in `./constants/Auth.tsx` to your client-id. 



#### d) Download dependencies and start
``` bash
expo install
expo start
```



### 2. Development
- `environment.tsx`: Using localhost for dev and cluster-endpoint for prod -> for local development start backend first (Visit backends Readme)
- `app.json`: App config
- `App.tsx`: Root component
- `./api`: Generated Client Api (Don't modify this): Checkout '3. Update generated api'
- `./assets`: Apps fonts and main images, like splash screen or icon
- `./components`: Reusable non domain specific React Native objects
- `./constants`: Global App constants, like color and styling
- `./models`: Classes used in App (will maybe removed soon by using api's model)
- `./navigation`: React Native Navigation components
- `./screens`: Main domains containing UI logic
- `./store/actions`: Providing Methods for updating store and controlling backend communication
- `./store/reducers`: Catching action dispatches and updating Redux in memory store

### 3. Update generated api
1. Optional: Visit the [Test Environment](https://mco-dev.dev.flowsquad.dev/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config) swagger API of [mco-backend](https://github.com/FlowSquad/mco-backend)
2. Click on [/v3/api-docs](https://mco-dev.dev.flowsquad.dev/v3/api-docs)
3. Copy All and Paste it into [swagger-editor](http://editor.swagger.io/) -> conform yaml conversion
4. Click Generate Client -> typescript axios (and wait until the download has finished)
5. unzip -> copy `apis/` `models/`, `api.ts`, `base.ts` and `configuration.ts`  into `./api` (replace current files)
6. The api is used in `./store/actions`. Refactor the updated code


## Components
- error-boundary: https://github.com/bvaughn/react-error-boundary
- auth0: https://github.com/expo/examples/tree/master/with-auth0
- Auth: https://jamesirish.io/blog/auth0-pkce-flow-using-expo-authsession


## Expo
Using Github-Actions: https://github.com/expo/expo-github-action#authenticate-using-an-expo-token

### Publishing
Using Expo Go on your iPhone will always access the default release channel.
```
expo publish --release-channel <[]|test|prod>
```
| Prod | Test | Default |
| --- |---| ---|
| will automatically be published to users (hot reload) | will automatically be published to test devices | used for local testing |


### Build App
download the android keystore first: `expo fetch:android:keystore` (will be ignored by git)
```
expo build:android --release-channel prod
expo build:ios --release-channel prod
```

### Upload to App-Store
We need to make to clarify if we want to set a specific id here: --id 
```
expo upload:android
expo upload:ios
```