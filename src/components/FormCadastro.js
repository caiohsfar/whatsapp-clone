import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

class FormCadastro extends Component {
    static navigationOptions = {
        title: 'Cadastro'
    };
    render() {
        return (
            <View style={{ flex: 1, padding: 10, backgroundColor: '#FFF' }}>
                <View style={{ flex: 2, justifyContent: 'center' }}>
                    <Input 
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
                        value={this.props.password}
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
});

const mapStateToProps = state => (
    {
        name: state.AutenticationReducer.name,
        email: state.AutenticationReducer.email,
        password: state.AutenticationReducer.password
    }
);

export default connect(mapStateToProps, null)(FormCadastro);
