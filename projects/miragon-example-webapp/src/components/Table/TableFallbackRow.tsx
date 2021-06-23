import React from "react";
import TableRow from "@material-ui/core/TableRow";
import {TableCell} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    fallbackRow: {
        textAlign: "center",
        width: "100%",
    },
});

interface TableFallbackRow {
    availableRows: number;
    fallbackText: string;
    colSpan: number;
}

const TableFallbackRow: React.FC<TableFallbackRow> = (props: TableFallbackRow) => {
    const classes = useStyles();

    if (props.availableRows !== 0) {
        return null;
    }

    return (
        <TableRow>
            <TableCell className={classes.fallbackRow} colSpan={8}>
                {props.fallbackText}
            </TableCell>
        </TableRow>
    );
}

export default TableFallbackRow;