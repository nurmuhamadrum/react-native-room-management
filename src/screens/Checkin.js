import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

class Checkin extends Component {
    render() {
        return (
            <View style={style.container}>
                <Text>Checkin</Text>
            </View>
        );
    }
}
export default Checkin;

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})