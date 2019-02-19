/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Icon, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import {
    changeEmail, 
    changePassword, 
    changeName, 
    registerUser,
    isLoading
} from '../actions/AutenticationAction';

class FormCadastro extends Component {
    static navigationOptions = {
        title: 'Cadastro'
    };
    constructor(props) {
        super(props);
        this.state = { emailEmpty: false, passwordEmpty: false, nameEmpty: false };
    }
    _registerUser() {
        const { name, email, password } = this.props;
        if (!this.validateFields(name, email, password)) {
            return;
        }
        this.props.isLoading();
        this.props.registerUser({ name, email, password });
    }
    validateFields(name, email, password) {
        let validation = true;

        if (name.trim() === '') {
            this.setState({ nameEmpty: true });
            validation = false;
        } else {
            this.setState({ nameEmpty: false });
        }

        if (email.trim() === '') {
            this.setState({ emailEmpty: true });
            validation = false;
        } else {
            this.setState({ emailEmpty: false });
        }
        
        if (password.trim() === '') {
            this.setState({ passwordEmpty: true });
            validation = false;
        } else {
            this.setState({ passwordEmpty: false });
        }  
        return validation; 
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
                        shake
                        leftIcon={ 
                            <Icon
                                name='account-circle'
                                type='material'
                                size={24}
                                color='#0080ff'
                            />
                        }  
                    />
                    <Text style={{ color: 'red' }}>
                        {this.state.nameEmpty ? 'Preencha o campo vazio.' : ''}
                    </Text>
                    <Input
                        onChangeText={text => this.props.changeEmail(text)} 
                        value={this.props.email}
                        inputContainerStyle={styles.inputContainer}
                        placeholder="E-mail" 
                        shake
                        leftIcon={ 
                            <Icon
                                name='email'
                                size={24}
                                color='#0080ff'
                            />
                        } 
                    />
                    <Text style={{ color: 'red' }}>
                        {this.state.emailEmpty ? 'Preencha o campo vazio.' : ''}
                    </Text>
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
                    <Text style={{ color: 'red' }}>
                        {this.state.passwordEmpty ? 'Preencha o campo vazio.' : ''}
                    </Text>
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={{ color: 'red', fontSize: 18 }}>
                        {this.props.errorMessage}
                    </Text>
                    <Button 
                        loading={this.props.loadState}
                        buttonStyle={{ borderColor: '#0080ff', marginTop: 10 }}
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
        password: state.AutenticationReducer.password,
        loadState: state.AutenticationReducer.loadState,
        errorMessage: state.AutenticationReducer.errorMessage
    }
);

export default connect(
    mapStateToProps, 
    { 
        changeEmail, 
        changePassword, 
        changeName, 
        registerUser,
        isLoading
})(FormCadastro);
