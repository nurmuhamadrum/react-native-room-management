import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {
  Header,
  Body,
  Title,
  Input,
  Item,
  Picker,
  Icon,
  Badge,
} from 'native-base';
import Modal from 'react-native-modal';
import {FlatGrid} from 'react-native-super-grid';
import CountDown from 'react-native-countdown-component';

import {connect} from 'react-redux';
import {getAuthKey} from './../config/auth';
import {setHeaderAuth} from './../config/api';
import fetchCheckin from './../_store/checkin';
import fetchCustomer from './../_store/customers';
import fetchRoom from './../_store/rooms';
import {getTimeDiffMin, getTimeDiffSec} from './../config/utils';
import {Fonts} from './../config/utils';

import {METHOD_GET, METHOD_POST, METHOD_PUT} from './../config/constant';

class Checkin extends Component {
  constructor() {
    super();
    this.state = {
      isModalVisible: false,
      room_id: null,
      customer_id: null,
      order_id: null,
      roomName: null,
      duration: null,
      isCheckout: false,
    };
  }

  componentDidMount() {
    this.handleGetCheckin();
  }

  toggleModal = async (roomName, room_id) => {
    await this.setState({
      roomName,
      room_id,
    });
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  toggleModalDisable = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  handleGetCheckin = async () => {
    try {
      const user = await getAuthKey();
      setHeaderAuth(user.token);
      this.props.fetchCheckin(METHOD_GET);
      this.props.fetchCustomer(METHOD_GET);
      this.props.fetchRoom(METHOD_GET);
    } catch (error) {
      console.log(error);
    }
  };

  handleAddCheckin = async orderData => {
    try {
      const user = await getAuthKey();
      this.toggleModal();
      this.props.fetchCheckin(METHOD_POST, orderData);
    } catch (error) {
      console.log(error);
    }
  };

  handleAddCheckout = async (order_id, auto) => {
    try {
      const user = await getAuthKey();
      if (!auto) this.toggleModal();
      this.props.fetchCheckin(METHOD_PUT, null, order_id);
    } catch (error) {
      console.log(error);
    }
  };

  handleResetState = () => {
    this.setState({
      room_id: null,
      customer_id: null,
      order_id: null,
      roomName: null,
      customerName: null,
      duration: null,
      isCheckout: false,
    });
  };

  showTimer = room => {
    const {order} = room;
    const isCheckout = order && order.is_booked ? true : false;

    if (isCheckout) {
      const date = new Date(order.order_end_time);
      const duration = getTimeDiffSec(date);

      return (
        <View style={style.timerCount}>
          <CountDown
            until={duration}
            size={14}
            onFinish={() => this.handleAddCheckout(order.id, true)}
            digitStyle={{
              backgroundColor: 'white',
            }}
            digitTxtStyle={{
              color: 'black',
              fontWeight: 'bold',
            }}
            timeToShow={['M', 'S']}
            timeLabels={{m: null, s: null}}
          />
        </View>
      );
    }
  };

  handleFlatGrid = room => {
    const roomName = room.name;
    const room_id = room.id;
    const styleRoom = [
      style.itemContainer,
      room.order && room.order.is_booked
        ? style.isBookedColor
        : style.isNotBookedColor,
    ];
    return (
      <TouchableOpacity
        onPress={() => {
          const {customer, order} = room;
          const customer_id = customer ? customer_id : null;
          const order_id = order ? order_id : null;
          const isCheckout = order && order.is_booked ? true : false;
          let duration = null;

          if (isCheckout) {
            const date = new Date(order.order_end_time);
            duration = getTimeDiffMin(date);
          }

          this.handleResetState();
          this.setState({
            room_id: room.id,
            customer_id,
            order_id,
            roomName: room.name,
            duration,
            isCheckout,
          });
          this.toggleModal(roomName, room_id);
        }}>
        <View style={styleRoom}>
          {this.showTimer(room)}
          <Text style={style.itemName}>{room.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {checkin} = this.props;

    if (checkin.error)
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontWeight: 'bold'}}>{checkin.error.message}</Text>
        </View>
      );

    if (checkin.isLoading)
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );

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
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 3,
              }}>
              CHECKIN
            </Title>
          </Body>
        </Header>
        <StatusBar backgroundColor="#007554" barStyle="light-content" />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Badge
            style={{
              backgroundColor: '#1B885D',
              justifyContent: 'center',
              marginTop: 20,
              marginRight: 10,
            }}>
            <Text style={{color: 'white', paddingHorizontal: 5}}>
              Available Room
            </Text>
          </Badge>
          <Badge
            style={{
              backgroundColor: 'grey',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Text style={{color: 'white', paddingHorizontal: 5}}>
              Room Is Booked
            </Text>
          </Badge>
        </View>
        <FlatGrid
          itemDimension={80}
          items={checkin.data ? checkin.data : null}
          style={style.gridView}
          renderItem={({item, index}) => this.handleFlatGrid(item)}
          onRefresh={() => this.handleGetCheckin()}
          refreshing={false}
        />

        <View style={{flex: 1}}>
          <Modal isVisible={this.state.isModalVisible}>
            <View style={style.Modal}>
              <View style={{alignItems: 'center'}}>
                <Text style={style.modalText}>
                  {this.state.isCheckout ? 'CHECKOUT' : 'CHECKIN'}
                </Text>
              </View>
              <View style={{marginHorizontal: 20}}>
                <Text style={style.RoomName}>Room Name</Text>
                <Item style={style.inputRoom} regular>
                  <Input
                    style={style.inputText}
                    value={this.state.roomName}
                    editable={false}
                  />
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
                    marginHorizontal: 5,
                    fontFamily: Fonts.MontSerratBold,
                  }}>
                  Customer
                </Text>
                <Item picker>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{
                      fontFamily: Fonts.MontSerratBold,
                      width: undefined,
                    }}
                    selectedValue={
                      this.state.customer_id ? this.state.customer_id : null
                    }
                    onValueChange={itemValue => {
                      this.setState({customer_id: itemValue});
                    }}
                    enabled={this.state.isCheckout ? false : true}>
                    {this.props.customers.data.map(customer => (
                      <Picker.Item
                        style={style.inputText}
                        key={customer.id.toString()}
                        label={customer.name}
                        value={customer.id}
                      />
                    ))}
                  </Picker>
                </Item>
                <Text
                  style={{
                    fontSize: 18,
                    marginTop: 10,
                    marginHorizontal: 5,
                    fontFamily: Fonts.MontSerratBold,
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
                  <Input
                    style={style.inputText}
                    keyboardType="numeric"
                    onChangeText={duration => this.setState({duration})}
                    value={
                      this.state.isCheckout
                        ? this.state.duration.toString()
                        : null
                    }
                    editable={this.state.isCheckout ? false : true}
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
                  onPress={() => this.toggleModalDisable()}>
                  <Text
                    style={{
                      fontFamily: Fonts.MontSerratBold,
                      color: 'white',
                      fontSize: 15,
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    const {
                      room_id,
                      customer_id,
                      order_id,
                      duration,
                    } = this.state;

                    if (!duration || isNaN(duration)) {
                      alert('Invalid Duration!');
                      return;
                    }

                    const data = {
                      room_id,
                      customer_id,
                      duration,
                    };

                    this.state.isCheckout
                      ? this.handleAddCheckout(order_id, false)
                      : this.handleAddCheckin(data);
                  }}
                  style={style.modalSave}>
                  <Text
                    style={{
                      fontFamily: Fonts.MontSerratBold,
                      color: 'white',
                      fontSize: 15,
                    }}>
                    Submit
                  </Text>
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
    customers: state.customers,
    checkin: state.checkin,
  };
};

const mapDispatcToProps = {
  fetchCheckin,
  fetchRoom,
  fetchCustomer,
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
    backgroundColor: '#1B885D',
    borderWidth: 0.2,
    borderRadius: 10,
    padding: 10,
    height: 90,
    elevation: 8,
    alignItems: 'center',
  },
  itemName: {
    fontSize: 15,
    color: '#fafafa',
    fontFamily: Fonts.MontSerratBold,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 3,
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  Modal: {
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    borderRadius: 10,
  },
  modalText: {
    marginTop: 15,
    marginBottom: 20,
    fontSize: 20,
    alignContent: 'center',
    fontFamily: Fonts.MontSerratBold,
  },
  modalCancel: {
    fontSize: 18,
    color: 'white',
  },
  inputRoom: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'black',
    backgroundColor: '#dcdcdc',
  },
  RoomName: {
    fontSize: 18,
    marginLeft: 5,
    marginBottom: 5,
    fontFamily: Fonts.MontSerratBold,
  },
  modalSave: {
    backgroundColor: '#1B885D',
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  modalCancel: {
    backgroundColor: '#DC143C',
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  isBookedColor: {
    backgroundColor: 'grey',
  },
  isNotBookedColor: {
    backgroundColor: '#1B885D',
  },
  timerCount: {
    flex: 1,
    alignItems: 'center',
  },
  inputText: {
    fontSize: 15,
    fontFamily: Fonts.MontSerrat,
  },
});
