/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Navigation from './navigation';
import { Provider } from 'react-redux';
import store from './store';


export default class App extends Component
{
  render(){
  return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    )
  }
}
