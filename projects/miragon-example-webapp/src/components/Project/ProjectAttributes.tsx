import React from "react";
import {TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {ProjectTO} from "../../api";

const useStyles = makeStyles(() => ({
    component: {
        width: "100%",
    },
    projectDetail: {
        marginBottom: "25px",
    },
    inputField: {
        width: "100%"
    },
    gridInputFieldLeft: {
        width: "49.25%",
    },
    gridInputFieldRight: {
        marginLeft: "1.5%",
        width: "49.25%",
    }
}));

interface ProjectProps {
    project: ProjectTO,
}

/**
 * Component that displays basic information about a project
 */
const ProjectAttributes: React.FC<ProjectProps> = (props: ProjectProps) => {
    const classes = useStyles();
    return (
        <div className={classes.component}>
            <div className={classes.projectDetail}>
                <TextField
                    className={classes.inputField}
                    label={"Name des Kunden"}
                    variant="outlined"
                    disabled={true}
                    value={props.project.customer}/>
            </div>

            <div className={classes.projectDetail}>
                <TextField
                    className={classes.gridInputFieldLeft}
                    type="text"
                    label={"Straße"}
                    variant="outlined"
                    disabled={true}
                    value={props.project.address?.split(',')[0]}/>
                <TextField
                    className={classes.gridInputFieldRight}
                    type="text"
                    label="PlZ, Ort"
                    variant="outlined"
                    disabled={true}
                    value={props.project.address?.split(',')[1]}/>
            </div>

        </div>
    );
}

export default ProjectAttributes;
