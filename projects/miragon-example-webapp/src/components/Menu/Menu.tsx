import React, {useCallback, useState} from "react";

import Drawer from "./Drawer/Drawer";
import {useTheme} from "@material-ui/core";
import useStyles from "../Layout/Styles/UseStyle"
import MiragonAppBar from "./AppBar/MiragonAppBar";

const Menu = (props: any) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState<boolean>(true);

    const handleDrawerOpen = useCallback(() => {
        setOpen(true);
        props.openSideBar(true);
    }, [props]);

    const handleDrawerClose = useCallback(() => {
        setOpen(false);
        props.openSideBar(false);
    }, [props]);

    return(
        <>
            <MiragonAppBar
                classes={classes}
                drawerOpener={handleDrawerOpen}
                open={open}
                theme={theme}/>

            <Drawer
                classes={classes}
                drawerCloser={handleDrawerClose}
                isOpen={open}
                theme={theme}/>
        </>
    );

}

export default Menu;