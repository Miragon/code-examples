import {combineReducers, configureStore} from "@reduxjs/toolkit";
import projectReducer from './projects'
import errorReducer from './error'

export const rootReducer = combineReducers({
    projects: projectReducer,
    errors: errorReducer,
});


export const ClearStore = {
    type: "Root:Clear"
};

export const store = configureStore({
    reducer: <RootState>(state: RootState, action: { type: string }) => {
        if (action === ClearStore) {
            return rootReducer(undefined, action);
        }

        return rootReducer(state as any, action);
    }
});

export type RootState = ReturnType<typeof rootReducer>
export type RootDispatch = typeof store.dispatch;