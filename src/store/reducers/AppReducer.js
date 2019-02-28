import { ADD_FRIEND_ERROR,
    ADD_FRIEND_SUCCESS,
    IS_LOADING_ADD,
    CHANGE_MESSAGE,
    SEND_MESSAGE
} from '../actions/types';

const INITIAL_STATE = {
    errorMessageAddFriend: '',
    friendAdded: false,
    loadState: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_FRIEND_ERROR:
            return { ...state, errorMessageAddFriend: action.payload, loadState: false };
        case ADD_FRIEND_SUCCESS:
            return { ...state, friendAdded: action.payload, errorMessageAddFriend: '', loadState: false };
        case IS_LOADING_ADD:
            return { ...state, loadState: true, errorMessageAddFriend: '' };
        case SEND_MESSAGE:
            return { ...state };
        default:
            return state;
    }
};

