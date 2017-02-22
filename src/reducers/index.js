import { combineReducers } from 'redux';
import auth from './authReducer';
import user from './userReducer';
import { reducer as form } from 'redux-form'

const rootReducer = combineReducers({
  user,
  auth,
  form
});

export default rootReducer;
