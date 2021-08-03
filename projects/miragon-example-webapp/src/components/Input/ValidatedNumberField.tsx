import { TextField } from "@material-ui/core";
import React, { ChangeEvent } from "react";

interface TextFieldProps {
    className?: string;
    required?: boolean;
    fullWidth?: boolean;
    size?: "medium" | "small",
    label: string;
    value: number;
    error: boolean;
    showError: boolean;
    textOnError: string;
    disabled?: boolean;

    setValue(newValue: number): void;
}

/**
 * Text field that validates the 'value' based on the 'error' condition
 * (--> but only presents the error, if 'showError' is true -
 * e.g. after the user has pressed on a 'Update' button)
 */
const ValidatedNumberField: React.FC<TextFieldProps> = (props: TextFieldProps) => {
    return (
        <TextField
            disabled={props.disabled}
            required={props.required}
            fullWidth={props.fullWidth}
            className={props.className}
            label={props.label}
            size={props.size ? props.size : "medium"}
            variant="outlined"
            type="number"
            value={props.value}
            error={props.showError && props.error}
            helperText={props.showError && props.error ? props.textOnError : undefined}
            onInput={(event: ChangeEvent<HTMLInputElement>) => props.setValue(Number(event.target.value))} />
    );
}

export default ValidatedNumberField;
