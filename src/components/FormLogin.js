import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { 
    changeEmail, 
    changePassword, 
    autenticateUser, 
    isLoading 
} from '../actions/AutenticationAction';

class FormLogin extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = { emailEmpty: false, passwordEmpty: false };
    }
    _autenticateUser() {
        const { email, password } = this.props;
        if (!this.validateFields(email, password)) {
            return;
        }
        this.props.isLoading();
        this.props.autenticateUser({ email, password });
    }
    validateFields(email, password) {
        let validation = true;

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
        console.log(this.props);
        return (
            <View style={{ flex: 1, padding: 15 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 25 }}>WhatsApp Clone</Text>
                </View>
                <View style={{ flex: 2 }}>
                    <Input 
                        onChangeText={text => this.props.changeEmail(text)}
                        value={this.props.email}
                        inputContainerStyle={styles.inputContainer}  
                        placeholder='E-mail'
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
                        placeholder='Senha' 
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
                    <TouchableOpacity 
                        style={{ marginVertical: 10, marginHorizontal: 20 }} 
                        onPress={() => this.props.navigation.navigate('FormCadastro')}
                    >
                    <Text style={{ fontSize: 15 }}>Ainda não tem cadastro? Cadastre-se</Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'red', fontSize: 18 }}>
                            {this.props.errorMessageLogin}
                    </Text>
                </View>
                <View style={{ flex: 2, justifyContent: 'flex-start' }}>
                    <Button 
                        buttonStyle={styles.buttonStyle}
                        titleStyle={styles.title} 
                        loading={this.props.loadState} 
                        type='outline' 
                        title='Acessar' 
                        onPress={() => this._autenticateUser()} 
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
    title: {
        color: '#0080ff'
    },
    buttonStyle: {
        borderColor: '#0080ff'
    }
});

const mapStateToProps = state => (
    {
        email: state.AutenticationReducer.email,
        password: state.AutenticationReducer.password,
        loadState: state.AutenticationReducer.loadState,
        errorMessageLogin: state.AutenticationReducer.errorMessageLogin
    }

);
export default connect(mapStateToProps, 
    { 
        changeEmail, 
        changePassword, 
        autenticateUser,
        isLoading 
    }
)(FormLogin);

