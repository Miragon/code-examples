import React from "react";
import {Dialog, DialogActions, DialogContent, DialogContentText, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/styles";
import McoDialogHeader from "../../Dialog/McoDialogHeader";
import {ProjectTO} from "../../../api";

const useStyles = makeStyles({
    dialogDescription: {
        marginBottom: "30px",
    },
    textField: {
        marginBottom: "15px",
    },
});

interface DeleteProjectDialogProps {
    affectedProject: ProjectTO

    handleDeleteProject(projectId: string): void,

    handleCloseDialog(): void,
}

/**
 * A dialog through which the user must confirm that the selected project should be deleted
 */
const DeleteProjectDialog: React.FC<DeleteProjectDialogProps> = (props: DeleteProjectDialogProps) => {
    const classes = useStyles();
    return (
        <Dialog open={true} onClose={props.handleCloseDialog} aria-labelledby="form-dialog-title">
            <McoDialogHeader title="Bauvorhaben löschen"/>
            <DialogContent>
                <DialogContentText className={classes.dialogDescription}>
                    Sie sind im Begriff ein Bauvorhaben zu löschen.
                    Durch diese Aktion werden alle Aufträge zum Bauvorhaben ebenfalls gelöscht.
                    Diese Aktion kann nicht rückgängig gemacht werden.
                    Bitte bestätigen sie, dass sie das Bauvorhaben nichtsdestotrotz löschen möchten.
                </DialogContentText>

                <TextField
                    fullWidth
                    disabled={true}
                    className={classes.textField}
                    label="Kunde"
                    variant="outlined"
                    size="small"
                    value={props.affectedProject.customer}/>

                <TextField
                    fullWidth
                    disabled={true}
                    className={classes.textField}
                    label="Adresse des Bauvorhabens"
                    variant="outlined"
                    size="small"
                    value={props.affectedProject.address}/>

            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleCloseDialog} color="primary">
                    Abbrechen
                </Button>
                <Button
                    color="primary"
                    onClick={() => props.handleDeleteProject(props.affectedProject.id)}>
                    Löschen
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteProjectDialog;