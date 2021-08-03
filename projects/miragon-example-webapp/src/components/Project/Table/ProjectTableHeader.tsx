import React from "react";
import {TableHead} from "@material-ui/core";
import TableHeaderRow from "../../Table/TableHeaderRow";
import MiragonTableColumn from "../../Table/MiragonTableColumn";

const ProjectTableHeader: React.FC = () => {
    return (
        <TableHead>
            <TableHeaderRow>
                <MiragonTableColumn type="default" align="left" title="Customer"/>
                <MiragonTableColumn type="default" align="left" title="Address"/>
                <MiragonTableColumn type="min" align="right"/>
                <MiragonTableColumn type="min" align="right"/>
            </TableHeaderRow>
        </TableHead>
    );
}

export default ProjectTableHeader;
