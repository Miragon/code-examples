import axios from "axios";
import * as AuthSession from "expo-auth-session";
import * as SecureStore from "expo-secure-store";
import Constants from 'expo-constants';
import { AuthModel } from "../models/AuthModel";
import helpers from "./Functions";
import { AuthSessionResult } from "expo-auth-session";
import {authError, setAuth} from "../store/reducers/auth";
import {RootDispatch} from "../store/reducers/Store";
const AUTH_OBJECT = "AuthObject";

function generateShortUUID() {
    return Math.random().toString(36).substring(2, 15);
}

export const authorize = async (dispatch: RootDispatch) => {
    try{
        await refresh(dispatch)
    } catch (e) {
        await login(dispatch)
    }
}

const login = async (dispatch: RootDispatch, connection?: "google-oauth2") => {
    try {
        //dispatch({ type: "loading" });
        await SecureStore.deleteItemAsync(AUTH_OBJECT);
        const state = generateShortUUID();

        const auth0ClientId = Constants.manifest.extra?.auth0ClientId ?? dispatch(authError({
            code: 400,
            message: "No Auth0ClientId set as environment variable. Please provide this id as AUTH0_CLIENT_ID=..."
        }))

        const auth0Domain = Constants.manifest.extra?.auth0Domain ?? dispatch(authError({
            code: 400,
            message: "No Auth0Domain set as environment variable. Please provide this id as AUTH0_DOMAIN=..."
        }))


        const discovery = await AuthSession.fetchDiscoveryAsync(auth0Domain);
        const redirectUrl = AuthSession.makeRedirectUri({ useProxy: true });


        const authRequestOptions: AuthSession.AuthRequestConfig = {
            responseType: AuthSession.ResponseType.Code,
            clientId: auth0ClientId,
            redirectUri: redirectUrl,
            prompt: AuthSession.Prompt.Login,
            scopes: ["openid", "profile", "email", "offline_access", "crud:list"],
            state: state,
        };
        if (connection && authRequestOptions.extraParams) {
            authRequestOptions.extraParams.connection = connection;
        }
        const authRequest = new AuthSession.AuthRequest(authRequestOptions);

        // Get the authorization code
        const authorizeResult: AuthSessionResult = await authRequest.promptAsync(discovery, {
            useProxy: true,
        });

        if (authorizeResult.type === "success") {
            // Exchange the code for an access token
            const tokenResult = await AuthSession.exchangeCodeAsync(
                {
                    code: authorizeResult.params.code,
                    clientId: auth0ClientId,
                    redirectUri: redirectUrl,
                    extraParams: {
                        code_verifier: authRequest.codeVerifier || "",
                    },
                },
                discovery
            );

            const authModel = new AuthModel();
            authModel.accessToken = tokenResult.accessToken
            authModel.idToken = tokenResult.idToken;
            authModel.refreshToken = tokenResult.refreshToken;
            authModel.issuedAt = tokenResult.issuedAt;
            authModel.expiresIn = tokenResult.expiresIn;

            if (tokenResult.accessToken) {
                const userInfoResponse = await axios.get(`${auth0Domain}/userinfo`, {
                    headers: {
                        Authorization: `Bearer ${tokenResult.accessToken}`,
                    },
                    timeout: 30000,
                });
                authModel.userInfo = userInfoResponse.data;
            }

            saveAuthObject(authModel);
            dispatch(setAuth(authModel))
        } else {
            dispatch(authError({
                code: 400,
                message: `Error Requesting Auth Token ${authorizeResult}`
            }))

        }
    } catch (error) {
        dispatch(authError({
            code: 400,
            message: `Error in Requesting Auth Token: ${error.message}`
        }))
    }
};


const refresh = async (dispatch: any) => {
    try {
        const auth0ClientId = Constants.manifest.extra?.auth0ClientId ?? dispatch(authError({
            code: 400,
            message: "No Auth0ClientId set as environment variable. Please provide this id as AUTH0_CLIENT_ID=..."
        }))

        const auth0Domain = Constants.manifest.extra?.auth0ClientId ?? dispatch(authError({
            code: 400,
            message: "No Auth0Domain set as environment variable. Please provide this id as AUTH0_DOMAIN=..."
        }))

        const discovery = await AuthSession.fetchDiscoveryAsync(auth0Domain);

        const authObject = await SecureStore.getItemAsync(AUTH_OBJECT) ?? helpers.throwError("No Auth object in local store")
        const loadedAuthModel: AuthModel = JSON.parse(authObject)

        const refreshTokenRequestConfig: AuthSession.RefreshTokenRequestConfig = {
            clientId: auth0ClientId,
            refreshToken: loadedAuthModel.refreshToken
        };
        const refreshResult : AuthSession.TokenResponse = await AuthSession.refreshAsync(refreshTokenRequestConfig, discovery);

        const newAuthModel: AuthModel = {...loadedAuthModel}
        newAuthModel.accessToken = refreshResult.accessToken
        newAuthModel.idToken = refreshResult.idToken
        newAuthModel.issuedAt = refreshResult.issuedAt
        newAuthModel.expiresIn = refreshResult.expiresIn
        newAuthModel.refreshToken = refreshResult.refreshToken !== undefined ? refreshResult.refreshToken : loadedAuthModel.refreshToken

        saveAuthObject(newAuthModel)
        dispatch(setAuth(newAuthModel))
    } catch (error) {
        throw error
    }
};






const saveAuthObject = async (authModel: AuthModel) => {
    const authString = JSON.stringify(authModel);
    if (authString.length > 2048) {
    } else {
        await SecureStore.setItemAsync(AUTH_OBJECT, authString);
    }
};