//The input fields are being controlled by redux for a didatic reason.
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
        case 'change_email':
            return { ...state, email: action.payload };
        case 'change_password':
            return { ...state, password: action.payload };
        case 'change_name':
            return { ...state, name: action.payload };
        case 'is_loading':
            return { ...state, loadState: true };
        case 'registration_successfull':
            return { ...state, loadState: false, password: '', name: '', errorMessageReg: '' };
        case 'registration_failed':
            return { ...state, loadState: false, errorMessageReg: action.payload };
        case 'login_successfull':
            return { ...state, loadState: false, errorMessageLogin: '', password: '' }; 
        case 'login_failed':
            return { ...state, loadState: false, errorMessageLogin: action.payload };
        default:
            return state;
    }   
};
