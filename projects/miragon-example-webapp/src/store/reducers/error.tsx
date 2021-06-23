import {DELETE_ERRORS, ERROR} from "../actions/error";
import {AnyAction} from "redux";


const initialState = {
    allErrors: Array<Error>()
}


export default (state = initialState, action:AnyAction) => {
    switch (action.type) {

        case ERROR:
            return {
                ...state,
                allErrors: [action.error, ...state.allErrors]
            };

        case DELETE_ERRORS:
            return {
                ...state,
                allErrors: Array<Error>()
            };

    }

    //default
    return state;
};
