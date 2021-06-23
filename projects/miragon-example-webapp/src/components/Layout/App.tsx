import React from 'react';
import {Provider} from 'react-redux';
import {store} from "../../store/reducers/Store";

import './App.css';
import useStyles from "./Styles/UseStyle"
import Layout from "./Layout";

const App: React.FC = () => {
    const classes = useStyles();
    return (
        <Provider store={store}>
            <div className={classes.root}>
                <Layout/>
            </div>
        </Provider>
    );
}

export default App;

