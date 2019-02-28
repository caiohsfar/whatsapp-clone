import { combineReducers } from 'redux';
import AutenticationReducer from './AutenticationReducer';
import AppReducer from './AppReducer';
import ContactListReducer from './ContactListReducer';
import ChatListReducer from './ChatListReducer';

const reducers = combineReducers({
  AutenticationReducer,
  AppReducer,
  ContactListReducer,
  ChatListReducer
});

export { reducers };
