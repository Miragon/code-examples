import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { ProjectControllerApi, ProjectTO } from "../../api";
import { ApiError } from "../../models/Error/ApiError";
import { apiExec, hasFailed } from "../../util/ApiUtils";
import {
    ADD_PROJECT,
    AddProjectPayload,
    PROJECTS_ERROR,
    ProjectsErrorPayload,
    REMOVE_PROJECT,
    RemoveProjectPayload,
    SET_PROJECTS,
    SetProjectsPayload,
    UPDATE_PROJECT,
    UpdateProjectPayload
} from "../actions/projects";
import { RootDispatch, RootState } from "./Store";

interface State {
    value: ProjectTO[],
    error?: ApiError,
    loaded: boolean
}

const reduceProjectError = (draft: Draft<State>, action: PayloadAction<ProjectsErrorPayload>) => {
    draft.error = action.payload;
};

const reduceSetProjects = (draft: Draft<State>, action: PayloadAction<SetProjectsPayload>) => {
    draft.error = undefined;
    draft.value = action.payload;
};

const reduceAddProject = (draft: Draft<State>, action: PayloadAction<AddProjectPayload>) => {
    draft.value.push(action.payload);
};

const reduceUpdateProject = (draft: Draft<State>, action: PayloadAction<UpdateProjectPayload>) => {
    draft.value = draft.value.map(c => c.id === action.payload.id ? action.payload : c);
};

const reduceRemoveProject = (draft: Draft<State>, action: PayloadAction<RemoveProjectPayload>) => {
    draft.value = draft.value.filter(c => c.id !== action.payload);
};

const slice = createSlice({
    name: "Projects",
    initialState: {
        value: [],
        initialLoading: false,
        loading: false,
        loaded: false
    } as State,
    reducers: {
        [PROJECTS_ERROR]: reduceProjectError,
        [SET_PROJECTS]: reduceSetProjects,
        [ADD_PROJECT]: reduceAddProject,
        [UPDATE_PROJECT]: reduceUpdateProject,
        [REMOVE_PROJECT]: reduceRemoveProject
    }
});

const projectError = slice.actions[PROJECTS_ERROR];
const setProjects = slice.actions[SET_PROJECTS];
const addProject = slice.actions[ADD_PROJECT];
const updateProject = slice.actions[UPDATE_PROJECT];
const removeProject = slice.actions[REMOVE_PROJECT];

const fetchProjects = (force?: boolean) => {
    return async (dispatch: RootDispatch, getState: () => RootState): Promise<void> => {
        const state = getState().projects;
        if (state.loaded && !state.error && !force) {
            return;
        }

        const response = await apiExec(ProjectControllerApi, api => api.getAllProject());
        if (hasFailed(response)) {
            dispatch(projectError(response.error));
        } else {
            dispatch(setProjects(response.data));
        }
    };
};

export {
    slice as ProjectsSlice,
    projectError,
    addProject,
    updateProject,
    removeProject,
    fetchProjects
};
