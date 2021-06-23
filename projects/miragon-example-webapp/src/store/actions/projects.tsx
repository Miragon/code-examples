import {ERROR} from "./error";

import helpers from "../../constants/Functions";
import * as api from "../../api/api";
import {NewProjectTO, UpdateProjectTO} from "../../api/models";


export const SET_PROJECTS = 'SET_PROJECTS'
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';


export const fetchProjects = () => {

    return async (dispatch: any, getState: any) => {
        const config = helpers.getClientConfig()
        const projectController = new api.ProjectControllerApi(config)

        try {
            const response = await projectController.getAllProject()
            if (response.status === 200) {
                dispatch({type: SET_PROJECTS, projects: response.data})
            }
            else {
                dispatch({type: ERROR, error: new Error("Error fetching projects: " + response.status + ": " + response.statusText)})
            }
        } catch (error) {
            dispatch({type: ERROR, error: new Error("Error fetching projects: " + + error.message)})
        }
    }
}

export const createProject = (newPro: NewProjectTO) =>{
    return async (dispatch: any, getState: any) => {
        const config = helpers.getClientConfig();
        const projectController = new api.ProjectControllerApi(config);

        try {
            const response = await projectController.createNewProject(newPro)
            if (response.status === 200) {
                dispatch({type: CREATE_PROJECT, projects: response.data})
            }
            else {
                dispatch({type: ERROR, error: new Error("Error creating projects: " + response.status + ": " + response.statusText)})
            }
        } catch (error) {
            dispatch({type: ERROR, error: new Error("Error creating projects: " + + error.message)})
        }

    }
}

export const updateProject = (projectID: string, newData: UpdateProjectTO) => {
    return async (dispatch:any, getState:any) => {
        const config = helpers.getClientConfig();
        const projectController = new api.ProjectControllerApi(config);
        try {
            const response = await projectController.updateProject(newData, projectID)

            if(response.status===200){
                dispatch({type:UPDATE_PROJECT, projects: response.data })
            }
            else {
                dispatch({type: ERROR, error: new Error("Error updating projects: " + response.status + ": " + response.statusText)})
            }
        } catch (error) {
            dispatch({type: ERROR, error: new Error("Error updating projects: " + + error.message)})
        }
    }
}
