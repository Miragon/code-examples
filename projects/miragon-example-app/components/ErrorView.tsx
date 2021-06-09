import React, {FC, useCallback, useEffect, useState} from 'react';
import {Portal, Dialog, Button, Paragraph, ActivityIndicator, Subheading} from 'react-native-paper';
import {useDispatch, useSelector } from 'react-redux';
import {RootState} from "../store/reducers/rootReducer";
import ApiError from "../models/apiError";
import * as errorActions from "../store/actions/error";
import {FlatList, View } from 'react-native';
import {authorize} from "../constants/Auth";
import Colors from "../constants/Colors";

interface Props {
    retryButtonName?: string
    retryMethod: () => void
}

const ErrorView: FC<Props> = ({retryButtonName = "Erneut versuchen", retryMethod}) => {
    const dispatch = useDispatch()
    const errors : Array<ApiError> = useSelector((state: RootState) => state.errors.allErrors)
    const [isReauthorizing, setIsReauthorizing] = useState<boolean>(false)
    const [hasTriedReauth, setHasTriedReauth] = useState<boolean>(false)
    const [isErrorStackShown, setIsErrorStackShown] = useState<boolean>(false)

    const onDismiss = () => {
        dispatch(errorActions.deleteAllErrors())
    }

    const onRetry = async () => {
        dispatch(errorActions.deleteAllErrors())
        retryMethod()
    }

    const reauth = useCallback(async () => {
        await authorize(dispatch)
    }, [dispatch])

    useEffect(() => {
        setIsReauthorizing(true)
        errors.forEach((error: ApiError) => {
            if(error.errorMessage.includes("401") && !hasTriedReauth){
                reauth()
                setHasTriedReauth(true)
                return
            }
        })
        setIsReauthorizing(false)
    }, [errors, dispatch])

    return (
        <View>
            { isReauthorizing ?
                <ActivityIndicator animating={true} />
                :
                <Portal>
                    <Dialog visible={errors.length > 0} onDismiss={() => onDismiss}>
                        <Dialog.Title>Fehler</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>{errors[0]?.getUserError() || ""}</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={onDismiss} onLongPress={() => setIsErrorStackShown(true)}>Abbrechen</Button>
                            <Button onPress={onRetry}>{retryButtonName}</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            }
            { isErrorStackShown &&
                <Portal>
                    <Dialog visible={isErrorStackShown} onDismiss={() => setIsErrorStackShown(false)}>
                        <Dialog.Title>Fehler Info</Dialog.Title>
                        <Dialog.Content>
                            <FlatList
                                data={errors}
                                style={{height: '80%'}}
                                keyExtractor={(item, index) => index + ""}
                                renderItem={({item}: { item: ApiError }) =>
                                    <View style={{margin: 5}}>
                                        <Subheading style={{color: Colors.secondary}}>{item.errorMessage}</Subheading>
                                        <Paragraph>AuthModel: {JSON.stringify(item.details.authModel)}</Paragraph>
                                        <Paragraph>Response: {JSON.stringify(item.details.axiosResponse)}</Paragraph>
                                        <Paragraph>RequestModel: {JSON.stringify(item.details.requestModel)}</Paragraph>
                                    </View>
                                }
                            />
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => setIsErrorStackShown(false)}>Ok</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            }
        </View>



    )
}


export default ErrorView;