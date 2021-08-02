import {ERROR} from "./error";
import ApiError from "../ApiError";
import helpers from "../../constants/Functions";
import * as api from "../../api/api";
import {NewProjectTO, UpdateProjectTO} from "../../api";
import {RootDispatch} from "../reducers/Store";

export const SET_PROJECTS = 'SET_PROJECTS'
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';

export const fetchProjects = () => {
    return async (dispatch: RootDispatch): Promise<void> => {
        const config = helpers.getClientConfig()
        const projectController = new api.ProjectControllerApi(config)

        try {
            const response = await projectController.getAllProject()
            if (response.status === 200) {
                dispatch({type: SET_PROJECTS, projects: response.data})
            } else {
                dispatch({
                    type: ERROR, error: new ApiError(
                        "Error fetching Project: " + response.status,
                        {axiosResponse: response})
                })
            }
        } catch (error) {
            dispatch({
                type: ERROR, error: new ApiError(
                    "Error fetching Project: " + error.message,
                    {}
                )
            })
        }
    }
}

export const createProject = (newPro: NewProjectTO) => {
    return async (dispatch: RootDispatch): Promise<void> => {
        const config = helpers.getClientConfig();
        const projectController = new api.ProjectControllerApi(config);

        try {
            const response = await projectController.createNewProject(newPro)
            if (response.status === 200) {
                dispatch({type: CREATE_PROJECT, projects: response.data})
            } else {
                dispatch({
                    type: ERROR, error: new ApiError(
                        "Errpr creating Project: " + response.status,
                        {axiosResponse: response}
                    )
                })
            }
        } catch (error) {
            dispatch({
                type: ERROR, error: new ApiError(
                    "Error creating Project: " + error.message,
                    {requestModel: newPro}
                )
            })
        }
    }
}

export const updateProject = (projectID: string, newData: UpdateProjectTO) => {
    return async (dispatch: RootDispatch): Promise<void> => {
        const config = helpers.getClientConfig();
        const projectController = new api.ProjectControllerApi(config);
        try {
            const response = await projectController.updateProject(projectID, newData)

            if (response.status === 200) {
                dispatch({type: UPDATE_PROJECT, projects: response.data})
            } else {
                dispatch({
                    type: ERROR, error: new ApiError(
                        "Error updating Project " + response.status,
                        {axiosResponse: response, requestModel: newData}
                    )
                })
            }
        } catch (error) {
            dispatch({
                type: ERROR, error: new ApiError(
                    "Error updating Project" + error.message,
                    {requestModel: newData}
                )
            })
        }
    }
}

export const deleteProject = (projectID: string) => {
    return async (dispatch: RootDispatch): Promise<void> => {
        const config = helpers.getClientConfig();
        const projectController = new api.ProjectControllerApi(config);
        try {
            const response = await projectController.deleteProject(projectID)

            if (response.status === 200) {
                dispatch({type: DELETE_PROJECT, projectId: projectID})
            } else {
                dispatch({
                    type: ERROR, error: new ApiError(
                        "Error updating project " + response.status,
                        {axiosResponse: response}
                    )
                })
            }
        } catch (error) {
            dispatch({
                type: ERROR, error: new ApiError(
                    "Error deleting project" + error.message,
                    {}
                )
            })
        }
    }
}