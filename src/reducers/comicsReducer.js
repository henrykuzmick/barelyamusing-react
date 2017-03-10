import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function comicsReducer(state = initialState.auth, action) {
  switch (action.type) {
    case types.UPLOADING_COMIC:
      return { ...state, uploading: action.payload }
    case types.GET_ALL_COMICS:
      return { ...state, list: action.payload }
    case types.GET_ADMIN_LIST:
      return { ...state, adminlist: action.payload }
    default:
      return state;
  }
}
