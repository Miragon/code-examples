import React from "react";
import {TableHead} from "@material-ui/core";
import TableHeaderRow from "../../../components/Table/TableHeaderRow";
import McoTableColumn from "../../../components/Table/McoTableColumn";

const ProjectTableHeader: React.FC = () => {
    return (
        <TableHead>
            <TableHeaderRow>
                <McoTableColumn type="default" align="left" title="Kunde"/>
                <McoTableColumn type="default" align="left" title="Adresse"/>
                <McoTableColumn type="min" align="right"/>
            </TableHeaderRow>
        </TableHead>
    );
}

export default ProjectTableHeader;