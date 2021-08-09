import React, {useState} from "react";

import useStyles from "./Styles/UseStyle"
import clsx from "clsx";
import Router from "./Router"
import {BrowserRouter} from "react-router-dom";
import {makeStyles} from "@material-ui/styles";
import {useAuth0} from "@auth0/auth0-react";
import Button from "@material-ui/core/Button";

const style = makeStyles({
    content: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F5F5F5",
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

    const defaultClasses = style();
    const sidebarClasses = useStyles();
    const [isSideBarOpen] = useState(true)

    // Authentication
    const [initializing, setInitializing] = useState(false);
    const [initialized, setInitialized] = useState(false);
    const {loginWithRedirect, isAuthenticated, isLoading, error, getIdTokenClaims} = useAuth0();

    if (isLoading) {
        return null;
    }

    if (error) {
        return (
            <div className={defaultClasses.errorContainer}>
                <div className={defaultClasses.errorWrapper}>
                    <span className={defaultClasses.errorMessage}>{error.message}</span>
                    <Button
                        variant="outlined"
                        onClick={loginWithRedirect}
                        className={defaultClasses.errorRetry}>
                        Retry Login
                    </Button>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        // noinspection JSIgnoredPromiseFromCall
        loginWithRedirect();
        return null;
    }

    if (!initialized) {
        if (!initializing) {
            setInitializing(true);
            (async () => {
                const token = await getIdTokenClaims();
                localStorage.setItem("token", token.__raw)
                setInitialized(true);
            })();
        }
        return null;
    }

    return (
        <>
            <BrowserRouter>
                <main
                    className={clsx(sidebarClasses.content, {
                        [sidebarClasses.contentShift]: isSideBarOpen,
                    })}>
                    <div className={sidebarClasses.drawerHeader} />
                    <div className={defaultClasses.content}>
                        <Router/>
                    </div>
                </main>
            </BrowserRouter>
        </>
    );
}

export default Layout;