import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Add } from "@material-ui/icons";
import { fetchProjects } from "../../store/reducers/projects";
import { ProjectTO } from "../../api";
import {RootState} from "../../store/reducers/Store";
import ProjectTable from "../../components/Project/Table/ProjectTable";
import DefaultButton from "../../components/Dialog/DefaultButton";
import NewProjectDialog from "../../components/Project/Dialog/NewProjectDialog";
import DeleteProjectDialog from "../../components/Project/Dialog/DeleteProjectDialog";
import ParagraphHeader from "../../components/Header/ParagraphHeader";
import UpdateProjectDialog from "../../components/Project/Dialog/UpdateProjectDialog";
import {retryAction, Toast} from "../../components/Error/Toast";


/**
 * A page that provides an overview of all Project
 * The user can select and delete Project
 */
const ProjectOverviewPage: React.FC = () => {
    const dispatch = useDispatch();

    const projects = useSelector((state: RootState) => state.projects);

    const [createDialogIsOpen, setCreateDialogIsOpen] = useState<boolean>(false);
    const [projectToBeDeleted, setProjectToBeDeleted] = useState<ProjectTO>();
    const [projectToBeEdited, setProjectToBeEdited] = useState<ProjectTO>();

    const error = projects.error;

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);


    return (
        <div>
            <ParagraphHeader title="All Projects">
                <DefaultButton
                    icon={<Add />}
                    title="Create new Project"
                    onClicked={() => setCreateDialogIsOpen(true)} />
            </ParagraphHeader>

            {error && (
                <Toast
                    message="Failed to load data. Please try again."
                    action={retryAction(() => {
                        projects.error && dispatch(fetchProjects());
                    })} />
            )}
            <ProjectTable
                projects={projects.value}
                onEdit={setProjectToBeEdited}
                onDelete={setProjectToBeDeleted}
            />


            <NewProjectDialog
                open={createDialogIsOpen}
                onClosed={() => setCreateDialogIsOpen(false)}/>

            <DeleteProjectDialog
                open={!!projectToBeDeleted}
                project={projectToBeDeleted}
                onClosed={() => setProjectToBeDeleted(undefined)}/>

            <UpdateProjectDialog
                open={!!projectToBeEdited}
                project={projectToBeEdited ?? {id: "", customer: "", address: ""}}
                onClose={() => setProjectToBeEdited(undefined)}/>


        </div>
    );
};

export default ProjectOverviewPage;