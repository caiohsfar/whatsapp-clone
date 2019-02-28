import b64 from 'base-64';
import firebase from 'react-native-firebase';
import NavigationService from '../../navigator/NavigationService';
import { 
    CHANGE_EMAIL, 
    CHANGE_PASSWORD, 
    CHANGE_NAME, 
    IS_LOADING, 
    REGISTRATION_SUCCSESSFULL, 
    REGISTRATION_FAILED, 
    LOGIN_SUCCESSFULL, 
    LOGIN_FAILED 
} from './types';

export const changeEmail = (text) => ({ 
    type: CHANGE_EMAIL, 
    payload: text 
});

export const changePassword = (text) => ({ 
    type: CHANGE_PASSWORD, 
    payload: text 
});

export const changeName = (text) => ({
    type: CHANGE_NAME,
    payload: text
});

export const isLoading = () => ({
    type: IS_LOADING,
});

// eslint-disable-next-line no-unused-vars
export const registerUser = ({ name, email, password }) => dispatch => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                const emailB64 = b64.encode(email);
                //Salvando o nome do usuario na sessão do firebase. 
                firebase.auth().currentUser.updateProfile({ displayName: name });

                firebase.database().ref(`/contatos/${emailB64}`)
                    .push({ name })
                    .then(value => onRegistrationSuccess(dispatch));  
            })
            .catch(error => onRegistrationFailure(dispatch, error));
    };

const onRegistrationSuccess = (dispatch) => {
    dispatch({ type: REGISTRATION_SUCCSESSFULL });
    NavigationService.navigate('Wellcome');
};

const onRegistrationFailure = (dispatch, error) => (
   dispatch({ 
       type: REGISTRATION_FAILED, 
       payload: error.message 
    })
);

export const autenticateUser = ({ email, password }) => dispatch => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => onSignInSuccess(dispatch))
        .catch(error => onSignInFailure(dispatch, error));
};

const onSignInSuccess = (dispatch) => {
    dispatch({ type: LOGIN_SUCCESSFULL });
    NavigationService.replace('Home');
};

const onSignInFailure = (dispatch, error) => (
    dispatch({
        type: LOGIN_FAILED,
        payload: error.message
    })
);
