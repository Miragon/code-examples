import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { ProjectsSlice } from "./projects";
import {AuthSlice} from "./auth";

export const rootReducer = combineReducers({
    auth: AuthSlice.reducer,
    projects: ProjectsSlice.reducer,
});

export const ClearStore = {
    type: "Root:Clear"
};

export const store = configureStore({
    reducer: <RootState>(state: RootState, action: { type: string }) => {
        if (action === ClearStore) {
            return rootReducer(undefined, action);
        }

        // See https://github.com/rt2zz/redux-persist/issues/1140
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return rootReducer(state as any, action);
    }
});

export type RootState = ReturnType<typeof rootReducer>
export type RootDispatch = typeof store.dispatch;
