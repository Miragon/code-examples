import { ThemeProvider } from "@material-ui/styles";
import React from 'react';
import { Provider } from 'react-redux';
import { store } from "../../store/reducers/Store";
import Theme from "../../theme";

import './App.css';
import Layout from "./Layout";
import useStyles from "./Styles/UseStyle"

const App: React.FC = () => {
    const classes = useStyles();
    return (
        <Provider store={store}>
            <ThemeProvider theme={Theme}>
                <div className={classes.root}>
                    <Layout />
                </div>
            </ThemeProvider>
        </Provider>
    );
}

export default App;

