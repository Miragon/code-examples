import React from 'react';
import { View, StyleSheet } from 'react-native';
import {IconButton} from 'react-native-paper';

import Colors from '../../constants/Colors';
import {Title} from "react-native-paper";


const DetailsWrapper = props => {
    return (
        <View style={{ ...styles.card, ...props.style}}>
            <View style={styles.headerContainer}>
                <Title style={styles.header}>{props.headerText}</Title>
                <IconButton size={23} icon={props.icon} color={Colors.secondary} onPress={props.onPress}/>
            </View>
            <View style={styles.bodyContainer}>
                {props.children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 5,
        backgroundColor: 'white',
        paddingBottom: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 5
    },
    bodyContainer: {
    },
    header: {
        color: Colors.secondary,
        fontSize: 18,
        padding: 5,
    }
});

export default DetailsWrapper;