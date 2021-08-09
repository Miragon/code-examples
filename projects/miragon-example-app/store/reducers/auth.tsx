import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { ApiError } from "../../models/apiError";

import {
    AUTH_ERROR, AuthErrorPayload,
    SET_AUTH,
    SetAuthPayload
} from "../actions/auth";
import {AuthModel} from "../../models/AuthModel";

interface State {
    value: AuthModel | undefined,
    error?: ApiError,
    loaded: boolean
}
const reduceSetAuth = (draft: Draft<State>, action: PayloadAction<SetAuthPayload>) => {
    draft.error = undefined;
    draft.value = action.payload;
};

const reduceAuthError = (draft: Draft<State>, action: PayloadAction<AuthErrorPayload>) => {
    draft.error = action.payload;
};

const slice = createSlice({
    name: "Auth",
    initialState: {
        value: undefined,
        initialLoading: false,
        loading: false,
        loaded: false
    } as State,
    reducers: {
        [AUTH_ERROR]: reduceAuthError,
        [SET_AUTH]: reduceSetAuth,
    }
});

const authError = slice.actions[AUTH_ERROR];
const setAuth = slice.actions[SET_AUTH];


export {
    slice as AuthSlice,
    setAuth,
    authError,
};
