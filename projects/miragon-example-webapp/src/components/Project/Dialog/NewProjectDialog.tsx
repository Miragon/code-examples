import { makeStyles } from "@material-ui/styles";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ProjectControllerApi } from "../../../api";
import { addProject } from "../../../store/reducers/projects";
import { apiExec, hasFailed } from "../../../util/ApiUtils";
import PopupDialog from "../../Dialog/PopupDialog";
import InputFieldRow from "../../Input/InputFieldRow";
import ValidatedTextField from "../../Input/ValidatedTextField";

const useStyles = makeStyles({
    textField: {
        width: "100%",
        marginBottom: "15px",
    },
});

interface NewProjectDialogProps {
    open: boolean;
    onClosed: () => void;
}

const NewProjectDialog: React.FC<NewProjectDialogProps> = props => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const {
        open,
        onClosed
    } = props;

    const [customer, setCustomer] = useState("")
    const [street, setStreet] = useState("");
    const [zipCodeAndCity, setZipCodeAndCity] = useState("");

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const [valid, setValid] = useState(false);
    const [validate, setValidate] = useState(false);

    useEffect(() => {
        setValid(
            customer !== ""
            && street !== ""
            && zipCodeAndCity !== ""
        );
    }, [customer, street, zipCodeAndCity])

    /**
     * Persist a new project in the backend
     */
    const createNewProject = useCallback(async () => {
        setDisabled(true);
        const response = await apiExec(ProjectControllerApi, api => api.createNewProject({
            customer: customer,
            address: `${street}, ${zipCodeAndCity}`
        }));
        setDisabled(false);
        if (hasFailed(response)) {
            setError(response.error.message);
        } else {
            setValidate(false);
            setCustomer("");
            setStreet("");
            setZipCodeAndCity("");

            dispatch(addProject(response.data));
            onClosed();
        }
    }, [customer, street, zipCodeAndCity, dispatch, onClosed]);

    const onCreate = useCallback(() => {
        valid ? createNewProject() : setValidate(true);
    }, [createNewProject, valid]);

    return (
        <PopupDialog
            open={open}
            disabled={disabled}
            title="Neues Projekt anlegen"
            description="Bitte füllen Sie das unten stehende Formular aus, um ein neues Bauvorhaben
                anzulegen."
            secondary="Abbrechen"
            onSecondary={onClosed}
            primary="Anlegen"
            onPrimary={onCreate}
            error={error}
            onCloseError={() => setError(undefined)}>

            <ValidatedTextField
                className={classes.textField}
                required
                size="small"
                multiline
                label="Kunde"
                maxLength={50}
                value={customer}
                setValue={setCustomer}
                error={customer.length === 0}
                showError={validate}
                textOnError="Bitte geben Sie einen Namen an!" />

            <InputFieldRow>
                <ValidatedTextField
                    className={classes.textField}
                    required
                    size="small"
                    label="Straße, Nr."
                    maxLength={40}
                    value={street}
                    setValue={setStreet}
                    error={street.length === 0}
                    showError={validate}
                    textOnError="Bitte geben Sie Straße und Nr. an!" />

                <ValidatedTextField
                    className={classes.textField}
                    required
                    size="small"
                    label="PLZ, Ort"
                    maxLength={30}
                    value={zipCodeAndCity}
                    setValue={setZipCodeAndCity}
                    error={zipCodeAndCity.length === 0}
                    showError={validate}
                    textOnError="Bitte geben Sie PLZ und Ort an!" />
            </InputFieldRow>

        </PopupDialog>
    );
}

export default NewProjectDialog;
