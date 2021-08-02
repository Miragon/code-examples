import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import * as projectActions from "../../store/actions/projects";
import {useSelector, useDispatch} from "react-redux";
import {NewProjectTO, ProjectTO, UpdateProjectTO} from "../../api";
import {RootState} from "../../store/reducers/Store";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import ProjectTable from "./table/ProjectTable";
import Aux from "../../hoc/Aux/Aux";
import DefaultButton from "../../components/Dialog/DefaultButton";
import NewProjectDialog from "./dialog/NewProjectDialog";

const useStyles = makeStyles({
    title: {
        marginBottom: "30px",
        width: "100%",
    },
});

/**
 *Provides Overview of all Projects and their workingcount
 */
const ProjectOverviewPage: React.FC = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const projects: Array<ProjectTO> = useSelector((state: RootState) => state.projects.allProjects)
    const [projectSearchString, setProjectSearchString] = useState<string>("");
    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);


    useEffect(() => {
        dispatch(projectActions.fetchProjects());
    }, [dispatch]);

    /**
     * Filter the workings of the selected job
     */
    const getMatchingProjects = useCallback((): ProjectTO[] => {
        if (projectSearchString !== "") {
            return projects.filter(project => {
                const searchString = projectSearchString.toLowerCase();
                return project.customer.toLowerCase().includes(searchString);
            });
        } else {
            return projects;
        }
    }, [projectSearchString, projects]);

    const createNewProject = (newProject: NewProjectTO) => {
        dispatch(projectActions.createProject(newProject));
        setDialogIsOpen(false);
    }

    const editProject = (projectId: string, updatedProject: UpdateProjectTO) => {
        dispatch(projectActions.updateProject(projectId, updatedProject))
    }

    const deleteProject = (projectId: string) => {
        dispatch(projectActions.deleteProject(projectId))
    }

    return(
        <Aux>
            <Typography variant={"h5"} className={classes.title}>Projektübersicht:</Typography>
            <ProjectTable
                projects={getMatchingProjects()}
                projectSearchString={projectSearchString}
                editProject={editProject}
                deleteProject={deleteProject}
                handleSearchProject={(event: ChangeEvent<HTMLInputElement>) => setProjectSearchString(event.target.value)}/>
            <DefaultButton title="Neues Projekt erstellen" disabled={false} onClicked={() => setDialogIsOpen(true)}/>

            {dialogIsOpen &&
                <NewProjectDialog
                    handleCloseDialog={() => setDialogIsOpen(false)}
                    createNewProject={createNewProject}
                />
            }
        </Aux>
    );
}

export default ProjectOverviewPage;