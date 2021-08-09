import React from "react";
import TableRow from "@material-ui/core/TableRow";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    headerColumn: {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        borderBottom: "1px solid #AAA"
    },
});

const TableHeaderRow: React.FC = props => {
    const classes = useStyles();
    return (
        <TableRow className={classes.headerColumn}>
            {props.children}
        </TableRow>
    );
}

export default TableHeaderRow;