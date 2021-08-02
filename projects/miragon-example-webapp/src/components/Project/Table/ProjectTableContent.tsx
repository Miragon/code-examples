import React from "react";
import {TableRow, Tooltip} from "@material-ui/core";
import McoTableCell from "../../Table/McoTableCell";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import {ProjectTO} from "../../../api";

interface ProjectTable {
    projects: ProjectTO[];

    handleDeleteProject(projectId: string): void;
    handleEditProject(project: ProjectTO): void;
}

/**
 * Table that show all Project, as well as information about the number of Job per project
 */
const ProjectTableContent: React.FC<ProjectTable> = (props: ProjectTable) => {
    return (
        <>
            {props.projects.map((project: ProjectTO) => (
                <TableRow key={project.id}>
                    <McoTableCell>{project.customer}</McoTableCell>
                    <McoTableCell>{project.address}</McoTableCell>
                    <McoTableCell align="right">
                        <Tooltip title="Projekt bearbeiten">
                            <EditIcon onClick={() => props.handleEditProject(project)}/>
                        </Tooltip>
                    </McoTableCell>
                    <McoTableCell>
                        <Tooltip title="Projekt löschen">
                            <DeleteIcon onClick={() => props.handleDeleteProject(project.id)}/>
                        </Tooltip>
                    </McoTableCell>
                </TableRow>
            ))}
        </>
    );

}

export default ProjectTableContent;