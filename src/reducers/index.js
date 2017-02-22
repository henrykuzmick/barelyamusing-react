import { combineReducers } from 'redux';
import auth from './authReducer';
import user from './userReducer';
import comics from './comicsReducer';
import { reducer as form } from 'redux-form'

const rootReducer = combineReducers({
  user,
  auth,
  form,
  comics
});

export default rootReducer;
