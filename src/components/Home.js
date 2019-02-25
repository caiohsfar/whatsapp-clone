import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Platform } from 'react-native';
import firebase from 'react-native-firebase';
import NavigationService from '../navigator/NavigationService';


export default class Home extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = { isLoggedIn: null, email: firebase.auth().currentUser.email };
    }
    logOut() {
        firebase.auth().signOut()
            .then(() => NavigationService.replace('FormLogin'));
    }
    render() {
        return (
        <View style={styles.container}>
            <Text> {firebase.auth().currentUser.email}</Text>
            <Button onPress={() => this.logOut()} title="LogOut" />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        flexDirection: 'row', 
        flex: 1, 
        backgroundColor: '#FFF',
        paddingTop: Platform.OS === 'android' ? 60 : 45,
        paddingHorizontal: 20 
    }
});
