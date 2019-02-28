//The input fields are being controlled by redux for a didatic reason.
import { 
    CHANGE_EMAIL, 
    CHANGE_PASSWORD, 
    CHANGE_NAME, 
    IS_LOADING, 
    REGISTRATION_SUCCSESSFULL, 
    REGISTRATION_FAILED, 
    LOGIN_SUCCESSFULL, 
    LOGIN_FAILED 
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
    loadState: false,
    errorMessageReg: '',
    errorMessageLogin: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_EMAIL:
            return { ...state, email: action.payload };
        case CHANGE_PASSWORD:
            return { ...state, password: action.payload };
        case CHANGE_NAME:
            return { ...state, name: action.payload };
        case IS_LOADING:
            return { ...state, loadState: true, errorMessageReg: '', errorMessageLogin: '' };
        case REGISTRATION_SUCCSESSFULL:
            return { ...state, loadState: false, password: '', name: '', errorMessageReg: '' };
        case REGISTRATION_FAILED:
            return { ...state, loadState: false, errorMessageReg: action.payload };
        case LOGIN_SUCCESSFULL:
            return { ...state, loadState: false, errorMessageLogin: '', password: '' }; 
        case LOGIN_FAILED:
            return { ...state, loadState: false, errorMessageLogin: action.payload };
        default:
            return state;
    }   
};
