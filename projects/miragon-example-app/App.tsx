import React, {useState} from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {NavigationContainer} from '@react-navigation/native';
import ErrorBoundary from 'react-native-error-boundary';
import {composeWithDevTools} from 'redux-devtools-extension';
import 'react-native-url-polyfill/auto'; //fixed axois fetch issue https://github.com/facebook/react-native/issues/23922

import 'intl';
import 'intl/locale-data/jsonp/de';
import {rootReducer} from "./store/reducers/Store";
import ErrorFatal from "./components/ErrorFatal";
import ProjectNavigator from "./navigation/ProjectNavigator";

import Colors from "./constants/Colors";
import Auth from "./screens/AuthScreen";

let store: any;
if (__DEV__) {
  store =
      createStore(
          rootReducer,
          composeWithDevTools(applyMiddleware(ReduxThunk))
      )
} else {
  store = createStore(rootReducer, applyMiddleware(ReduxThunk))
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    accent: Colors.secondary
  }
};

export default function App() {
  const [isAuthorized, setIsAuthorized] = useState(false)


  return (

      <StoreProvider store={store}>
        <PaperProvider theme={theme}>
          <ErrorBoundary
              FallbackComponent={({error, resetError}) =>
                  <ErrorFatal error={error} resetError={resetError} setIsAuthorized={setIsAuthorized}/>
              }>
            <NavigationContainer>
              {isAuthorized ? (<ProjectNavigator/>) : (<Auth setIsAuthorized={setIsAuthorized}/>)}
            </NavigationContainer>
          </ErrorBoundary>
        </PaperProvider>
      </StoreProvider>

  );
}


