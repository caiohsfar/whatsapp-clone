import React, { Component } from 'react';
import _ from 'lodash';
import { FlatList, TouchableOpacity, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchContacts } from '../store/actions/AppAction';
import NavigationService from '../navigator/NavigationService';

 
class Contacts extends Component {

    componentWillMount() {
        //fecth lista
        this.props.fetchContacts();
    }
    _keyExtractor = (item, index) => item.uid;

    _renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => NavigationService.navigate('Chat', { item })}>
            <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: '#0080ff' }}>
                <Text style={{ fontSize: 20 }}> {item.nome}</Text>
                <Text style={{ fontSize: 14 }}> {item.email}</Text>
            </View>
        </TouchableOpacity>
    );
    render() {
        return (
            <FlatList
                keyExtractor={this._keyExtractor}
                data={this.props.contacts}
                renderItem={this._renderItem}
            />
        );
    }
}

const mapStateToProps = state => {
    const contacts = _.map(state.ContactListReducer, (val, uid) => ({ ...val, uid }));
    return {
        contacts
    };
};

export default connect(mapStateToProps, { fetchContacts })(Contacts);
