import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import McoFormRow from "../../Dialog/McoFormRow";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    TextField
} from "@material-ui/core";
import {NewProjectTO} from "../../../api";
import McoDialogHeader from "../../Dialog/McoDialogHeader";
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
    handleCloseDialog(): void,
    createNewProject(newProject: NewProjectTO): void
}

const NewProjectDialog: React.FC<NewProjectDialogProps> = (props: NewProjectDialogProps) => {
    const classes = useStyles();

    const [street, setStreet] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [customer, setCustomer] = useState("");

    const [isCreateAllowed, enableCreate] = useState<boolean>(false);


    useEffect(() => {
        enableCreate(street !== "" && zipCode !== "" && customer !== "");
    }, [customer, street, zipCode])

    const createNewProject = useCallback(() => {
        const address = `${street}, ${zipCode}`;
        const createProject: NewProjectTO = {customer: customer, address: address};
        props.createNewProject(createProject);
    }, [props, street, zipCode, customer])


    return (
        <Dialog open={true} onClose={props.handleCloseDialog}>
            <McoDialogHeader title="Neues Bauvorhaben anlegen"/>
            <DialogContent>

                <DialogContentText className={classes.dialogDescription}>
                    Um ein neues Bauvorhaben zu erstellen füllen sie das untenstehende Formular aus.
                </DialogContentText>

                <McoFormRow>
                    <TextField
                        className={classes.textField}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setCustomer(event.target.value)}
                        label={"Kunde"}
                        value={customer} variant={"outlined"}/>
                </McoFormRow>

                <McoFormRow>
                    <TextField
                        className={classes.textField}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setStreet(event.target.value)}
                        label={"Straße und Hausnummer"}
                        value={street}
                        variant={"outlined"}/>

                    <TextField
                        className={classes.textField}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setZipCode(event.target.value)}
                        variant={"outlined"}
                        label={"Ort und Plz"}
                        value={zipCode}/>
                </McoFormRow>

            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleCloseDialog} color="primary">
                    Abbrechen
                </Button>
                <Button disabled={!isCreateAllowed} onClick={createNewProject}>
                    Speichern
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default NewProjectDialog;
