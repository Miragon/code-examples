import {SET_PROJECTS} from "../actions/projects";
import {ProjectTO} from "../../api/models";


const initialState = {
    allProjects: Array<ProjectTO>()
    //allProjects: PROJECTS
}


export default (state = initialState, action) => {
    switch (action.type) {

        case SET_PROJECTS:
            return {
                ...state,
                allProjects: action.projects
            }

    }

    //default
    return state;
};
