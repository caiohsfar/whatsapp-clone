import React, { Component } from 'react';
import { View, TextInput, FlatList, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase'; 
import b64 from 'base-64';
import _ from 'lodash';
import { sendMessage, fetchUserChat } from '../store/actions/AppAction';


class Chat extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('item').nome
    });
    constructor(props) {
        super(props);

        const { navigation } = props;
        this.state = {  
            message: '',
            email: navigation.getParam('item').email,
            name: navigation.getParam('item').nome 
        };
    }
    componentWillMount() {
        this.props.fetchUserChat(this.state.email);
    }
    componentWillUnmount() {
        const { currentUser } = firebase.auth();

        const userEmailB64 = b64.encode(currentUser.email);
        const contactEmailB64 = b64.encode(this.state.email);
        //Desabibilita listener toda vez que sair do chat
        firebase.database()
            .ref(`/mensagens/${userEmailB64}/${contactEmailB64}`)
            .off('value');
    }
    
    //Funcão pura
    _sendMessage(_message, name, email) {
        if (_message === '') {
            return false;
        }
        this.setState({ message: '' });
        this.props.sendMessage(_message, name, email);
    }
    _keyExtractor = (item, index) => item.uid;

    renderItem = ({ item }) => {
        if (item.tipo === 'e') {
            return (
                <View style={{ alignItems: 'flex-end', marginTop: 5, marginBottom: 5, marginLeft: 40 }}>
                    <Text style={{ fontSize: 18, color: '#000', padding: 10, backgroundColor: '#dbf5b4', elevation: 1 }}>{item.mensagem}</Text>
                </View>
            );
        } 
        return (
            <View style={{ alignItems: 'flex-start', marginTop: 5, marginBottom: 5, marginRight: 40 }}>
                <Text style={{ fontSize: 18, color: '#000', padding: 10, backgroundColor: '#f7f7f7', elevation: 1 }}>{item.mensagem}</Text>
            </View>
        );
    };
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#eee4dc', padding: 10 }}>
                <View style={{ flex: 1, paddingBottom: 20 }}>
                    <FlatList
                        inverted
                        keyExtractor={this._keyExtractor}
                        data={this.props.chat}
                        renderItem={this.renderItem}
                    />
                </View>
                <View style={{ flexDirection: 'row', height: 45 }}>
                    <TextInput
                        style={{ flex: 4, backgroundColor: '#fff', fontSize: 18, borderRadius: 50, paddingLeft: 20 }}
                        placeholder='Digite uma mensagem'
                        onChangeText={text => this.setState({ message: text })}
                        value={this.state.message}
                    />
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon
                            name='send'
                            size={22}
                            onPress={() => this._sendMessage(
                                    this.state.message, 
                                    this.state.name, 
                                    this.state.email
                                )
                            }
                            color='#0080ff'
                            reverse
                            raised
                        />
                    </View>               
                </View>
            </View>
        );
    }
}
const mapStateToProps = state => {
    const chat = _.map(state.ChatListReducer, (val, uid) => ({ ...val, uid }));
    return {
        chat
    };
};


export default connect(mapStateToProps, { sendMessage, fetchUserChat })(Chat);
