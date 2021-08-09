import React, {FC} from 'react';
import {Portal, Dialog, Button, Paragraph} from 'react-native-paper';
import {View} from 'react-native';
import {ApiError} from "../models/apiError";

interface Props {
    error: ApiError | undefined
    retryMethod: () => void
    setError: (error: ApiError | undefined) => void
}

const ErrorView: FC<Props> = (props) => {

    return (
        <View>
            <Portal>
                <Dialog visible={props.error !== undefined} onDismiss={() => props.setError(undefined)}>
                    <Dialog.Title>Fehler</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>{props.error?.message ?? ""}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => props.setError(undefined)}>Abbrechen</Button>
                        <Button onPress={props.retryMethod}>Retry</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>


    )
}


export default ErrorView;