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

export const registerUser = (name, email, password) => ({
    type: 'register_user',
    payload: { name, email, password }
});
