import React from "react";
import {TableHead} from "@material-ui/core";
import TableHeaderRow from "../../Table/TableHeaderRow";
import McoTableColumn from "../../Table/McoTableColumn";

const ProjectTableHeader: React.FC = () => {
    return (
        <TableHead>
            <TableHeaderRow>
                <McoTableColumn type="default" align="left" title="Kunde"/>
                <McoTableColumn type="default" align="left" title="Adresse"/>
                <McoTableColumn type="min" align="right"/>
                <McoTableColumn type="min" align="right"/>
            </TableHeaderRow>
        </TableHead>
    );
}

export default ProjectTableHeader;
