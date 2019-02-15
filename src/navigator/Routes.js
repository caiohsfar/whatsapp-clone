import { 
    createStackNavigator 
} from 'react-navigation';
import FormLogin from '../components/FormLogin';
import FormCadastro from '../components/FormCadastro';

export default createStackNavigator(
    {
        FormLogin,
        FormCadastro
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

