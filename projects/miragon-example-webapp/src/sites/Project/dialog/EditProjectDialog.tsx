import React, {useState} from "react";
import SettingsFormRow from "../../../components/Dialog/SettingsFormRow";
import {Dialog, DialogActions, DialogContent, TextField, Button, DialogContentText} from "@material-ui/core";
import {ProjectTO, UpdateProjectTO} from "../../../api";
import MiragonDialogHeader from "../../../components/Dialog/MiragonDialogHeader";
import {makeStyles} from "@material-ui/styles";
import {RootState} from "../../../store/reducers/Store";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
    dialogDescription: {
        marginBottom: "30px",
    },
    textField: {
        width: "100%",
        marginBottom: "15px",
    },
});

interface Props {
    projectId: string,
    handleCloseDialog() :void,
    updateProject(projectId: string, updateProject: UpdateProjectTO): void
}

const EditProjectDialog: React.FC<Props> = (props:Props) =>{

    const classes = useStyles();
    const project: ProjectTO = useSelector((state: RootState) => state.projects.allProjects).find((project: ProjectTO) => project.id === props.projectId)

    const [street, setStreet] = useState(project.address.split(", ")[0]);
    const [plz, setPlz] = useState(project.address.split(", ")[1]);
    const [customer, setCustomer] = useState(project.customer);

    const changeStreet = (event: any) => {
        setStreet(event.target.value);
    }

    const changePlz = (event:any) => {
        setPlz(event.target.value);
    }

    const changeCustomer = (event:any) => {
        setCustomer(event.target.value);
    }

    async function Save(){
        const address = ["",""];
        address[0] = street;
        address[1] = plz;
        const updateProject: UpdateProjectTO = {customer:customer, address:address.join(', ')};
        props.updateProject(project.id, updateProject);
    }

    return(
        <Dialog open={true} onClose={props.handleCloseDialog}>
            <MiragonDialogHeader title="Edit Project"/>
            <DialogContent>

                <DialogContentText className={classes.dialogDescription}>
                    Please enter the new projects data.
                </DialogContentText>

                <TextField
                    className={classes.textField}
                    onChange={changeCustomer}
                    variant={"outlined"}
                    label={"Customer"}
                    value={customer}/>

                <SettingsFormRow>
                    <TextField
                        className={classes.textField}
                        onChange={changeStreet}
                        label={"street"}
                        value={street} variant={"outlined"}/>

                    <TextField
                        className={classes.textField}
                        onChange={changePlz}
                        variant={"outlined"}
                        label={"zipcode and city"}
                        value={plz}/>
                </SettingsFormRow>

            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleCloseDialog} color="primary">
                    Cancel
                </Button>
                <Button onClick={Save}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditProjectDialog;
