import {AUTHENTICATE, REFRESH} from '../actions/auth';
import {AuthModel} from "../../models/AuthModel";

const initAuthModel: AuthModel = {}
const initialState = {
    authModel: initAuthModel
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                authModel: action.newAuthModel
            };

        default:
            return state;
    }
};
