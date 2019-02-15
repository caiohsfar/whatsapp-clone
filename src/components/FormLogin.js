import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { changeEmail, changePassword } from '../actions/AutenticationAction';

class FormLogin extends Component {
    static navigationOptions = {
        header: null,
    };
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
                    <TouchableOpacity 
                        style={{ marginVertical: 10, marginHorizontal: 20 }} 
                        onPress={() => this.props.navigation.navigate('FormCadastro')}
                    >
                        <Text style={{ fontSize: 15 }}>Ainda não tem cadastro? Cadastre-se</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 2, justifyContent: 'flex-start' }}>
                    <Button 
                        buttonStyle={styles.buttonStyle}
                        titleStyle={styles.title} 
                        loading={false} 
                        type='outline' 
                        title='Acessar' 
                        onPress={() => false} 
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
        password: state.AutenticationReducer.password
    }

);
export default connect(mapStateToProps, { changeEmail, changePassword })(FormLogin);

