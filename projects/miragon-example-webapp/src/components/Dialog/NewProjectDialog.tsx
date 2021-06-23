import React, {useState} from "react";
import SettingsFormRow from "./SettingsFormRow";
import {Dialog, DialogActions, DialogContent, TextField, Button, DialogContentText} from "@material-ui/core";
import {NewProjectTO} from "../../api/models";
import McoDialogHeader from "./McoDialogHeader";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    dialogDescription: {
        marginBottom: "30px",
    },
    textField: {
        width: "100%",
        marginBottom: "15px",
    },
});

interface NewProjectDialogProps {
    handleCloseDialog() :void,
    createNewProject(newProject: NewProjectTO): void
}

const NewProjectDialog: React.FC<NewProjectDialogProps> = (props:NewProjectDialogProps) =>{

    const classes = useStyles();

    const [street, setStreet] = useState("");
    const [plz, setPlz] = useState("");
    const [customer, setCustomer] = useState("");

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
        const createProject: NewProjectTO = {customer:customer, address:address.join(', ')};
        props.createNewProject(createProject);
    }

    return(
        <Dialog open={true} onClose={props.handleCloseDialog}>
            <McoDialogHeader title="Neues Projekt anlegen"/>
            <DialogContent>

                <DialogContentText className={classes.dialogDescription}>
                    Um ein neues Projekt zu erstellen füllen sie das untenstehende Formular aus.
                </DialogContentText>

                <TextField
                    className={classes.textField}
                    onChange={changeCustomer}
                    variant={"outlined"}
                    label={"Kunde"}
                    value={customer}/>

                <SettingsFormRow>
                    <TextField
                        className={classes.textField}
                        onChange={changeStreet}
                        label={"Straße und Hausnummer"}
                        value={street} variant={"outlined"}/>

                    <TextField
                        className={classes.textField}
                        onChange={changePlz}
                        variant={"outlined"}
                        label={"Ort und Plz"}
                        value={plz}/>
                </SettingsFormRow>

            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleCloseDialog} color="primary">
                    Abbrechen
                </Button>
                <Button onClick={Save}>
                    Speichern
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default NewProjectDialog;
