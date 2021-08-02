import React from "react";
import {makeStyles} from "@material-ui/styles";
import {TableCell, TableRow} from "@material-ui/core";
import {AddCircle} from "@material-ui/icons";


const useStyles = makeStyles({
    addRow: {
        textAlign: "center",
        width: "100%",
    },
    addCicle: {
        color: "blue"
    }
})

interface TableAddRow {
    addDialogopen(): void
}

const TableAddRow: React.FC<TableAddRow> = (props: TableAddRow) => {
    const classes = useStyles();


    return (
        <TableRow>
            <TableCell className={classes.addRow} colSpan={8}>
                <AddCircle className={classes.addCicle} onClick={props.addDialogopen}/>
            </TableCell>
        </TableRow>
    )
}

export default TableAddRow