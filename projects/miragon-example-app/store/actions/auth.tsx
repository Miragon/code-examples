import { ApiError } from "../../models/apiError";
import { AuthModel } from "../../models/AuthModel";

export const SET_AUTH = 'SET_AUTH'
export const AUTH_ERROR = 'AUTH_ERROR'

export type AuthErrorPayload = ApiError;
export type SetAuthPayload = AuthModel;