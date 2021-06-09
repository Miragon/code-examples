import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import {StyleSheet, TouchableOpacity, View} from "react-native";

const AddButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.addButtonStyle}>
                <Ionicons name={"add-circle-outline"} size={35} color={Colors.secondary}/>
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
