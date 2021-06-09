import {AuthModel} from "../../models/AuthModel";

export const AUTHENTICATE = 'AUTHENTICATE';
export const REFRESH = 'REFRESH';


export const authenticate = (authModel: AuthModel) => {
    return dispatch => {
        dispatch({ type: AUTHENTICATE, newAuthModel: authModel });
    };
};
