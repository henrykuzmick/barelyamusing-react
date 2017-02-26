import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function comicsReducer(state = initialState.auth, action) {
  console.log(action)
  switch (action.type) {
    case types.GET_LATEST_COMICS_SUCCESS:
      return { ...state, latest: action.payload }
    case types.GET_ALL_COMICS:
      return { ...state, list: action.payload }
    case types.GET_CURRENT_COMIC:
      return { ...state, current: action.payload }
    case types.GET_NEXT_COMIC:
      return { ...state, next: action.payload }
    case types.GET_PREV_COMIC:
      return { ...state, prev: action.payload }
    default:
      return state;
  }
}
