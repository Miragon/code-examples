import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import * as projectActions from "../../store/actions/projects";
import { useDispatch, useSelector} from "react-redux";
import {NewProjectTO, ProjectTO, UpdateProjectTO} from "../../api";
import {RootState} from "../../store/reducers/Store";
import ProjectTable from "../../components/Project/Table/ProjectTable";
import DefaultButton from "../../components/Dialog/DefaultButton";
import NewProjectDialog from "../../components/Project/Dialog/NewProjectDialog";
import DeleteProjectDialog from "../../components/Project/Dialog/DeleteProjectDialog";
import ParagraphHeader from "../../components/Project/Header/ParagraphHeader";
import UpdateProjectDialog from "../../components/Project/Dialog/UpdateProjectDialog";


/**
 * A page that provides an overview of all Project
 * The user can select and delete Project
 */
const ProjectOverviewPage: React.FC = () => {
    const dispatch = useDispatch();

    const projects = useSelector((state: RootState) => state.projects.allProjects)


    const [createDialogIsOpen, setCreateDialogIsOpen] = useState<boolean>(false);
    const [projectToBeDeleted, setProjectToBeDeleted] = useState<ProjectTO>();
    const [projectToBeEdited, setProjectToBeEdited] = useState<ProjectTO>();

    useEffect(() => {
        dispatch(projectActions.fetchProjects());
    }, [dispatch]);

    /**
     * Persist a new project in the backend
     */
    const createNewProject = (newProject: NewProjectTO) => {
        dispatch(projectActions.createProject(newProject));
        setCreateDialogIsOpen(false);
    }

    /**
     * Update in the backend
     */
    const updateProject = (projectId: string, updateProject: UpdateProjectTO) => {
        dispatch(projectActions.updateProject(projectId, updateProject));
        setCreateDialogIsOpen(false);
    }

    /**
     * Called if the user interacts wit the delete button of a project
     * Opens a dialog and requests a confirmation from the user for the deletion
     */
    const handleClickOnDeleteProject = useCallback((projectId: string) => {
        const affectedProject: ProjectTO = projects.find((project: ProjectTO) => project.id === projectId);
        if (affectedProject !== undefined) {
            setProjectToBeDeleted(affectedProject);
        }
    }, [projects]);

    /**
     * Perform the deletion of a project after a confirmation is received
     */
    const deleteProject = useCallback((projectId) => {
        dispatch(projectActions.deleteProject(projectId));
        setProjectToBeDeleted(undefined);
    }, [dispatch]);

    return (
        <div>
            <ParagraphHeader title="Projektübersicht" nextItem="container"/>
            <ProjectTable
                projects={projects}
                handleEditProject={setProjectToBeEdited}
                handleDeleteProject={handleClickOnDeleteProject}/>
            <DefaultButton title="Neues Bauvorhaben erstellen" disabled={false}
                           onClicked={() => setCreateDialogIsOpen(true)}/>

            {!createDialogIsOpen ? null :
                <NewProjectDialog
                    handleCloseDialog={() => setCreateDialogIsOpen(false)}
                    createNewProject={createNewProject}/>}

            {projectToBeEdited === undefined ? null :
                <UpdateProjectDialog
                    affectedProject={projectToBeEdited}
                    handleCloseDialog={() => setProjectToBeEdited(undefined)}
                    updateProject={updateProject}/>}

            {projectToBeDeleted === undefined ? null :
                <DeleteProjectDialog
                    affectedProject={projectToBeDeleted}
                    handleDeleteProject={deleteProject}
                    handleCloseDialog={() => setProjectToBeDeleted(undefined)}/>}

        </div>
    );
}

export default ProjectOverviewPage;