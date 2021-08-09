import { makeStyles } from "@material-ui/styles";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ProjectControllerApi, ProjectTO } from "../../../api";
import { updateProject } from "../../../store/reducers/projects";
import { apiExec, hasFailed } from "../../../util/ApiUtils";
import { splitAddress } from "../../../util/TextUtils";
import PopupDialog from "../../Dialog/PopupDialog";
import InputFieldRow from "../../Input/InputFieldRow";
import ValidatedTextField from "../../Input/ValidatedTextField";

const useStyles = makeStyles({
    textField: {
        width: "100%",
        marginBottom: "15px",
    },
});

interface UpdateProjectProps {
    open: boolean;
    onClose: () => void;
    project: ProjectTO;
}

const UpdateProjectDialog: React.FC<UpdateProjectProps> = (props: UpdateProjectProps) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const {
        onClose,
        open,
        project
    } = props;

    const [customer, setCustomer] = useState("");
    const [street, setStreet] = useState("");
    const [zipCodeAndCity, setZipCodeAndCity] = useState("");

    const [error, setError] = useState<string | undefined>();
    const [disabled, setDisabled] = useState(false);
    const [inputIsValid, setInputIsValid] = useState(false);
    const [validate, setValidate] = useState(false);

    useEffect(() => {
        setInputIsValid(
            customer !== ""
            && street !== ""
            && zipCodeAndCity !== ""
        );
    }, [customer, street, zipCodeAndCity]);

    useEffect(() => {
        setCustomer(project.customer);
        setStreet(splitAddress(project.address)[0] || "");
        setZipCodeAndCity(splitAddress(project.address)[1] || "");
    }, [project, open]);

    const onClosed = useCallback(() => {
        setValidate(false);
        setError(undefined);
        onClose();
    }, [onClose]);

    const onSave = useCallback(async () => {
        if (!inputIsValid) {
            setValidate(true);
            return;
        }

        setError(undefined);
        setDisabled(true);

        const response = await apiExec(ProjectControllerApi, api => api.updateProject(project.id, {
            customer: customer,
            address: street + ", " + zipCodeAndCity,
        }));
        setDisabled(false);

        if (hasFailed(response)) {
            setError(response.error.message);
        } else {
            setValidate(false);
            dispatch(updateProject(response.data));
            onClose();
        }
    }, [dispatch, inputIsValid, project, onClose, customer, zipCodeAndCity, street]);

    return (
        <PopupDialog
            open={open}
            disabled={disabled}
            title="Update project"
            description="Please fill the form below to update the project."
            secondary="Cancel"
            onSecondary={onClosed}
            primary="Save"
            onPrimary={onSave}
            error={error}
            onCloseError={() => setError(undefined)}>

            <ValidatedTextField
                className={classes.textField}
                required
                size="small"
                multiline
                label="Customer"
                maxLength={50}
                value={customer}
                setValue={setCustomer}
                error={customer.length === 0}
                showError={validate}
                textOnError="Please enter the projects name." />

            <InputFieldRow>
                <ValidatedTextField
                    className={classes.textField}
                    required
                    size="small"
                    label="Street and Nr."
                    maxLength={40}
                    value={street}
                    setValue={setStreet}
                    error={street.length === 0}
                    showError={validate}
                    textOnError="Please set the projects street and the street number." />

                <ValidatedTextField
                    className={classes.textField}
                    required
                    size="small"
                    label="Zip code and city"
                    maxLength={30}
                    value={zipCodeAndCity}
                    setValue={setZipCodeAndCity}
                    error={zipCodeAndCity.length === 0}
                    showError={validate}
                    textOnError="Please set the projects zip code and city." />
            </InputFieldRow>

        </PopupDialog>
    );
}

export default UpdateProjectDialog;
