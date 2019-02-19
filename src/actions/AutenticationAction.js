import firebase from 'react-native-firebase';


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
            .then(user => onSuccess(dispatch))
            .catch(error => onFailure(dispatch, error));
    };

const onSuccess = (dispatch) => (
    dispatch({ type: 'registration_successfull' })
);

const onFailure = (dispatch, error) => (
   dispatch({ type: 'registration_failed', payload: error.message })
);
