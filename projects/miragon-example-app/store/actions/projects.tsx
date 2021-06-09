import {ERROR} from "./error";
import ApiError from "../../models/apiError";

import helpers from "../../constants/Functions";
import * as api from "../../api/api";


export const SET_PROJECTS = 'SET_PROJECTS'


export const fetchProjects = () => {

    return async (dispatch: any, getState: any) => {
        const config = helpers.getClientConfig(getState().auth.authModel.idToken)
        const projectController = new api.ProjectControllerApi(config)

        try {
            const response = await projectController.getAllProject()
            if (response.status === 200) {
                dispatch({type: SET_PROJECTS, projects: response.data})
            }
            else {
                dispatch({type: ERROR, error: new ApiError(
                        "Error fetching projects: " + response.status,
                        {authModel: getState().auth.authModel, axiosResponse: response})})
            }
        } catch (error) {
            dispatch({type: ERROR, error: new ApiError(
                    "Error fetching projects: " + error.message,
                    {authModel: getState().auth.authModel}
                )})
        }


    }

}

