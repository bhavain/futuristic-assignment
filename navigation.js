import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, CardStyleInterpolators } from 'react-navigation-stack';
import LinearGradient from 'react-native-linear-gradient';

import Home from './src/Home'
import Checkout from './src/Checkout'
import MapViewScreen from './src/MapViewScreen'




const AppStackNavigator = createStackNavigator({
    Home: {
      screen: Home,
      navigationOptions: { title: "Home" } 
    },
    Checkout: {
        screen: Checkout,
        navigationOptions: { title: "Checkout" } 
      },
    MapViewScreen: {
        screen: MapViewScreen,
        navigationOptions: { title: "Maps" } 
      },                          
  },
    {
      initialRouteName: "MapViewScreen", 
      defaultNavigationOptions: ({ navigation, screenProps }) => ({
        title: <Text></Text>,
        headerTitleStyle:{fontFamily:"SF-Pro-Display-Semibold",fontSize:20,color:"white"},
        headerStyle: [{ height: 56, elevation:0 }],
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        
        headerBackground:() => (<LinearGradient start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }} colors={['#0671eb', '#00afdd']} style={{ flex: 1 }}/>),
        headerBackImage: () => <Icon  type="AntDesign" name='arrowleft' style={{color:"white"}}/>
      }),
      headerMode: "float",
    },
   
  
  )
  const AppContainer = createAppContainer(AppStackNavigator);
  export default AppContainer;  