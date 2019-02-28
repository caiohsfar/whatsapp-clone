import { USER_CHAT_LIST } from '../actions/types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_CHAT_LIST:
            return action.payload;
        default:
            return state;
    }
};
