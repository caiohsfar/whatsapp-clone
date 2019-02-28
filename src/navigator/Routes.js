import { 
    createStackNavigator 
} from 'react-navigation';
import FormLogin from '../components/FormLogin';
import FormCadastro from '../components/FormCadastro';
import Wellcome from '../components/Wellcome';
import Home from '../components/Home';
import Splash from '../components/Splash';
import AddFriend from '../components/AddFriend';
import Chat from '../components/Chat';
import Contacts from '../components/Contacts';

export default createStackNavigator(
    {   
        Splash,
        FormLogin,
        FormCadastro,
        Wellcome,
        Home,
        Chat: { screen: Chat },
        Contacts: { screen: Contacts },           
        AddFriend,
        
    },
    {
        defaultNavigationOptions: {
            headerTintColor: '#fff',
            headerStyle: {
            backgroundColor: '#0080ff',
            }
        }
    },
    {
        initialRouteName: 'FormLogin'
    }
);

