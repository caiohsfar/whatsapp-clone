import React, { Component } from 'react';
import b64 from 'base-64';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Icon } from 'react-native-elements';
import firebase from 'react-native-firebase';
import LogoTitle from './LogoTitle';
import NavigationService from '../navigator/NavigationService';
import Chats from './Chats';
import Contacts from './Contacts';
import { enableAddFriend } from '../store/actions/AppAction';
  
class Home extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: <LogoTitle />,
        headerRight: (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity 
                    style={{ marginRight: 30 }} 
                    onPress={navigation.getParam('changeScreen')} 
                >
                    <Icon 
                        name='person-add' 
                        color='#FFF'
                        size={28}
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={navigation.getParam('logOut')} 
                    style={{ marginRight: 20 }}
                >
                    <Text style={{ color: '#FFF', fontSize: 17 }}>Deslogar</Text>
                </TouchableOpacity>
            </View>
        ),
        headerStyle: {
            elevation: 0,
            backgroundColor: '#0080ff'        
        }
    });
    state = {
        index: 0,
        routes: [
          { key: 'first', title: 'Conversas' },
          { key: 'second', title: 'Contatos' },
        ],
    };
    componentDidMount() {
        this.props.navigation.setParams({ logOut: this._logOut, changeScreen: this._changeScreen });
    }
    _logOut = () => {
        firebase.auth().signOut()
            .then(() => {
                NavigationService.replace('FormLogin');
                firebase.database().ref('/mensagens/')
                    .off('value');
            });
    }
    _changeScreen = () => {
        const { navigation } = this.props;
        this.props.enableAddFriend();
        navigation.navigate('AddFriend');
    }
    render() {
        return (
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    first: Chats,
                    second: Contacts,
                })}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ 
                    width: Dimensions.get('window').width, 
                    height: Dimensions.get('window').height 
                }}
                
                renderTabBar={ 
                    props => 
                    <TabBar {...props} style={{ backgroundColor: '#0080ff' }} />
                }
            />
        );
    }
}

export default connect(null, { enableAddFriend })(Home);
