import { makeStyles } from "@material-ui/core";
import {TableContainer as MaterialTable} from "@material-ui/core/";
import clsx from "clsx";
import React from "react";

interface Props {
    className?: string;
    testId?: string;
}

const useStyles = makeStyles({
    root: {
        marginBottom: "1rem",
        backgroundColor: "white",
        border: "1px solid #CCC",
        borderRadius: "6px"
    },
});

const TableContainer: React.FC<Props> = props => {
    const classes = useStyles();
    return (
        <MaterialTable
            className={clsx(classes.root, props.className)}>
            {props.children}
        </MaterialTable>
    );
};

export default TableContainer;
