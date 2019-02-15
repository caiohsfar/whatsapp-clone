/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import {
    changeEmail, 
    changePassword, 
    changeName, 
    registerUser 
} from '../actions/AutenticationAction';

class FormCadastro extends Component {
    static navigationOptions = {
        title: 'Cadastro'
    };

    _registerUser() {
        const { name, email, password } = this.props;
        
        this.props.registerUser({ name, email, password });
    }
    render() {
        return (
            <View style={{ flex: 1, padding: 10, backgroundColor: '#FFF' }}>
                <View style={{ flex: 2, justifyContent: 'center' }}>
                    <Input 
                        onChangeText={text => this.props.changeName(text)} 
                        value={this.props.name}
                        inputContainerStyle={styles.inputContainer}
                        placeholder="Nome"
                        leftIcon={ 
                            <Icon
                                name='account-circle'
                                type='material'
                                size={24}
                                color='#0080ff'
                            />
                        }  
                    />
                    <Input
                        onChangeText={text => this.props.changeEmail(text)} 
                        value={this.props.email}
                        inputContainerStyle={styles.inputContainer}
                        placeholder="E-mail" 
                        leftIcon={ 
                            <Icon
                                name='email'
                                size={24}
                                color='#0080ff'
                            />
                        } 
                    />
                    <Input 
                        onChangeText={text => this.props.changePassword(text)} 
                        value={this.props.password}
                        secureTextEntry
                        inputContainerStyle={styles.inputContainer}
                        placeholder="Senha" 
                        leftIcon={ 
                            <Icon
                                name='lock'
                                size={24}
                                color='#0080ff'
                            />
                        } 
                    />
                </View>
                <View style={{ flex: 2 }}>
                    <Button 
                        buttonStyle={{ borderColor: '#0080ff' }}
                        titleStyle={{ color: '#0080ff' }}
                        type='outline' 
                        title="Cadastrar" 
                        color="#115E54" 
                        onPress={() => this._registerUser()} 
                    />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    inputContainer: {
        borderBottomColor: '#0080ff',
        borderBottomWidth: 0.4
    },
});

const mapStateToProps = state => (
    {
        name: state.AutenticationReducer.name,
        email: state.AutenticationReducer.email,
        password: state.AutenticationReducer.password
    }
);

export default connect(
    mapStateToProps, 
    { 
        changeEmail, 
        changePassword, 
        changeName, 
        registerUser 
})(FormCadastro);
