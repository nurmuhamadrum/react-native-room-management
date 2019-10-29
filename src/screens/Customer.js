import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Header, Body, Title, Fab, Item, Input} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

import {connect} from 'react-redux';
import {getAuthKey} from './../config/auth';
import {setHeaderAuth} from './../config/api';
import fetchCustomers from './../_store/customers';

import {METHOD_GET, METHOD_POST} from './../config/constant';
import {identity} from 'rxjs';

class Customer extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      isLoading: true,
      isModalVisible: false,
      // token: null,
      // id: null,
      name: '',
      identity_number: '',
      phone_number: '',
    };
  }

  componentDidMount() {
    this.handleData();
  }

  handleData = async () => {
    try {
      const user = await getAuthKey();
      setHeaderAuth(user.token);
      this.props.fetchCustomers(METHOD_GET);
    } catch (error) {
      console.log(error);
    }
  };

  handleFlatlist = (image, id, name, phone) => {
    return (
      <View
        style={{
          borderRadius: 5,
          marginBottom: 10,
          marginTop: 10,
          marginHorizontal: 10,
          backgroundColor: '#006A9C',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{
              height: 90,
              width: 90,
              borderRadius: 5,
              marginTop: 7,
              marginLeft: 7,
              marginBottom: 7,
            }}
            source={{uri: image}}
          />
          <View style={{marginLeft: 20, marginTop: 13}}>
            <Text style={{fontSize: 20, color: 'white'}}>{name}</Text>
            <Text style={{color: 'white'}}>{id}</Text>
            <Text style={{color: 'white', fontSize: 15}}>{phone}</Text>
          </View>
        </View>
      </View>
    );
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  handleAddCustomers = () => {
    if (
      (this.state.name, this.state.identity_number, this.state.phone_number)
    ) {
      return this.addData();
    } else {
      alert('Please Enter The Field!');
    }
  };

  addData = async () => {
    try {
      const data = await getAuthKey();
      setHeaderAuth(data.token);
      this.props.fetchCustomers(
        METHOD_POST,
        this.state.name,
        this.state.identity_number,
        this.state.phone_number,
      );
      this.toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  handleName = name => {
    this.setState({name});
  };

  handleIdentity = identity_number => {
    this.setState({identity_number});
  };

  handlePhone = phone_number => {
    this.setState({phone_number});
  };

  render() {
    const {customers} = this.props;

    if (customers.error)
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontWeight: 'bold'}}>Server Error</Text>
        </View>
      );

    if (customers.isLoading)
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontWeight: 'bold'}}>Loading, Please Wait...</Text>
        </View>
      );

    return (
      <View style={style.container}>
        <Header style={{backgroundColor: '#006A9C'}}>
          <Body style={style.textHeader}>
            <Title>CUSTOMER</Title>
          </Body>
        </Header>
        <FlatList
          data={customers.data}
          renderItem={({item}) =>
            this.handleFlatlist(
              item.image,
              item.identity_number,
              item.name,
              item.phone_number,
            )
          }
          keyExtractor={item => item.id.toString()}
        />
        <Fab
          style={{backgroundColor: '#DC143C'}}
          onPress={this.toggleModal}
          position="bottomRight">
          <Icon name="plus" />
        </Fab>
        <View style={{flex: 1}}>
          <Modal isVisible={this.state.isModalVisible}>
            <View style={style.Modal}>
              <View style={{alignItems: 'center'}}>
                <Text style={style.modalText}>ADD NEW CUSTOMER</Text>
              </View>
              <View style={{marginHorizontal: 20, marginTop: 10}}>
                <Text style={style.RoomName}>Name*</Text>
                <Item style={style.inputRoom} regular>
                  <Input
                    placeholder="Enter the Customer Name..."
                    onChangeText={name => this.handleName(name)}
                  />
                </Item>
              </View>

              <View style={{marginHorizontal: 20, marginTop: 10}}>
                <Text style={style.RoomName}>Identity Number*</Text>
                <Item style={style.inputRoom} regular>
                  <Input
                    placeholder="Enter the Identity Number..."
                    onChangeText={identity => this.handleIdentity(identity)}
                  />
                </Item>
              </View>

              <View style={{marginHorizontal: 20, marginTop: 10}}>
                <Text style={style.RoomName}>Phone Number*</Text>
                <Item style={style.inputRoom} regular>
                  <Input
                    placeholder="Enter the Phone Number..."
                    onChangeText={phone => this.handlePhone(phone)}
                  />
                </Item>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  style={style.modalCancel}
                  title="Hide modal"
                  onPress={() => this.toggleModal()}>
                  <Text style={{color: 'white', fontSize: 18}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={style.modalSave}
                  onPress={() => this.handleAddCustomers()}>
                  <Text style={{color: 'white', fontSize: 18}}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

// export default Customer;

const mapStateToProps = state => {
  return {
    customers: state.customers,
  };
};

const mapDispatchToProps = {
  fetchCustomers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Customer);

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  room: {
    flexDirection: 'row',
  },
  textHeader: {
    alignItems: 'center',
  },
  Modal: {
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    borderRadius: 5,
  },
  modalText: {
    marginTop: 15,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
    alignContent: 'center',
  },
  // modalCancel: {
  //   fontSize: 18,
  //   color: 'white',
  // },
  inputRoom: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'black',
  },
  RoomName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
    marginBottom: 5,
  },
  modalSave: {
    backgroundColor: '#006A9C',
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  modalCancel: {
    backgroundColor: '#DC143C',
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
