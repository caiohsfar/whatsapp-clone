const INITIAL_STATE = {
    name: '',
    email: '',
    password: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'change_email':
            return { ...state, email: action.payload };
        case 'change_password':
            return { ...state, password: action.payload };
        case 'change_name':
            return { ...state, name: action.payload };
        default:
            return state;
    }   
};
