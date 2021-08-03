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
}

/**
 * A table row that is displayed when a search-query on a table returns no results
 */
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
