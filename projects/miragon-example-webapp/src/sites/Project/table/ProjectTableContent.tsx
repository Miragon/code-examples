import React, { useState } from "react";
import {ProjectTO, UpdateProjectTO} from "../../../api/models";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {IconButton, TableRow} from "@material-ui/core";
import MiragonTableCell from "../../../components/Table/MiragonTableCell";
import EditProjectDialog from "../dialog/EditProjectDialog";

interface ProjectTable {
    projects: ProjectTO[];
    editProject: (id: string, updatedProject: UpdateProjectTO) => void;
    deleteProject: (id: string) => void;
}

/**
 * Table that shows all projects, as well as information about the number of jobs per project
 */
const ProjectTableContent: React.FC<ProjectTable> = (props: ProjectTable) => {
    const [projectToEdit, setProjectToEdit] = useState<string>("")

    return (
        <>
            {props.projects.map((project: ProjectTO) => (
                <TableRow key={project.id}>
                    <MiragonTableCell>{project.customer}</MiragonTableCell>
                    <MiragonTableCell>{project.address}</MiragonTableCell>
                    <MiragonTableCell align="right">
                        <IconButton aria-label="edit" onClick={() => setProjectToEdit(project.id)}>
                            <EditIcon />
                        </IconButton>
                    </MiragonTableCell>
                    <MiragonTableCell align="right">
                        <IconButton aria-label="delete" onClick={() => props.deleteProject(project.id) }>
                            <DeleteIcon />
                        </IconButton>
                    </MiragonTableCell>
                </TableRow>
            ))}

            {projectToEdit &&
            <EditProjectDialog
                handleCloseDialog={() => setProjectToEdit("")}
                projectId={projectToEdit}
                updateProject={props.editProject}
            />
            }
        </>
    );

}

export default ProjectTableContent;