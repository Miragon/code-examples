import { Dialog, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Toast } from "../Error/Toast";
import McoDialogHeader from "./McoDialogHeader";

const useStyles = makeStyles((theme: Theme) => ({
    dialogDescription: {
        color: "rgba(0, 0, 0, 0.87)",
        marginTop: "8px",
        marginBottom: "24px"
    },
    error: {
        marginTop: 0
    },
    actionButton: (props: Props) => ({
        color: props.deleteMode ? theme.palette.error.main : theme.palette.primary.main
    }),
    actions: {
        padding: "16px 16px 8px"
    }
}));

interface Props {
    open: boolean;
    disabled: boolean;
    title: string;
    description: string;
    primary: string;
    onPrimary: () => void;
    secondary: string;
    onSecondary: () => void;
    error: string | undefined;
    onCloseError: () => void;
    deleteMode?: boolean;
}

const PopupDialog: React.FC<Props> = props => {
    const classes = useStyles(props);

    const {
        open,
        disabled,
        title,
        description,
        onPrimary,
        onSecondary,
        secondary,
        primary,
        error,
        onCloseError
    } = props;

    return (
        <Dialog
            open={open}
            onClose={onSecondary}
            disableBackdropClick>
            <McoDialogHeader title={title} />
            <DialogContent>

                <Toast
                    message={error}
                    alertClassName={classes.error}
                    onClose={onCloseError} />

                <DialogContentText className={classes.dialogDescription}>
                    {description}
                </DialogContentText>

                {props.children}

            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button
                    disabled={disabled}
                    onClick={onSecondary}>
                    {secondary}
                </Button>
                <Button
                    className={classes.actionButton}
                    disabled={disabled}
                    onClick={onPrimary}>
                    {primary}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PopupDialog;
