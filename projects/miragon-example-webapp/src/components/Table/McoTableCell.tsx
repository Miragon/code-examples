import {makeStyles, Padding} from "@material-ui/core";
import {TableCell as MaterialTableCell} from "@material-ui/core";
import clsx from "clsx";
import React from "react";

interface Props {
    className?: string;
    noWrap?: boolean;
    testId?: string;
    padding?: Padding;
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
}

const useStyles = makeStyles(() => ({
    noWrap: {
        whiteSpace: "nowrap"
    },
    cell: {
        borderBottomColor: "#CCC"
    },
}));

const McoTableCell: React.FC<Props> = props => {
    const classes = useStyles();
    return (
        <MaterialTableCell
            padding={props.padding}
            align={props.align}
            className={clsx(props.noWrap && classes.noWrap && classes.cell, props.className)}>
            {props.children}
        </MaterialTableCell>
    );
};

export default McoTableCell;
