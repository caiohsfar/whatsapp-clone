const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
    loadState: false,
    errorMessage: ''
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
            return { ...state, loadState: false };
        case 'registration_failed':
            return { ...state, loadState: false, errorMessage: action.payload };
        default:
            return state;
    }   
};
