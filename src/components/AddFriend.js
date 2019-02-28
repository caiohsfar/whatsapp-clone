import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Input, Icon, Text, Button } from 'react-native-elements';
import { addFriend, isLoading } from '../store/actions/AppAction';

class AddFriend extends Component {
    static navigationOptions = {
        headerTitle: 'Adicionar Amigo'
    };
    constructor(props) {
        super(props);
        this.state = { email: '', emailEmpty: false };
    }
    _addFriend() {
        const { email } = this.state;
        console.log(email);
        if (!this.validateFields({ email })) {
            return;
        }
        this.props.isLoading();
        this.props.addFriend({ email });
    }
    validateFields({ email }) {
        if (email.trim() === '') {
            this.setState({ emailEmpty: true });
            return false;
        } 
        this.setState({ emailEmpty: false });
        return true;
    }
    renderAddFriend() {
        if (!this.props.friendAdded) {
            return (
                <View 
                style={{ flex: 1, backgroundColor: '#FFF', paddingTop: 40, paddingHorizontal: 10 }}
                >
                    <Input 
                        onChangeText={text => this.setState({ email: text })} 
                        value={this.props.name}
                        placeholder="Email"
                        shake
                        leftIcon={ 
                            <Icon
                                name='email'
                                type='material'
                                size={24}
                                color='#0080ff'
                            />
                        }  
                    />
                    <Text style={{ color: 'red' }}>
                        {this.state.emailEmpty ? 'Preencha o campo vazio.' : ''}
                    </Text>
                    <Button 
                        loading={this.props.loadState}
                        buttonStyle={{ borderColor: '#0080ff', marginTop: 30 }}
                        titleStyle={{ color: '#0080ff' }}
                        type='outline' 
                        title="Adicionar" 
                        color="#115E54" 
                        onPress={() => this._addFriend()}
                    />
                    <Text style={{ color: 'red', marginTop: 20 }}>
                        {this.props.errorMessageAddFriend}
                    </Text>
                </View>
            );
        } else {
            return (
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ fontSize: 20 }}>
                        Amigo adicionado com sucesso!
                    </Text>
                </View>
            );
        }
    }
    render() {
        return (
           <View style={{ flex: 1 }}>
                {this.renderAddFriend()}
           </View>
        );
    }
}
const mapStateToProps = state => ({
   errorMessageAddFriend: state.AppReducer.errorMessageAddFriend,
   friendAdded: state.AppReducer.friendAdded,
   loadState: state.AppReducer.loadState
});

export default connect(mapStateToProps, { addFriend, isLoading })(AddFriend);

