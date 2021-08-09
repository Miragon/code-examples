import React, {ChangeEvent} from "react";
import {TextField} from "@material-ui/core";

interface TextFieldProps {
    className?: string,
    required?: boolean
    fullWidth?: boolean
    size?: "medium" | "small",
    label: string,
    value: string,
    setValue(newValue: string): void,
    maxLength?: number,
    error: boolean,
    showError: boolean
    textOnError: string,
    multiline?: boolean,
    rows?: number,
}

/**
 * Text field that validates the 'value' based on the 'error' condition
 * (--> but only presents the error, if 'showError' is true -
 * e.g. after the user has pressed on a 'Update' button)
 */
const ValidatedTextField: React.FC<TextFieldProps> = (props: TextFieldProps) => {
    return <TextField
        required={props.required}
        multiline={props.multiline}
        fullWidth={props.fullWidth}
        className={props.className}
        rows={props.rows}
        label={props.label}
        size={props.size ? props.size : "medium"}
        variant="outlined"
        value={props.value}
        inputProps={props.maxLength ? {maxLength: props.maxLength} : undefined}
        error={props.showError && props.error}
        helperText={props.showError && props.error ? props.textOnError : undefined}
        onInput={(event: ChangeEvent<HTMLInputElement>) => props.setValue(event.target.value)}/>
}

export default ValidatedTextField;