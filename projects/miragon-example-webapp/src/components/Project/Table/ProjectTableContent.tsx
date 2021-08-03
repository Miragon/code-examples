import { IconButton, TableRow, Tooltip } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import React from "react";
import { ProjectTO } from "../../../api";
import { sortByString } from "../../../util/SortUtils";
import McoTableButtonCell from "../../Table/McoTableButtonCell";
import McoTableCell from "../../Table/McoTableCell";
import TableFallbackRow from "../../Table/TableFallbackRow";


interface Props {
    projects: ProjectTO[];
    onEdit: (project: ProjectTO) => void;
    onDelete: (project: ProjectTO) => void;
}

const ProjectTableContent: React.FC<Props> = props => {
    const {
        projects,
        onEdit,
        onDelete,
    } = props;

    return (
        <>
            <TableFallbackRow
                availableRows={projects.length}
                fallbackText="Keine Bauvorhaben gefunden." />

            {sortByString(projects, p => p.customer).map(proj => (
                <TableRow key={proj.id}>
                    <McoTableCell>
                        {proj.customer}
                    </McoTableCell>
                    <McoTableCell>
                            {proj.address}
                    </McoTableCell>
                    <McoTableButtonCell>
                        <Tooltip title="Bauvorhaben bearbeiten">
                            <IconButton
                                size="small"
                                onClick={() => onEdit(proj)}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                    </McoTableButtonCell>
                    <McoTableButtonCell>
                        <Tooltip title="Bauvorhaben löschen">
                            <IconButton
                                size="small"
                                onClick={() => onDelete(proj)}>
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </McoTableButtonCell>
                </TableRow>
            ))}
        </>
    );
}

export default ProjectTableContent;
