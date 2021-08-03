import {makeStyles} from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles(() => ({
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: "1rem",
    }
}));

const InputFieldRow: React.FC = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.row}>
            {props.children}
        </div>
    );
}

export default InputFieldRow;