import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles(() => ({
    wrapper: {
        minHeight: "40px",
        marginTop: "8px",
        marginBottom: "16px",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    buttons: {
        whiteSpace: "nowrap",
        "&>*": {
            marginTop: "0 !important",
            marginLeft: "0.5rem"
        }
    }
}));

interface HeaderProps {
    title: string;
    small?: boolean;
}

const ParagraphHeader: React.FC<HeaderProps> = props => {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <Typography variant={props.small ? "h6" : "h5"}>
                {props.title}
            </Typography>
            <div className={classes.buttons}>
                {props.children}
            </div>
        </div>
    );
};

export default ParagraphHeader;
