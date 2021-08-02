import React from "react";
import {makeStyles} from "@material-ui/styles";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    headerForInputField: {
        marginTop: "10px",
        marginBottom: "30px",
        width: "100%",
    },
    headerForContainer: {
        marginTop: "10px",
        marginBottom: "16px",
        width: "100%",
    }
}));

interface HeaderProps {
    title: string;
    nextItem: "container" | "inputField";
}

const ParagraphHeader: React.FC<HeaderProps> = (props: HeaderProps) => {
    const classes = useStyles();
    return (
        <Typography
            variant={"h5"}
            className={props.nextItem === "container" ? classes.headerForContainer : classes.headerForInputField}>
            {props.title}
        </Typography>
    );
}

export default ParagraphHeader;