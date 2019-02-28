import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';

export default class LogoTitle extends Component {
  render() {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Image 
                source={require('../images/logo.png')} 
                style={{ width: 30, height: 30, marginLeft: 20 }}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFF', marginLeft: 10 }}>WhatsApp</Text>
        </View>
        
    );
  }
}
