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
} from 'react-native';

import bgImage from './../assets/Room.jpg';
import logoImage from './../assets/Hotel.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {storeAuthKey} from './../config/auth';

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
      <ImageBackground source={bgImage} style={style.backgroundContainer}>
        <View style={style.logoContainer}>
          <Image source={logoImage} style={style.logo} />
          <Text style={style.logoText}>RUM ROOM'S HOTEL</Text>
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
            color={'grey'}
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
          <Icon name="lock" color={'grey'} size={24} style={style.inputIcon} />
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
      </ImageBackground>
    );
  }
}

const style = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 170,
    height: 170,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoText: {
    color: '#fafafa', //006A9C
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  inputContainer: {
    marginTop: 15,
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 20,
    fontSize: 16,
    paddingLeft: 50,
    backgroundColor: '#fafafa',
    color: 'rgba(0, 0, 0, 0.7)',
    marginHorizontal: 25,
  },
  inputIcon: {
    position: 'absolute',
    top: 10,
    left: 40,
  },
  btnLoggin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 20,
    backgroundColor: '#006A9C',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  textLogin: {
    fontSize: 20,
    color: '#fafafa',
  },
  eyeIcon: {
    position: 'absolute',
    fontSize: 23,
    left: 340,
    top: 10,
    color: 'grey',
  },
});
