import React from "react";
import {Table, TableBody} from "@material-ui/core";
import ProjectTableHeader from "./ProjectTableHeader";
import TableContainer from "../../Table/TableContainer";
import TableFallbackRow from "../../Table/TableFallbackRow";
import ProjectTableContent from "./ProjectTableContent";
import {ProjectTO} from "../../../api";

interface ProjectTable {
    projects: ProjectTO[];
    handleEditProject(project: ProjectTO): void;
    handleDeleteProject(projectId: string): void;
}

/**
 * Table that show all Project, as well as information about the number of Job per project
 */
const ProjectTable: React.FC<ProjectTable> = (props: ProjectTable) => {
    return (
        <TableContainer>
            <Table>
                <ProjectTableHeader/>
                <TableBody>

                    <TableFallbackRow
                        availableRows={props.projects.length}
                        fallbackText="Keine Bauvorhaben gefunden..."
                        colSpan={4}/>

                    <ProjectTableContent
                        projects={props.projects}
                        handleEditProject={props.handleEditProject}
                        handleDeleteProject={props.handleDeleteProject}/>

                </TableBody>
            </Table>
        </TableContainer>
    );

}

export default ProjectTable;