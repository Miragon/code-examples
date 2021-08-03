import React, {ChangeEvent, useEffect, useMemo, useState} from "react";
import {TextField} from "@material-ui/core";

interface PhoneNumberTextFieldProps {
    className?: string;
    fullWidth?: boolean;
    required?: boolean;
    size?: 'small' | 'medium';
    disabled?: boolean;
    label: string;
    phoneNumber?: string;
    phoneNumberIsValid?: boolean;
    showErrorIfEmpty?: boolean;
    setPhoneNumberIsValid?(val: boolean): void;
    onChangePhoneNumber(event: ChangeEvent<HTMLInputElement>): void;
}

const PhoneNumberTextField: React.FC<PhoneNumberTextFieldProps> = (props: PhoneNumberTextFieldProps) => {

    const [phoneNumberRegex] = useState<RegExp>(new RegExp("^$|^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$"));

    useEffect(() => {
        if (props.setPhoneNumberIsValid !== undefined) {
            props.phoneNumber && props.phoneNumber.length > 0
                ? props.setPhoneNumberIsValid(phoneNumberRegex.test(props.phoneNumber))
                : props.setPhoneNumberIsValid(!props.required);
        }
    }, [phoneNumberRegex, props]);

    const helperText = useMemo<string | undefined>(() => {
        return (props.showErrorIfEmpty && props.phoneNumber === "") || (props.phoneNumber && props.phoneNumber.length > 0 && !props.phoneNumberIsValid)
            ? "Bitte geben Sie eine gültige Telefonnummer ein!" : undefined
    }, [props.phoneNumber, props.phoneNumberIsValid, props.showErrorIfEmpty]);

    return <TextField
        className={props.className}
        error={helperText !== undefined}
        helperText={helperText}
        fullWidth={props.fullWidth}
        required={props.required}
        disabled={props.disabled}
        variant="outlined"
        type="text"
        size={props.size}
        label={props.label}
        value={props.phoneNumber ? props.phoneNumber : ""}
        onChange={props.onChangePhoneNumber}/>;
}

export default PhoneNumberTextField;