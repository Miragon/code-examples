import React, {useState} from "react";

import useStyles from "./Styles/UseStyle"
import Router from "./Router"
import {BrowserRouter} from "react-router-dom";
import {makeStyles} from "@material-ui/styles";
import {useAuth0} from "@auth0/auth0-react";
import Button from "@material-ui/core/Button";

const styles = makeStyles({
    content: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F5F5F5",
    },
    page: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    pageContent: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    container: {
        flexGrow: 1
    },
    errorContainer: {
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        paddingBottom: "50vh"
    },
    errorWrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#9f2121",
        margin: "auto",
        padding: "1rem 4rem",
        borderRadius: "1rem",
        color: "white"
    },
    errorMessage: {
        marginTop: "2rem",
        fontSize: "1rem"
    },
    errorRetry: {
        marginTop: "2rem",
        marginBottom: "1rem",
        borderColor: "rgba(255,255,255,0.87)",
        color: "rgba(255,255,255,0.87)",
        textTransform: "none",
        fontSize: "1rem"
    }
});

const Layout: React.FC = () => {

    const classes = styles();
    const sidebarClasses = useStyles();

    return (
        <>
            <BrowserRouter>
                <main>
                    <div className={sidebarClasses.drawerHeader} />
                    <div className={classes.content}>
                        <div className={classes.page}>
                            <div className={classes.pageContent}>
                                <Router/>
                            </div>
                        </div>
                    </div>
                </main>
            </BrowserRouter>
        </>
    );
}

export default Layout;