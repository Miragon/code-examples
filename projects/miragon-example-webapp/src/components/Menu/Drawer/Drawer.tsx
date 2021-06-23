import React, {useState} from "react";


import {Collapse, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CategoryIcon from '@material-ui/icons/Category';
import WorkIcon from '@material-ui/icons/Work';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import {Drawer} from "@material-ui/core";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import {NavLink} from "react-router-dom";



const OwnDrawer = (props : any) => {

    const[categoryOpen, setCategoryOpen] = useState(true);
    const[managementOpen, setManagementOpen] = useState(true);

    const collapseCategoryHandler = () => {
        setCategoryOpen(!categoryOpen);
    }

    const collapseManagementHandler = () =>{
        setManagementOpen(!managementOpen);
    }

    return(
        <Drawer
            className={props.classes.drawer}
            variant="persistent"
            anchor="left"
            open={props.isOpen}
            classes={{
                paper: props.classes.drawerPaper,
            }}
        >
            <div className={props.classes.drawerHeader}>
                <IconButton onClick={props.drawerCloser}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
                    <List component="div" disablePadding>
                        <NavLink activeClassName={props.classes.active} className={props.classes.link} to={"/projects"}>
                            <ListItem  className={props.classes.nested}>
                                <ListItemIcon>
                                    <WorkIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Projekte"/>
                            </ListItem>
                        </NavLink>
                    </List>
        </Drawer>
    );

}

export default OwnDrawer;