import React, {FC} from 'react';
import {Surface} from 'react-native-paper';
import {Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native';

type Props = {
    touchableStyle?: {}
    surfaceStyle: {}
    onPress: () => void
}
const TouchableComponent: FC<Props> = props => {
    const platform = Platform.OS

    if (platform === 'android') {
        return (
            <TouchableNativeFeedback style={props.touchableStyle} onPress={props.onPress} useForeground delayPressIn={500}>
                <Surface style={props.surfaceStyle}>
                    {props.children}
                </Surface>
            </TouchableNativeFeedback>
        );
    } else {
        return (
            <TouchableOpacity style={props.touchableStyle} onPress={props.onPress} activeOpacity={.5}>
                <Surface style={props.surfaceStyle}>
                    {props.children}
                </Surface>
            </TouchableOpacity>
        );
    }
};


export default TouchableComponent;