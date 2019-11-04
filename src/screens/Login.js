import React, {Component} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  Dimensions,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {storeAuthKey} from './../config/auth';
import {Fonts} from './../config/utils';

const {width: WIDTH} = Dimensions.get('window');

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      icon: 'eye-slash',
      pass: true,
      isDisabled: true,
      invalidPass: false,
      username: '',
      password: true,
      id: null,
      token: '',
    };
  }

  handleButtonFunction = () => {
    axios({
      method: 'POST',
      url: `http://192.168.1.25:3000/api/v2/login`,
      data: {
        email: this.state.username,
        password: this.state.password,
      },
    })
      .then(res => {
        this.setState({
          token:
            res.data.code == 'ERR_WRONG_EMAIL_PASS' ? null : res.data.token,
          id: res.data.code == 'ERR_WRONG_EMAIL_PASS' ? null : res.data.user.id,
        });

        if (this.state.token) {
          storeAuthKey({
            id: this.state.id,
            token: this.state.token,
          });
          this.props.navigation.navigate('Room');
        } else {
          alert('Sorry Wrong Email or Password!'); // this.setState({ isModalVisible: true })
        }
      })
      .catch(err => {
        console.log('axios error:', err);
      });
  };

  changeIcon() {
    this.setState(prevState => ({
      icon: prevState.icon === 'eye' ? 'eye-slash' : 'eye',
      pass: !prevState.pass,
    }));
  }

  emailValidation(username) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(username) == true && this.state.password != null) {
      this.setState({
        username,
        isDisabled: false,
      });
    } else {
      this.setState({
        username,
        isDisabled: true,
      });
    }
    this.setState({
      username,
    });
  }

  passwordValidation(password) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (password != null && reg.test(this.state.username) == true) {
      this.setState({
        password,
        isDisabled: false,
      });
    } else {
      this.setState({
        password,
        isDisabled: true,
      });
    }
    this.setState({
      password,
    });
  }

  render() {
    return (
      <LinearGradient
        // colors={['#F6DF20', '#F6CE16', '#F8CE1A']}
        colors={['#1B885D', '#31B580', '#58E8AF']}
        style={style.backgroundContainer}>
        <StatusBar backgroundColor="#007554" barStyle="light-content" />
        <Icon name="bed" color={'#fafafa'} size={90} style={style.logoIcon} />
        <Text style={style.signinText}>RUM ROOM'S</Text>
        <View>
          <LinearGradient
            colors={['#fafafa', '#ededed']}
            style={style.containerLogin}>
            <View style={style.logoContainer}>
              <Text style={style.logoText}>SIGN IN</Text>
            </View>
            <View style={style.inputContainer}>
              <TextInput
                style={style.input}
                placeholder={'Enter the Email Here'}
                placeholderTextColor={'grey'}
                underlineColorAndroid="transparent"
                onChangeText={text => this.emailValidation(text)}
              />
              <Icon
                name="user-circle"
                color={'#373737'}
                size={24}
                style={style.inputIcon}
              />
            </View>
            <View style={style.inputContainer}>
              <TextInput
                style={style.input}
                placeholder={'Enter the Password Here'}
                secureTextEntry={this.state.pass}
                placeholderTextColor={'grey'}
                underlineColorAndroid="transparent"
                onChangeText={pass => this.passwordValidation(pass)}
              />
              <Icon
                name="key"
                color={'#373737'}
                size={24}
                style={style.inputIcon}
              />
              <Icon
                style={style.eyeIcon}
                name={this.state.icon}
                onPress={() => this.changeIcon()}
              />
            </View>
            <TouchableOpacity
              style={style.btnLoggin}
              onPress={() => this.handleButtonFunction()}>
              <Text style={style.textLogin}>LOGIN</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </LinearGradient>
    );
  }
}

const style = StyleSheet.create({
  backgroundContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 170,
    height: 170,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    color: 'black', //006A9C
    fontSize: 25,
    fontFamily: Fonts.MontSerratBold,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 2,
  },
  inputContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  input: {
    width: WIDTH - 100,
    height: 40,
    borderRadius: 20,
    fontSize: 12,
    paddingLeft: 50,
    backgroundColor: '#fafafa',
    color: 'rgba(0, 0, 0, 0.7)',
    marginHorizontal: 20,
    borderWidth: 0.5,
    fontFamily: Fonts.MontSerrat,
    // elevation: 5,
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 35,
  },
  btnLoggin: {
    width: WIDTH - 100,
    height: 45,
    borderRadius: 20,
    backgroundColor: '#ff4400',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginHorizontal: 20,
    elevation: 3,
  },
  textLogin: {
    fontSize: 18,
    color: '#fafafa',
    fontFamily: Fonts.MontSerrat,
  },
  eyeIcon: {
    position: 'absolute',
    fontSize: 23,
    left: 295,
    top: 7,
    color: '#373737',
  },
  containerLogin: {
    backgroundColor: '#fafafa',
    paddingVertical: 20,
    borderRadius: 20,
    elevation: 5,
  },
  signinText: {
    fontFamily: Fonts.MontSerratBold,
    fontSize: 40,
    color: '#fafafa',
    marginBottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 1,
  },
  logoIcon: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 1,
  },
});
