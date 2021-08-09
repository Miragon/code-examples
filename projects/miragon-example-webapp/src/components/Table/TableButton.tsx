import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import React from "react";
import {createTestAttributes} from "../../util/TestUtils";

interface Props {
    onClick: () => void;
    className?: string;
    disabled?: boolean;
    testId?: string;
}

const useStyles = makeStyles(() => ({
    root: {
        margin: "-16px -8px -16px -24px"
    }
}));

const TableButton: React.FC<Props> = props => {
    const classes = useStyles();
    return (
        <IconButton
            {...createTestAttributes(props.testId)}
            disabled={props.disabled}
            className={clsx(classes.root, props.className)}
            onClick={props.onClick}>
            {props.children}
        </IconButton>
    );
};

export default TableButton;
