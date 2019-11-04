import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar, Image, Icon} from 'react-native';
import {Header, Body, Title, Card, CardItem} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {removeAuthKey, getAuthKey} from './../config/auth';
import {setHeaderAuth} from './../config/api';
import {Fonts} from './../config/utils';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import fetchUser from './../_store/user';
import {METHOD_GET, METHOD_PUT} from './../config/constant';

class Settings extends Component {
  componentDidMount() {
    this.handleGetProf();
  }

  handleGetProf = async () => {
    try {
      const user = await getAuthKey();
      setHeaderAuth(user.token);
      this.props.fetchUser(METHOD_GET, user.id);
    } catch (error) {
      console.log(error);
    }
  };

  handleLogout = async () => {
    try {
      await removeAuthKey();
      this.props.navigation.navigate('RouteOne');
    } catch (error) {
      console.log(error);
    }
  };

  handleUpdateProf = async data => {
    try {
      const user = await getAuthKey();
      this.props.fetchUser(METHOD_PUT, user.id, data);
    } catch (error) {
      console.log(error);
    }
  };

  handleUploadAvatar = () => {
    const options = {
      allowsEditing: false,
    };

    ImagePicker.showImagePicker(options, res => {
      if (res.uri) {
        const data = new FormData();
        data.append('avatar', {
          name: res.fileName,
          type: res.type,
          uri: res.uri,
        });
        this.handleUpdateProf(data);
      }
    });
  };

  render() {
    const {user} = this.props;

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
            // justifyContent: 'center',
            // alignItems: 'center',
          }}>
          <View>
            <Card>
              <CardItem>
                <Body>
                  <View style={{flexDirection: 'row'}}>
                    <View>
                      <Image
                        style={{width: 80, height: 80}}
                        source={{
                          uri: user.data.avatarURI,
                        }}
                      />
                    </View>
                    <View style={{marginLeft: 15, justifyContent: 'center'}}>
                      <Text style={style.profilText}>Nur Muhamad Rum</Text>
                      <Text style={style.emailText}>{user.data.email}</Text>
                    </View>
                  </View>
                </Body>
              </CardItem>
            </Card>
          </View>
          <View>
            <TouchableOpacity
              style={style.buttonUpload}
              onPress={() => this.handleUploadAvatar()}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontFamily: Fonts.MontSerratBold,
                }}>
                UPLOAD PICTURE
              </Text>
            </TouchableOpacity>
          </View>
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

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  fetchUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);

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
    marginTop: 10,
    alignItems: 'center',
  },
  profilText: {
    fontSize: 18,
    fontFamily: Fonts.MontSerratBold,
  },
  emailText: {
    fontSize: 15,
    fontFamily: Fonts.MontSerrat,
  },
  buttonUpload: {
    backgroundColor: '#1B885D',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
});
