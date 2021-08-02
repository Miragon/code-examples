import {makeStyles} from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        "&>*": {
            marginRight: "6px",
            marginLeft: "6px",
            flex: "1 1",
            "&:first-child": {
                marginLeft: "0px"
            },
            "&:last-child": {
                marginRight: "0px"
            }
        }
    }
}));

const McoFormRow: React.FC = (props) => {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            {props.children}
        </div>
    );
}

export default McoFormRow;

