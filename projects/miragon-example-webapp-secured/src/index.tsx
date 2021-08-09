import React from "react";
import ReactDOM from "react-dom";
import {HashRouter} from "react-router-dom";
import App from "./components/Layout/App";
import "./index.css";
import {Auth0Provider} from "@auth0/auth0-react";

ReactDOM.render((
    <Auth0Provider
        domain={process.env.REACT_APP_DOMAIN ?? ""}
        clientId={process.env.REACT_APP_CLIENT_ID ?? ""}
        authorizeTimeoutSeconds={5}
        useRefreshTokensIn
        redirectUri={window.location.origin}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Auth0Provider>
), document.getElementById("root"));