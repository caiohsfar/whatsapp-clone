import React, { PureComponent } from 'react';
import { Image, View } from 'react-native';
import firebase from 'react-native-firebase';
import NavigationService from '../navigator/NavigationService';


export default class Splash extends PureComponent {
  static navigationOptions = {
    header: null
  }
  isLoggedIn() {
    if (firebase.auth().currentUser) {
      return true;
    }
    return false;
  }
  changeScreen() {
    setTimeout(() => {
      if (this.isLoggedIn()) {
        NavigationService.replace('Home');
      } else {
        NavigationService.replace('FormLogin');
      }
    }, 2000);
  }
  render() {
    this.changeScreen();
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={require('../images/logo.png')} /> 
      </View>
    );
  }
}
