import React, {FC, useState }  from 'react';
import {Button, Dialog, Paragraph, Portal} from 'react-native-paper';

import {StyleSheet, View} from "react-native";

type Props = {
    deleteHandler: () => void
    deleteText: string
}

const DeleteButton: FC<Props> = props => {

    const [isDialogShown, setIsDialogShown] = useState(false)

    const deleteAction = () => {
        props.deleteHandler()
        setIsDialogShown(false)
    }

    return (
        <View style={styles.deleteContainer}>
            <Button
                icon={"delete-outline"}
                mode={"outlined"}
                color={"red"}
                onPress={() => setIsDialogShown(true)}
            >Löschen</Button>
            <Portal>
                <Dialog visible={isDialogShown} onDismiss={() => setIsDialogShown(false)}>
                    <Dialog.Title>Warnung</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>{props.deleteText}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setIsDialogShown(false)}>Abbrechen</Button>
                        <Button color={"red"} onPress={deleteAction}>Löschen</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

const styles = StyleSheet.create({
    deleteContainer: {
        marginTop: 15,
        marginHorizontal: 15,
        justifyContent: 'flex-end',
        borderWidth: 0.3,
        borderColor: "red",
        borderRadius: 5
    }
})

export default DeleteButton;
