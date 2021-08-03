import {makeStyles, Padding} from "@material-ui/core";
import {TableCell as MaterialTableCell} from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import {createTestAttributes} from "../../util/TestUtils";

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
    }
}));

const McoTableCell: React.FC<Props> = props => {
    const classes = useStyles();
    return (
        <MaterialTableCell
            {...createTestAttributes(props.testId)}
            padding={props.padding}
            align={props.align}
            className={clsx(props.noWrap && classes.noWrap, props.className)}>
            {props.children}
        </MaterialTableCell>
    );
};

export default McoTableCell;
