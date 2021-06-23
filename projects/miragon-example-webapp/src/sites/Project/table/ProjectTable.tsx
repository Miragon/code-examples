import React, {ChangeEvent} from "react";
import {ProjectTO} from "../../../api/models";
import {Table, TableBody} from "@material-ui/core";
import TableSearchRow from "../../../components/Table/TableSearchRow";
import ProjectTableHeader from "./ProjectTableHeader";
import TableContainer from "../../../components/Table/TableContainer";
import TableFallbackRow from "../../../components/Table/TableFallbackRow";
import ProjectTableContent from "./ProjectTableContent";

interface ProjectTable {
    projects: ProjectTO[];
    projectSearchString: string;

    handleSearchProject(event: ChangeEvent<HTMLInputElement>): void;
}

/**
 * Table that show all projects, as well as information about the number of jobs per project
 */
const ProjectTable: React.FC<ProjectTable> = (props: ProjectTable) => {
    return (
        <TableContainer>
            <Table>
                <ProjectTableHeader/>
                <TableBody>

                    <TableSearchRow
                        colSpan={6}
                        searchString={props.projectSearchString}
                        searchLabel={"Suche nach Projekten..."}
                        handleSearchForSomething={props.handleSearchProject}/>

                    <TableFallbackRow
                        availableRows={props.projects.length}
                        fallbackText="Keine Projekte gefunden..."
                        colSpan={4}/>

                    <ProjectTableContent
                        projects={props.projects}
                    />
                </TableBody>
            </Table>
        </TableContainer>
    );

}

export default ProjectTable;