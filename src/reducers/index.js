import { combineReducers } from 'redux';
import auth from './authReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  user,
  auth
});

export default rootReducer;
