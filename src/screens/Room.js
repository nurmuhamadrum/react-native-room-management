import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Fab, Header, Body, Title, Input, Item} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import {FlatGrid} from 'react-native-super-grid';

import {connect} from 'react-redux';
import {getAuthKey} from './../config/auth';
import {setHeaderAuth} from './../config/api';
import fetchRoom from './../_store/rooms';

import {METHOD_GET, METHOD_POST, METHOD_PUT} from './../config/constant';

class Room extends Component {
  constructor() {
    super();
    this.state = {
      isModalVisible: false,
      name: '',
      isModalEditVisible: false,
      idRoom: '',
      // isEdit: false,
    };
  }

  componentDidMount() {
    this.handleGetAllRooms();
  }

  handleGetAllRooms = async () => {
    try {
      const user = await getAuthKey();
      setHeaderAuth(user.token);
      this.props.fetchRoom(METHOD_GET);
    } catch (error) {
      console.log(error);
    }
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  toggleModalEdit = (idRoom, name) => {
    this.setState({
      idRoom,
      name: name,
    });
    this.setState({isModalEditVisible: !this.state.isModalEditVisible});
  };

  handleAddRoom = () => {
    if (this.state.name) {
      return this.addData();
    } else {
      alert('Please Enter the Room Name!');
    }
  };

  addData = async () => {
    try {
      const data = await getAuthKey();
      setHeaderAuth(data.token);
      this.props.fetchRoom(METHOD_POST, this.state.name);
      this.toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  handleName = name => {
    this.setState({name});
  };

  handleUpdate = () => {
    if (this.state.name) {
      return this.updateData();
    } else {
      alert('Please Enter The Room Name!');
    }
  };

  updateData = async () => {
    try {
      const data = await getAuthKey();
      setHeaderAuth(data.token);
      this.props.fetchRoom(METHOD_PUT, this.state.name, this.state.idRoom);
      this.toggleModalEdit();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {rooms} = this.props;

    if (rooms.error)
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontWeight: 'bold'}}>Server Error</Text>
        </View>
      );

    if (rooms.isLoading)
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontWeight: 'bold'}}>Loading, Please Wait...</Text>
        </View>
      );

    // let modalEdit;
    // if (this.state.isEdit) modalEdit = 'EDIT NAME ROOM';
    // else modalEdit = 'ADD NEW ROOM';

    return (
      <View style={style.container}>
        <Header style={{backgroundColor: '#344DD5'}}>
          <Body style={style.textHeader}>
            <Title>ROOM</Title>
          </Body>
        </Header>
        <FlatGrid
          itemDimension={80}
          items={rooms.data ? rooms.data : null}
          style={style.gridView}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => this.toggleModalEdit(item.id, item.name)}>
              <View style={style.itemContainer}>
                <Text style={style.itemName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
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
                <Text style={style.modalText}>ADD NEW ROOM</Text>
              </View>
              <View style={{marginHorizontal: 20}}>
                <Text style={style.RoomName}>Room Name</Text>
                <Item style={style.inputRoom} regular>
                  <Input
                    placeholder="Enter the Room Name"
                    onChangeText={name => this.handleName(name)}
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
                  title="Hide modal"
                  onPress={() => this.handleAddRoom()}>
                  <Text style={{color: 'white', fontSize: 18}}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        <View style={{flex: 1}}>
          <Modal isVisible={this.state.isModalEditVisible}>
            <View style={style.Modal}>
              <View style={{alignItems: 'center'}}>
                <Text style={style.modalText}>EDIT ROOM NAME</Text>
              </View>
              <View style={{marginHorizontal: 20}}>
                <Text style={style.RoomName}>Room Name</Text>
                <Item style={style.inputRoom} regular>
                  <Input
                    placeholder="Enter the Room Name"
                    onChangeText={name => this.handleName(name)}
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
                  onPress={() => this.toggleModalEdit()}>
                  <Text style={{color: 'white', fontSize: 18}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={style.modalSave}
                  title="Hide modal"
                  onPress={() => this.handleUpdate()}>
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

// export default Room;

const mapStateToProps = state => {
  return {
    rooms: state.rooms,
  };
};

const mapDispatcToProps = {
  fetchRoom,
};

export default connect(
  mapStateToProps,
  mapDispatcToProps,
)(Room);

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
    backgroundColor: '#344DD5',
    borderRadius: 5,
    padding: 10,
    height: 100,
    elevation: 5,
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
});
