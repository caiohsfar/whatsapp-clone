import b64 from 'base-64';
import firebase from 'react-native-firebase';
import NavigationService from '../navigator/NavigationService';

export const changeEmail = (text) => ({ 
    type: 'change_email', 
    payload: text 
});

export const changePassword = (text) => ({ 
    type: 'change_password', 
    payload: text 
});

export const changeName = (text) => ({
    type: 'change_name',
    payload: text
});

export const isLoading = () => ({
    type: 'is_loading',
});

// eslint-disable-next-line no-unused-vars
export const registerUser = ({ name, email, password }) => dispatch => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                const emailB64 = b64.encode(email); 

                firebase.database().ref(`/contatos/${emailB64}`)
                    .push({ name })
                    .then(value => onRegistrationSuccess(dispatch));  
            })
            .catch(error => onRegistrationFailure(dispatch, error));
    };

const onRegistrationSuccess = (dispatch) => {
    dispatch({ type: 'registration_successfull' });
    NavigationService.navigate('Wellcome');
};

const onRegistrationFailure = (dispatch, error) => (
   dispatch({ 
       type: 'registration_failed', 
       payload: error.message 
    })
);

export const autenticateUser = ({ email, password }) => dispatch => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => onSignInSuccess(dispatch))
        .catch(error => onSignInFailure(dispatch, error));
};

const onSignInSuccess = (dispatch) => {
    dispatch({ type: 'login_successfull' });
    NavigationService.replace('Home');
};

const onSignInFailure = (dispatch, error) => (
    dispatch({
        type: 'login_failed',
        payload: error.message
    })
);
