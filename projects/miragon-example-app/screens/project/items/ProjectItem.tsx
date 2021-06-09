import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Title, Text} from "react-native-paper";
import TouchableComponent from "../../../components/ui/TouchableComponent";
import Styles from '../../../constants/Styles';
import {ProjectTO} from "../../../api/models";

interface Props {
    project: ProjectTO,
    onViewDetail: () => void
}

const ProjectItem: FC<Props> = props => {
    return (
        <TouchableComponent onPress={props.onViewDetail} style={Styles.shadow}>
            <View style={styles.textContainer}>
                <Title style={styles.customer}>{props.project.customer}</Title>
                <Text style={styles.address}>Adresse: {props.project.address}</Text>
            </View>
        </TouchableComponent>
    )
}

const styles = StyleSheet.create({
    customer: {
        marginVertical: 4
    },
    address: {
        paddingVertical: 7,
        textAlign: 'right'
    },
    jobs: {
        paddingTop: 15,
        fontSize: 14,
        color: '#888'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '40%',
        paddingHorizontal: 20
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        height: '60%',
        padding: 10
    }
})

export default ProjectItem;