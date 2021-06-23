import React from "react";
import TableRow from "@material-ui/core/TableRow";
import {TableCell, Tooltip} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {makeStyles} from "@material-ui/core/styles";
import TableButton from "./TableButton";

const useStyles = makeStyles({
    personSelectedCell: {
        backgroundColor: "#a2c8db",
        borderBottomColor: "#CCC",
    },
});

interface TableSelectRowProps {
    selectedRows: number;
    textSingleSelect: string;
    textMultiSelect: string;
    colSpan: number;
    handleClickOnDeleteIcon(): void
}

const TableSelectRow: React.FC<TableSelectRowProps> = (props: TableSelectRowProps) => {
    const classes = useStyles();

    if (props.selectedRows === 0) {
        return null;
    }

    return (
        <TableRow>
            <TableCell colSpan={props.colSpan-1} className={classes.personSelectedCell}>
                {props.selectedRows === 1 ? props.textSingleSelect :
                    props.selectedRows + " " + props.textMultiSelect}
            </TableCell>
            <TableCell colSpan={1} className={classes.personSelectedCell}>
                <TableButton
                    onClick={props.handleClickOnDeleteIcon}>
                    <Tooltip title="Ansprechpartner löschen">
                        <DeleteIcon/>
                    </Tooltip>
                </TableButton>
            </TableCell>
        </TableRow>
    );
}

export default TableSelectRow;