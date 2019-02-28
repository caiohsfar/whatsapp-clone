import firebase from 'react-native-firebase';
import _ from 'lodash';
import b64 from 'base-64';
import { 
    ADD_FRIEND_ERROR,
    ADD_FRIEND_SUCCESS,
    IS_LOADING_ADD,
    LIST_CONTACTS,
    SEND_MESSAGE,
    USER_CHAT_LIST
} from './types';


export const isLoading = () => (
    {
        type: IS_LOADING_ADD
    }
);
export const addFriend = ({ email }) => dispatch => {
    const emailb64 = b64.encode(email);
    firebase.database().ref(`/contatos/${emailb64}`)
        .once('value')
        .then(snapshot => {
            if (snapshot.val()) {
                const userData = _.first(_.values(snapshot.val()));
                
                const { currentUser } = firebase.auth();
                const emailUserB64 = b64.encode(currentUser.email);

                firebase.database().ref(`/usuario_contatos/${emailUserB64}`)
                    .push({ email, nome: userData.name })
                    .then(() => onSuccess(dispatch))
                    .catch(error => onFailure(error.message, dispatch));
            } else {
                onFailure('O Usuário não existe.', dispatch);
            }
        });    
};

const onSuccess = (dispatch) => (
    dispatch({
        type: ADD_FRIEND_SUCCESS,
        payload: true
    })
);

const onFailure = (error, dispatch) => (
    dispatch({
        type: ADD_FRIEND_ERROR,
        payload: error
    })
);

export const enableAddFriend = () => ({
    type: ADD_FRIEND_SUCCESS,
    payload: false
});

export const fetchContacts = () => dispatch => {
    const { currentUser } = firebase.auth();
    const emailUserB64 = b64.encode(currentUser.email);
    firebase.database().ref(`/usuario_contatos/${emailUserB64}`)
        .on('value', snapshot => onSuccessFetchContacts(dispatch, snapshot));
};

const onSuccessFetchContacts = (dispatch, snapshot) => {
    dispatch({ 
        type: LIST_CONTACTS, 
        payload: snapshot.val() 
    });
};

export const sendMessage = (message, contactName, contactEmail) => dispatch => {
    //dados do contato


    //dados do usuario
    const { currentUser } = firebase.auth();
    const userEmail = currentUser.email;

    //criptografando

    const emailUserB64 = b64.encode(userEmail);
    const emailContactB64 = b64.encode(contactEmail);

    firebase.database().ref(`/mensagens/${emailUserB64}/${emailContactB64}`)
        .push({ mensagem: message, tipo: 'e' })
        .then(() => {
            firebase.database().ref(`/mensagens/${emailContactB64}/${emailUserB64}`)
            .push({ mensagem: message, tipo: 'r' })
            .then(() => onSuccessSentMessage(dispatch));
        })
        //armazenar os cabeçalhos
        .then(() => {
            firebase.database().ref(`/usuario_conversas/${emailUserB64}/${emailContactB64}`)
                .set({ nome: contactName, email: contactEmail });
        })
        .then(() => {
            firebase.database().ref(`/usuario_conversas/${emailContactB64}/${emailUserB64}`)
                .set({ nome: currentUser.displayName, email: userEmail });
        });
};

const onSuccessSentMessage = (dispatch) => {
    dispatch({ 
        type: SEND_MESSAGE 
    });
};
export const fetchUserChat = (contactEmail) => {
    const { currentUser } = firebase.auth();
    const userEmailB64 = b64.encode(currentUser.email);
    const contactEmailB64 = b64.encode(contactEmail);
    return dispatch => {
        firebase.database().ref(`/mensagens/${userEmailB64}/${contactEmailB64}`)
        .on('value', snapshot => {
            dispatch({ type: USER_CHAT_LIST, payload: snapshot.val() });
        });
    };
};  

