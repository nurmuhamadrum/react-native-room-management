import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { Button, Header, Body, Title, Fab } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
// import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import Modal from "react-native-modal";
import axios from 'axios'

class Customer extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            isLoading: true
        }
    }

    componentDidMount() {
        this.handleData()
    }

    handleData = async () => {
        await axios.get('http://192.168.1.41:3000/api/v2/customers').then(res => {
            this.setState({ items: res.data, isLoading: false })
            console.log(JSON.stringify(res.data, null, 2));

        }).catch(err => console.log(err))
    }

    handleFlatlist = (image, id, name, phone) => {
        return (
            <View style={{ borderWidth: 2, marginBottom: 10, marginTop: 10, marginHorizontal: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={{ height: 100, width: 100 }} source={{ uri: image }} />
                    <View>
                        <Text style={{ fontSize: 20, marginTop: 10 }}>{name}</Text>
                        <Text>{id}</Text>
                        <Text>{phone}</Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        if (this.state.isLoading) {
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading</Text>
            </View>
        }
        return (
            <View style={style.container}>
                <Header>
                    <Body style={style.textHeader}>
                        <Title>CUSTOMER</Title>
                    </Body>
                </Header>
                <FlatList
                    data={this.state.items}
                    renderItem={({ item }) => this.handleFlatlist(item.image, item.identity_number, item.name, item.phone_number)}
                    keyExtractor={item => item.id.toString()}
                />
                <Fab position="bottomRight">
                    <Icon name="plus" />
                </Fab>

            </View>
        );
    }
}
export default Customer;

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