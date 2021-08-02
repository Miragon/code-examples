
import {CREATE_PROJECT, DELETE_PROJECT, SET_PROJECTS, UPDATE_PROJECT} from "../actions/projects";
import {ProjectTO} from "../../api";
import {AnyAction} from "redux";

const initialState = {
    allProjects: Array<ProjectTO>()
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (state = initialState, action: AnyAction) => {
    switch (action.type) {

        case SET_PROJECTS:
            return {
                ...state,
                allProjects: action.projects
            }

        case CREATE_PROJECT:
            return  {
                ...state,
                allProjects: [action.projects, ...state.allProjects]
            }

        case UPDATE_PROJECT:
            return {
                ...state,
                allProjects: replaceProject(state.allProjects, action.projects)
            }

        case DELETE_PROJECT:
            return {
                ...state,
                allProjects: state.allProjects.filter(project => project.id !== action.projectId)
            }

    }

    return state;
};

const replaceProject = (allProjects: ProjectTO[], updatedProject: ProjectTO): ProjectTO[] => {
    return allProjects.map(project => {
        return project.id === updatedProject.id
            ? updatedProject
            : project
    })
}