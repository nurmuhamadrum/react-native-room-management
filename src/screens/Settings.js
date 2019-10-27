import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { Button, Header, Body, Title } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from "react-native-modal";

class Settings extends Component {

    render() {
        return (
            <View style={style.container}>
                <Header>
                    <Body style={style.textHeader}>
                        <Title>SETTINGS</Title>
                    </Body>
                </Header>
                <View style={{ flexDirection: 'row', marginHorizontal: 15, marginVertical: 15 }}>
                    <View>
                        <Image style={{ width: 110, height: 110 }}
                            source={{ uri: 'https://t3.ftcdn.net/jpg/00/64/67/52/240_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg' }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 20, marginHorizontal: 10, marginVertical: 10 }}>nurmuhamadrum@gmail.com</Text>
                        <Text style={{ fontSize: 15, marginHorizontal: 10 }}>Nur Muhamad Rum</Text>
                    </View>
                </View>
            </View>
        );
    }
}
export default Settings;

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    room: {
        flexDirection: 'row'
    },
    textHeader: {
        alignItems: 'center'
    },

})