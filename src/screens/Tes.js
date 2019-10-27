import React, { Component } from 'react';
import axios from 'axios';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Text, Button, Content, Input, Item, Container } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            icon: "eye-slash",
            password: true,
            isDisabled: true,
            invalidPass: false,
            activeButton: true

        }
    }

    changeIcon() {
        this.setState(prevState => ({
            icon: prevState.icon === 'eye' ? 'eye-slash' : 'eye',
            password: !prevState.password
        }));
    }


    emailValidation(text) {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            this.setState({
                isDisabled: false,
            })
        } else {
            this.setState({
                isDisabled: true,
            })
        }
    }

    passwordValidation(pass) {
        if (pass == "") {
            this.setState({
                invalidPass: false,
            })
        } else {
            this.setState({
                invalidPass: true,
            })
        }
    }

    buttonFunction() {
        let a = this.state.isDisabled;
        let b = this.state.invalidPass;
        if (a == true && b == true) {
            return false
        } else {
            return true
        }
    }

    render() {
        return (
            <Container style={style.container}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#00008B" translucent={false} />
                <Content showsVerticalScrollIndicator={false} Vertical={true}>
                    <View style={style.logiView}>
                        <Text style={style.login}>LOG IN RUMROOM'S</Text>
                    </View>
                    <View style={style.inputView}>
                        <Text style={style.email}>Email</Text>
                        <Item style={style.placeHolder} regular>
                            <Input onChangeText={(text) => this.emailValidation(text)} placeholder='Enter the Email...' />
                        </Item>
                        <Text style={style.password}>Password</Text>
                        <Item style={style.placeHolder} regular>
                            <Input onChangeText={(pass) => this.passwordValidation(pass)}
                                secureTextEntry={this.state.password}
                                placeholder='Enter the Password...' /><Icon style={style.eyeIcon} name={this.state.icon}
                                    onPress={() => this.changeIcon()} />
                        </Item>
                        <Button onPress={() => this.props.navigation.navigate('Room')} success disabled={this.buttonFunction()} style={style.loginButton} block warning>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Log In</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}



const style = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
    login: {
        fontWeight: 'bold',
        fontSize: 45,
        color: '#00008B',
        marginVertical: 10,
        marginTop: 170,
        alignContent: 'center'
    },
    emailInfo: {
        marginHorizontal: 50,
        marginBottom: 40
    },
    email: {
        marginBottom: 5,
        marginLeft: 5
    },
    password: {
        marginBottom: 1,
        marginLeft: 5,
        marginTop: 5
    },
    loginButton: {
        marginTop: 20,
        borderRadius: 10,
    },
    eyeIcon: {
        fontSize: 23,
        marginRight: 10
    },
    webtoon: {
        fontSize: 20,
        color: '#FFA500',
        fontWeight: 'bold'
    },
    placeHolder: {
        borderRadius: 10,
        marginTop: 5,
        borderColor: 'silver',
    },
    faketoon: {
        fontSize: 50,
        color: '#FFA500',
        fontWeight: 'bold'
    },
    logiView: {
        alignItems: 'center'
    },
    inputView: {
        marginHorizontal: 25
    }


})