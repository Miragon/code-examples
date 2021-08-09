import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { FC } from 'react';
import * as AuthHelpers from "../constants/Auth";
import ErrorView from "../components/ErrorView";
import {RootState} from "../store/reducers/Store";
import {ApiError} from "../models/apiError";


interface Props {
    setIsAuthorized: (isAuthorized: boolean) => void,
}

const Auth: FC<Props> = props => {
    const dispatch = useDispatch()

    const auth = useSelector((state: RootState) => state.auth)
    const [error, setError] = useState<ApiError | undefined>(auth.error)

    const authorize = useCallback(async () => {
        await AuthHelpers.authorize(dispatch);
    }, [])


    useEffect(() => {
        if(auth.value) {
            props.setIsAuthorized(true);
        }
        else {
            setError(auth.error)
        }
    }, [auth])

    return (
        <View style={styles.container}>
            <Button onPress={authorize}>Login</Button>
            <ErrorView retryMethod={authorize} error={error} setError={setError}/>
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