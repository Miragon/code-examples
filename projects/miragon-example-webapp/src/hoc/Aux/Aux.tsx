import * as React from "react"
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    page: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
    },
    pageContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "960px",
    },
});

const Aux: React.FC = props => {
    const classes = useStyles();
    return (
        <div className={classes.page}>
            <div className={classes.pageContent}>
                {props.children}
            </div>
        </div>
    );
}

export default Aux;