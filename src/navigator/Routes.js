import { 
    createStackNavigator 
} from 'react-navigation';
import FormLogin from '../components/FormLogin';
import FormCadastro from '../components/FormCadastro';
import Wellcome from '../components/Wellcome';
import Home from '../components/Home';
import Splash from '../components/Splash';

console.log(FormCadastro);

export default createStackNavigator(
    {   
        Splash,
        FormLogin,
        FormCadastro,
        Wellcome,
        Home
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

