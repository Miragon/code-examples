import React from "react";
import {TableHead} from "@material-ui/core";
import TableHeaderRow from "../../../components/Table/TableHeaderRow";
import MiragonTableColumn from "../../../components/Table/MiragonTableColumn";

const ProjectTableHeader: React.FC = () => {
    return (
        <TableHead>
            <TableHeaderRow>
                <MiragonTableColumn type="default" align="left" title="Kunde"/>
                <MiragonTableColumn type="default" align="left" title="Adresse"/>
                <MiragonTableColumn type="min" align="right"/>
            </TableHeaderRow>
        </TableHead>
    );
}

export default ProjectTableHeader;