import { TableCell } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import SearchTextField from "../Input/SearchTextField";

const useStyles = makeStyles({
    row: {
        width: "100%",
    },
    cell: {
        width: "100%",
        padding: "0px 16px 0px 16px",
        borderBottomColor: "#CCC",
    },
    searchBar: {
        width: "100%",
        marginTop: "10px",
        marginBottom: "10px",
        padding: 0,
    },
});

interface TableSearchRowProps {
    search: string,
    label: string,
    onSearchChanged: (value: string) => void;
}

/**
 * A table row that contains a search bar, to perform a search query on a specific table
 */
const TableSearchRow: React.FC<TableSearchRowProps> = (props: TableSearchRowProps) => {
    const classes = useStyles();
    return (
        <TableRow className={classes.row}>
            <TableCell className={classes.cell} colSpan={99}>
                <SearchTextField
                    label={props.label}
                    search={props.search}
                    className={classes.searchBar}
                    onSearchChanged={props.onSearchChanged} />
            </TableCell>
        </TableRow>
    );
}

export default TableSearchRow;
