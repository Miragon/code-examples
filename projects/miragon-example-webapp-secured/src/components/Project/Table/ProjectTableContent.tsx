import { IconButton, TableRow, Tooltip } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import React from "react";
import { ProjectTO } from "../../../api";
import { sortByString } from "../../../util/SortUtils";
import McoTableButtonCell from "../../Table/MiragonTableButtonCell";
import MiragonTableCell from "../../Table/MiragonTableCell";
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
                fallbackText="No Projects found." />

            {sortByString(projects, p => p.customer).map(proj => (
                <TableRow key={proj.id}>
                    <MiragonTableCell>
                        {proj.customer}
                    </MiragonTableCell>
                    <MiragonTableCell>
                            {proj.address}
                    </MiragonTableCell>
                    <McoTableButtonCell>
                        <Tooltip title="Edit Project">
                            <IconButton
                                size="small"
                                onClick={() => onEdit(proj)}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                    </McoTableButtonCell>
                    <McoTableButtonCell>
                        <Tooltip title="Delete Project">
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
