import React from 'react';
import {Provider} from 'react-redux';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { createStackNavigator } from 'react-navigation-stack';

import Login from './src/screens/Login';
import Checkin from './src/screens/Checkin';
import Room from './src/screens/Room';
import Customer from './src/screens/Customer';
import Settings from './src/screens/Settings';

import store from './src/_store';

const TabNavigator = createBottomTabNavigator({
  Checkin: {
    screen: Checkin,
    navigationOptions: {
      tabBarLabel: 'CHECKIN',
      tabBarIcon: ({tintColor}) => (
        <Icon name="check-circle" color={tintColor} size={24} />
      ),
      tabBarOptions: {activeTintColor: '#1B885D'},
    },
  },
  Room: {
    screen: Room,
    navigationOptions: {
      tabBarLabel: 'ROOM',
      tabBarIcon: ({tintColor}) => (
        <Icon name="bed" color={tintColor} size={24} />
      ),
      tabBarOptions: {activeTintColor: '#1B885D'},
    },
  },
  Customer: {
    screen: Customer,
    navigationOptions: {
      tabBarLabel: 'CUSTOMER',
      tabBarIcon: ({tintColor}) => (
        <Icon name="id-card" color={tintColor} size={24} />
      ),
      tabBarOptions: {activeTintColor: '#1B885D'},
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'SETTINGS',
      tabBarIcon: ({tintColor}) => (
        <Icon name="cogs" color={tintColor} size={24} />
      ),
      tabBarOptions: {activeTintColor: '#1B885D'},
    },
  },
});

const MyScreen = createSwitchNavigator({
  RouteOne: Login,
  RouteTwo: TabNavigator,
});

const RootNavigation = createAppContainer(MyScreen);

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};

export default App;
