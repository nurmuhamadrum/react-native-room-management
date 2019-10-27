import React from 'react';
import { View, Text } from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Login from './src/screens/Login'
import Checkin from './src/screens/Checkin'
import Room from './src/screens/Room'
import Customer from './src/screens/Customer'
import Settings from './src/screens/Settings'

const TabNavigator = createBottomTabNavigator({
    Checkin: {
        screen: Checkin,
        navigationOptions: {
            tabBarLabel: 'CHECKIN',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="check-circle" color=
                    {tintColor} size={24} />
            )
        }
    },
    Room: {
        screen: Room,
        navigationOptions: {
            tabBarLabel: 'ROOM',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="bed" color=
                    {tintColor} size={24} />
            )
        }
    },
    Customer: {
        screen: Customer,
        navigationOptions: {
            tabBarLabel: 'CUSTOMER',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="id-card" color=
                    {tintColor} size={24} />
            )
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            tabBarLabel: 'SETTINGS',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="cogs" color=
                    {tintColor} size={24} />
            )
        }
    }
})

const MyScreen = createSwitchNavigator({
    routeOne: Login,
    routeTwo: TabNavigator
});

export default createAppContainer(MyScreen);

// export default Customer;
