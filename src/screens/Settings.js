import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Header, Body, Title} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {removeAuthKey} from './../config/auth';
import config from './../config/auth';

class Settings extends Component {
  handleLogout = async () => {
    try {
      await removeAuthKey();
      this.props.navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={style.container}>
        <Header style={{backgroundColor: '#006A9C'}}>
          <Body style={style.textHeader}>
            <Title>SETTINGS</Title>
          </Body>
        </Header>
        <View
          style={{
            flex: 1,
            marginHorizontal: 15,
            marginVertical: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <TouchableOpacity
              style={style.buttonLogout}
              onPress={() => this.handleLogout()}>
              <Text style={{color: 'white', fontSize: 15}}>LOG OUT</Text>
            </TouchableOpacity>
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
  textHeader: {
    alignItems: 'center',
  },
  buttonLogout: {
    backgroundColor: '#DC143C',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
});
