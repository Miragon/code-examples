import { Table, TableBody } from "@material-ui/core";
import React, { useMemo, useState } from "react";
import { searchAllCaseInsensitive } from "../../../util/SearchUtils";
import TableContainer from "../../Table/TableContainer";
import TableSearchRow from "../../Table/TableSearchRow";
import ProjectTableContent from "./ProjectTableContent";
import ProjectTableHeader from "./ProjectTableHeader";
import {ProjectTO} from "../../../api";

interface ProjectTable {
    projects: ProjectTO[];
    onEdit: (project: ProjectTO) => void;
    onDelete: (project: ProjectTO) => void;
}

/**
 * Table that shows all projects, as well as information about the number of jobs per project
 */
const ProjectTable: React.FC<ProjectTable> = props => {
    const {
        projects,
        onEdit,
        onDelete,
    } = props;

    const [search, setSearch] = useState("");

    const filteredProjects = useMemo(() => projects.filter(project => {
        return searchAllCaseInsensitive(search,
            project.address,
            project.customer,
        );
    }), [projects, search]);

    return (
        <TableContainer>
            <Table>
                <ProjectTableHeader />
                <TableBody>

                    <TableSearchRow
                        search={search}
                        label="Search in Projects..."
                        onSearchChanged={setSearch} />

                    <ProjectTableContent
                        projects={filteredProjects}
                        onEdit={onEdit}
                        onDelete={onDelete} />

                </TableBody>

            </Table>
        </TableContainer>
    );
}

export default ProjectTable;
