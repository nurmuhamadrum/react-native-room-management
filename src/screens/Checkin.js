import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Header, Body, Title, Input, Item, Picker, Icon} from 'native-base';
import Modal from 'react-native-modal';
import {FlatGrid} from 'react-native-super-grid';

import {connect} from 'react-redux';
import {getAuthKey} from './../config/auth';
import {setHeaderAuth} from './../config/api';
import fetchCheckin from './../_store/checkin';

import {METHOD_GET} from './../config/constant';

class Checkin extends Component {
  constructor() {
    super();
    this.state = {
      isModalVisible: false,
      selected: 'key0',
    };
  }

  onValueChange(value) {
    this.setState({
      selected: value,
    });
  }

  componentDidMount() {
    this.handleGetCheckin();
  }

  handleGetCheckin = async () => {
    try {
      const user = await getAuthKey();
      setHeaderAuth(user.token);
      this.props.fetchCheckin(METHOD_GET);
    } catch (error) {
      console.log(error);
    }
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  handleFlatGrid = item => {
    const styleRoom = [
      style.itemContainer,
      item.order && item.order.is_booked
        ? style.isBookedColor
        : style.isNotBookedColor,
    ];
    return (
      <TouchableOpacity onPress={() => this.toggleModal()}>
        <View style={styleRoom}>
          <Text style={style.itemName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {checkin} = this.props;

    if (checkin.error)
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontWeight: 'bold'}}>Server Error</Text>
        </View>
      );

    if (checkin.isLoading)
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontWeight: 'bold'}}>Loading, Please Wait...</Text>
        </View>
      );

    return (
      <View style={style.container}>
        <Header style={{backgroundColor: '#344DD5'}}>
          <Body style={style.textHeader}>
            <Title>CHECKIN</Title>
          </Body>
        </Header>
        <FlatGrid
          itemDimension={80}
          items={checkin.data ? checkin.data : null}
          style={style.gridView}
          renderItem={({item, index}) => this.handleFlatGrid(item)}
        />

        <View style={{flex: 1}}>
          <Modal isVisible={this.state.isModalVisible}>
            <View style={style.Modal}>
              <View style={{alignItems: 'center'}}>
                <Text style={style.modalText}>CHECKIN</Text>
              </View>
              <View style={{marginHorizontal: 20}}>
                <Text style={style.RoomName}>Room Name</Text>
                <Item style={style.inputRoom} regular>
                  <Input placeholder="" />
                </Item>
              </View>
              <View
                style={{
                  marginHorizontal: 20,
                  marginVertical: 10,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginHorizontal: 5,
                  }}>
                  Customer
                </Text>
                <Item picker>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{width: undefined}}
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange.bind(this)}>
                    <Picker.Item label="Customer 1" value="key0" />
                    <Picker.Item label="Customer 2" value="key1" />
                    <Picker.Item label="Customer 3" value="key2" />
                    <Picker.Item label="Customer 4" value="key3" />
                    <Picker.Item label="Customer 5" value="key4" />
                  </Picker>
                </Item>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginTop: 10,
                    marginHorizontal: 5,
                  }}>
                  Duration (minutes)
                </Text>
                <Item
                  style={{
                    borderWidth: 2,
                    borderRadius: 5,
                    borderColor: 'black',
                    marginTop: 10,
                  }}
                  regular>
                  <Input placeholder="" />
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
                <TouchableOpacity style={style.modalSave} title="Hide modal">
                  <Text style={{color: 'white', fontSize: 18}}>Checkin</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    checkin: state.checkin,
  };
};

const mapDispatcToProps = {
  fetchCheckin,
};

export default connect(
  mapStateToProps,
  mapDispatcToProps,
)(Checkin);

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
  },
  textHeader: {
    alignItems: 'center',
  },
  gridView: {
    marginTop: 10,
    // flex: 1,
  },
  itemContainer: {
    borderRadius: 5,
    padding: 10,
    height: 100,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
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
  modalCancel: {
    fontSize: 18,
    color: 'white',
  },
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
    backgroundColor: '#344DD5',
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
  isBookedColor: {
    backgroundColor: 'grey',
  },
  isNotBookedColor: {
    backgroundColor: '#344DD5',
  },
});
