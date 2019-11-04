import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {Header, Body, Title} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {removeAuthKey} from './../config/auth';
import {Fonts} from './../config/utils';
import config from './../config/auth';

class Settings extends Component {
  handleLogout = async () => {
    try {
      await removeAuthKey();
      this.props.navigation.navigate('RouteOne');
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={style.container}>
        <Header style={{backgroundColor: '#1B885D'}}>
          <Body style={style.textHeader}>
            <Title
              style={{
                fontFamily: Fonts.MontSerratBold,
                color: '#fafafa',
                fontSize: 25,
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: {width: 1, height: 1},
                textShadowRadius: 1,
              }}>
              SETTINGS
            </Title>
          </Body>
        </Header>
        <StatusBar backgroundColor="#007554" barStyle="light-content" />
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
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontFamily: Fonts.MontSerratBold,
                }}>
                LOG OUT
              </Text>
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
    backgroundColor: '#F8F9FF',
  },
  textHeader: {
    alignItems: 'center',
  },
  buttonLogout: {
    backgroundColor: '#DC143C',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
});
