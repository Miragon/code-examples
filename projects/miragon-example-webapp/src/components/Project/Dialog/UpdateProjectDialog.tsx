import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    InputLabel,
    TextField
} from "@material-ui/core";
import {ProjectTO, UpdateProjectTO} from "../../../api";
import McoDialogHeader from "../../Dialog/McoDialogHeader";
import {makeStyles} from "@material-ui/styles";
import McoFormRow from "../../Dialog/McoFormRow";

const useStyles = makeStyles({
    dialogDescription: {
        marginBottom: "30px",
    },
    textField: {
        width: "100%",
        marginBottom: "15px",
    },
});

interface UpdateProjectProps {
    handleCloseDialog(): void,
    affectedProject: ProjectTO,
    updateProject(projectId: string, updateProject: UpdateProjectTO): void,

}

const UpdateProjectDialog: React.FC<UpdateProjectProps> = (props: UpdateProjectProps) => {
    const classes = useStyles();

    const [street, setStreet] = useState(props.affectedProject.address.split(",")[0]);
    const [zipCode, setZipCode] = useState(props.affectedProject.address.split(",")[1]);
    const [customer, setCustomer] = useState(props.affectedProject.customer);

    const [isUpdateEnabled, enableUpdate] = useState<boolean>(street !== "" && zipCode !== "" && customer !== "");

    useEffect(() => {
        enableUpdate(street !== "" && zipCode !== "" && customer !== "");
    }, [customer, street, zipCode])

    const updateProject = useCallback(() => {
        const address = `${street}, ${zipCode}`;
        const updateProjectData: UpdateProjectTO = {customer: customer, address};
        props.updateProject(props.affectedProject.id, updateProjectData);
        props.handleCloseDialog()
    }, [customer, props, street, zipCode])

    return (
        <Dialog open={true} onClose={props.handleCloseDialog}>
            <McoDialogHeader title="Bauvorhaben bearbeiten"/>
            <DialogContent>

                <DialogContentText className={classes.dialogDescription}>
                    Um das ausgewählte Bauvorhaben zu bearbeiten ändern Sie die Daten passend ab und drücken sie dann
                    auf speichern
                </DialogContentText>

                <TextField
                    className={classes.textField}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setCustomer(event.target.value)}
                    label={"Kunde"}
                    value={customer} variant={"outlined"}/>

                <McoFormRow>
                    <TextField
                        className={classes.textField}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setStreet(event.target.value)}
                        label={"Straße und Hausnummer"}
                        value={street} variant={"outlined"}/>

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
                <Button disabled={!isUpdateEnabled} onClick={updateProject}>
                    Aktualisieren
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default UpdateProjectDialog;
