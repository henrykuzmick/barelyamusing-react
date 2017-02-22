import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function comicsReducer(state = initialState.auth, action) {
  switch (action.type) {
    case types.ADD_COMIC_SUCCESS:
      return state
    case types.GET_LATEST_COMICS_SUCCESS:
      return { ...state, latest: action.payload }
    default:
      return state;
  }
}
