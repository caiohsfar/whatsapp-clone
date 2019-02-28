/* eslint-disable global-require */
import React, { Component } from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import { Button } from 'react-native-elements';

export default class Wellcome extends Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <ImageBackground style={{ flex: 1, width: null }} source={require('../images/bg.png')}>
                <View style={{ flex: 1, padding: 15 }}>
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, color: '#ffffff' }}>Seja Bem-Vindo</Text>
                        <Image source={require('../images/logo.png')} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button 
                            buttonStyle={{ borderColor: '#0080ff' }}
                            type='solid' 
                            title="Fazer Login" 
                            onPress={() => this.props.navigation.navigate('FormLogin')} 
                        />
                    </View>
                </View>
            </ImageBackground>
        );
    }
}
