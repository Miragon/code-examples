import React from "react";

import {Toolbar, AppBar, Button} from "@material-ui/core";
import {IconButton} from "@material-ui/core";
import {Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import {AccountCircle} from "@material-ui/icons";
import {useAuth0} from "@auth0/auth0-react";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    logoutButton:{
        color: "inherit",
        display: "flex"
    },
});

const McoAppBar = (props: any) => {

    const classes = useStyles();
    const {logout} = useAuth0();

    return(
        <AppBar
            position="fixed"
            className={clsx(props.classes.appBar, {
                [props.classes.appBarShift]: props.open,
            })}>

            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.drawerOpener}
                    edge="start"
                    className={clsx(props.classes.menuButton, props.open && props.classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    MCO App Desktop Client
                </Typography>
                <div className={props.classes.grow}/>
                <Button className={classes.logoutButton} onClick={() => logout()}>
                    Logout
                </Button>
                <AccountCircle/>
            </Toolbar>
        </AppBar>
    );
}

export default McoAppBar;