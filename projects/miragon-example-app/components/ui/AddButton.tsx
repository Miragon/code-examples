import React, { FC } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import {StyleSheet, TouchableOpacity, View} from "react-native";

type Props = {
    onPress: () => void
}

const AddButton: FC<Props> = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.addButtonStyle}>
                <MaterialCommunityIcons name={"plus-circle-outline"} size={35} color={Colors.secondary}/>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    addButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginHorizontal: 40,
        marginTop: 20,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.secondary,
        backgroundColor: Colors.secondaryBackground,

    },
})

export default AddButton;
