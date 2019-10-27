import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { Button, Header, Body, Title } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from "react-native-modal";
import { FlatGrid } from 'react-native-super-grid';

class Room extends Component {
    constructor() {
        super()
        this.state = {
            isModalVisible: false,
        }
    }

    toggleModal = () => {
        this.setState({ isModalVisible: true })
    }

    render() {
        return (
            <View style={style.container}>
                <Header>
                    <Body style={style.textHeader}>
                        <Title>ROOM</Title>
                    </Body>
                </Header>
                <View style={style.room}>
                    <Button style={style.Button}><Text style={style.fontRoom}> A1 </Text></Button>
                    <Button style={style.Button}><Text style={style.fontRoom}> A2 </Text></Button>
                    <Button style={style.Button}><Text style={style.fontRoom}> A3 </Text></Button>
                </View>
                <View style={style.room}>
                    <Button style={style.Button}><Text style={style.fontRoom}> B1 </Text></Button>
                    <TouchableOpacity onPress={() => this.toggleModal()} style={{ flex: 2 }}>
                        <Icon name="plus" style={style.icon} />
                        <Text style={{ fontSize: 20, color: 'blue', marginLeft: 30 }}>Add Room</Text>
                    </TouchableOpacity>
                </View>
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={style.Modal}>

                        <TouchableOpacity title="Hide modal" onPress={() => this.toggleModal()}>
                            <Text style={style.modalText}>This is Modal</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    }
}
export default Room;

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    room: {
        flexDirection: 'row'
    },
    Button: {
        paddingLeft: 35,
        paddingRight: 35,
        paddingBottom: 50,
        paddingTop: 50,
        marginRight: 5,
        marginLeft: 15,
        marginTop: 20,
        backgroundColor: '#708090',
        borderRadius: 5,
    },
    fontRoom: {
        fontSize: 30,
        color: '#fff'
    },
    textHeader: {
        alignItems: 'center'
    },
    icon: {
        fontSize: 70,
        marginTop: 25,
        marginLeft: 45
    },
    Modal: {
        backgroundColor: '#fafafa',
        alignItems: 'center',
        borderRadius: 10,
    },
    modalText: {
        marginTop: 15,
        marginBottom: 20,
        fontSize: 18
    },
    modalTryagain: {
        marginBottom: 15,
        fontWeight: 'bold',
        fontSize: 20
    }

})