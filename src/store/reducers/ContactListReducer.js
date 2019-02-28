import { LIST_CONTACTS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LIST_CONTACTS:
            return action.payload;
        default:
            return state;
    }
};
