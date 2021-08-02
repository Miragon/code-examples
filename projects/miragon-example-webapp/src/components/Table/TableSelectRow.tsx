import React from "react";
import TableRow from "@material-ui/core/TableRow";
import {TableCell, Tooltip} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {makeStyles} from "@material-ui/core/styles";
import TableButton from "./TableButton";

const useStyles = makeStyles({
    cell: {
        backgroundColor: "#a2c8db",
        borderBottomColor: "#CCC",
    },
});

interface TableSelectRowProps {
    selectedRows: number;
    textSingleSelect: string;
    textMultiSelect: string;
    tooltip: string
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
            <TableCell colSpan={props.colSpan-1} className={classes.cell}>
                {props.selectedRows === 1 ? props.textSingleSelect :
                    props.selectedRows + " " + props.textMultiSelect}
            </TableCell>
            <TableCell colSpan={1} className={classes.cell}>
                <TableButton
                    onClick={props.handleClickOnDeleteIcon}>
                    <Tooltip title={props.tooltip}>
                        <DeleteIcon/>
                    </Tooltip>
                </TableButton>
            </TableCell>
        </TableRow>
    );
}

export default TableSelectRow;