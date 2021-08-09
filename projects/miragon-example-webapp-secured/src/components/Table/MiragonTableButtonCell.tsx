import { makeStyles, TableCell as MaterialTableCell } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

interface Props {
    className?: string;
}

const useStyles = makeStyles(() => ({
    cell: {
        padding: "8px 12px"
    },
}));

const McoTableCell: React.FC<Props> = props => {
    const classes = useStyles();
    return (
        <MaterialTableCell
            align="center"
            className={clsx(classes.cell, props.className)}>
            {props.children}
        </MaterialTableCell>
    );
};

export default McoTableCell;
