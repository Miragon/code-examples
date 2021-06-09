import axios from "axios";
import * as AuthSession from "expo-auth-session";
import * as SecureStore from "expo-secure-store";
import { AuthModel } from "../models/AuthModel";
import {ERROR} from "../store/actions/error";
import ApiError from "../models/apiError";
import * as authActions from "../store/actions/auth";
import helpers from "./Functions";
import { AuthSessionResult } from "expo-auth-session";

const AUTH_OBJECT = "AuthObject";
const auth0Domain = "https://miragon-example-tenant.eu.auth0.com/authorize";
const auth0ClientId = "rn0cJK2NmHYzhafTNjg67ZjPP07xUgNM";

function generateShortUUID() {
    return Math.random().toString(36).substring(2, 15);
}

export const authorize = async (dispatch: any) => {
    try{
        await refresh(dispatch)
    } catch (e) {
        await login(dispatch)
    }
}

const login = async (dispatch: any, connection?: "google-oauth2") => {
    try {
        //dispatch({ type: "loading" });
        await SecureStore.deleteItemAsync(AUTH_OBJECT);
        const state = generateShortUUID();
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

            // Dispatch the token
            dispatch(
                authActions.authenticate(authModel)
            )
        } else {
            dispatch(
                {
                    type: ERROR,
                    error: new ApiError("Error Requesting Auth Token", {axiosResponse: authorizeResult})
                });
        }
    } catch (error) {
        dispatch({type: ERROR, error: new ApiError("Error in Requesting Auth Token: " + error.message, {requestModel: error})})
    }
};


const refresh = async (dispatch: any) => {
    try {
        //dispatch({ type: "loading" });
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

        dispatch(
            authActions.authenticate(newAuthModel)
        )
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