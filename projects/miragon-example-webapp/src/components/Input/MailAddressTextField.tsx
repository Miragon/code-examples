import React, {ChangeEvent, useEffect, useMemo, useState} from "react";
import {TextField} from "@material-ui/core";
import {IsEmailValidator} from "fluent-ts-validator/validators/string-based/IsEmailValidator"

interface MailAddressTextFieldProps {
    className?: string;
    fullWidth?: boolean;
    required?: boolean;
    disabled?: boolean;
    size?: 'small' | 'medium';
    label: string;
    emailAddress?: string;
    emailIsValid?: boolean;
    errorIfEmpty?: boolean
    setEmailIsValid?(val: boolean): void;
    onChangeEmailAddress(event: ChangeEvent<HTMLInputElement>): void;
}

const MailAddressTextField: React.FC<MailAddressTextFieldProps> = (props: MailAddressTextFieldProps) => {

    const [emailValidator] = useState<IsEmailValidator>(new IsEmailValidator());

    useEffect(() => {
        if (props.setEmailIsValid !== undefined) {
            props.emailAddress && props.emailAddress.length > 0
                ? props.setEmailIsValid(emailValidator.isValid(props.emailAddress))
                : props.setEmailIsValid(!props.required);
        }
    }, [emailValidator, props, props.emailAddress]);

    const helperText = useMemo<string | undefined>(() => {
        return (props.errorIfEmpty && props.emailAddress === "") || (props.emailAddress && props.emailAddress.length > 0 && !props.emailIsValid)
            ? "Bitte geben Sie eine gültige E-Mail Addresse ein!" : undefined
    }, [props.emailAddress, props.emailIsValid, props.errorIfEmpty]);

    return <TextField
        className={props.className}
        error={helperText !== undefined}
        helperText={helperText}
        fullWidth={props.fullWidth}
        required={props.required}
        disabled={props.disabled}
        variant="outlined"
        type="email"
        size={props.size}
        label={props.label}
        value={props.emailAddress ? props.emailAddress : ""}
        inputProps={{maxLength: 50}}
        onChange={props.onChangeEmailAddress}/>;
}

export default MailAddressTextField;