import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(() => ({
    dialogTitle: {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        borderBottom: "1px solid #AAA",
        paddingTop: "10px",
        paddingBottom: "10px",
        marginBottom: "15px",
    }
}));

interface DialogHeaderProps {
    title: string;
}

const McoDialogHeader: React.FC<DialogHeaderProps> = (props : DialogHeaderProps) => {
    const classes = useStyles();
    return (
        <DialogTitle className={classes.dialogTitle}>
            {props.title}
        </DialogTitle>
    );
}

export default McoDialogHeader;