import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { FC } from 'react';
import * as AuthHelpers from "../constants/Auth";


interface Props {
    setIsAuthorized: (isAuthorized: boolean) => void,
}

const Auth: FC<Props> = props => {
    const dispatch = useDispatch()

    const authorize = useCallback(async () => {
        await AuthHelpers.authorize(dispatch)
        props.setIsAuthorized(true);
    }, [])

    return (
        <View style={styles.container}>
            <Button onPress={authorize}>Login</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 40,
    },
});






export default Auth;