import {combineReducers} from 'redux';

import projectReducer from './projects'
import authReducer from "./auth";
import errorReducer from './error'

export const rootReducer = combineReducers({
    projects: projectReducer,
    auth: authReducer,
    errors: errorReducer
})

export type RootState = ReturnType<typeof rootReducer>