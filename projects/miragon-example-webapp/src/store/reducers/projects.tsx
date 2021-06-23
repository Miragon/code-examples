import {CREATE_PROJECT, SET_PROJECTS, UPDATE_PROJECT} from "../actions/projects";
import {ProjectTO} from "../../api/models";

const initialState = {
    allProjects: Array<ProjectTO>()
}

export default (state = initialState, action:any) => {
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
