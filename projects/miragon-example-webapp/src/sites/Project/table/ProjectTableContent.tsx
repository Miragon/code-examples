import React from "react";
import {ProjectTO} from "../../../api/models";
import {NavLink} from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import {TableRow} from "@material-ui/core";
import McoTableCell from "../../../components/Table/McoTableCell";

interface ProjectTable {
    projects: ProjectTO[];
}

/**
 * Table that show all projects, as well as information about the number of jobs per project
 */
const ProjectTableContent: React.FC<ProjectTable> = (props: ProjectTable) => {
    return (
        <>
            {props.projects.map((project: ProjectTO) => (
                <TableRow key={project.id}>
                    <McoTableCell>{project.customer}</McoTableCell>
                    <McoTableCell>{project.address}</McoTableCell>
                    <McoTableCell align="right">
                        <NavLink to={"/project/" + project.id}>
                            <SearchIcon/>
                        </NavLink>
                    </McoTableCell>
                </TableRow>
            ))}
        </>
    );

}

export default ProjectTableContent;