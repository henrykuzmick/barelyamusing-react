import toastr from 'toastr';
import firebaseApi from '../api/firebase';
import * as types from './actionTypes';
import { push } from 'react-router-redux';

export function signInWithGoogle() {
  return (dispatch) => {
    return firebaseApi.signInWithGoogle()
      .then(
        data => {
          dispatch(authLoggedIn(data.user.uid));
        })
      .catch(error => {
        throw(error);
      });
  };
}


export function authInitializedDone() {
  return {
    type: types.AUTH_INITIALIZATION_DONE
  };
}

export function authLoggedOutSuccess() {

  return {type: types.AUTH_LOGGED_OUT_SUCCESS};
}

export function authInitialized(user) {
  return (dispatch) => {
    dispatch(authInitializedDone());
    if (user) {
      dispatch(authLoggedIn(user.uid));
    } else {
      dispatch(authLoggedOutSuccess());
    }
  };
}


export function authLoggedIn(userUID) {
  return (dispatch) => {
    dispatch(authLoggedInSuccess(userUID));
  };
}

export function authLoggedInSuccess(userUID) {
  return {
    type: types.AUTH_LOGGED_IN_SUCCESS, userUID
  };
}

export function signOut() {
  return (dispatch, getState) => {
    return firebaseApi.authSignOut()
      .then(
        () => {
          dispatch(authLoggedOutSuccess());
        })
      .catch(error => {
        throw(error);
      });
  };
}

export function requireAuth(nextState, replace) {
  return (dispatch, getState) => {
    if (!getState().auth.isLogged) {
      redirect(replace, '/login', nextState.location.pathname, 'You need to be logged to access this page');
    }
  };
}

function redirect(replace, pathname, nextPathName, error = false) {
  replace({
    pathname: pathname,
    state: {nextPathname: nextPathName}
  });
  if (error) {
    toastr.error(error);
  }
}

export function submitComic(key, comic) {
  let dataToSave = {};
  dataToSave[`comics/${key}`] = comic;
  dataToSave[`comic_numbers/${key}`] = true;
  return (dispatch, getState) => {
    firebaseApi.databaseUpdate(dataToSave)
    .then(
      () => {
        dispatch(addComicSuccess());
      }
    )
  }
}

export function addComicSuccess() {
  return {
    type: types.ADD_COMIC_SUCCESS
  };
}

export function getAllComics() {
  return dispatch => {
    firebaseApi.GetValueByKeyOnce("/", "comic_numbers")
    .then(snapshot => {
      dispatch(
        {
          type: types.GET_ALL_COMICS,
          payload: snapshot.val()
        }
      );
    });
  }
}

export function getLatestComic() {
  return (dispatch, getState) => {
    firebaseApi.getLatestChildByPath("comics/")
    .then(
      (data) => {
        let comic = data.val();
        comic.key = data.key;
        dispatch(getLatestComicSuccess(comic));
      }
    )
  }
}

export function getLatestComicSuccess(comic) {
  return {
    type: types.GET_LATEST_COMICS_SUCCESS,
    payload: comic
  };
}

export function getCurrentComic(curr, prev, next) {
  return dispatch => {
    if(curr) {
      firebaseApi.GetValueByKeyOnce("comics/", curr)
      .then( data => {
        let curr_comic = data.val();
        curr_comic.key = data.key;
        dispatch({
          type: types.GET_CURRENT_COMIC,
          payload: curr_comic
        });
      });
    } else {
      dispatch({
        type: types.GET_CURRENT_COMIC,
        payload: null
      });
    }
    if(prev) {
      firebaseApi.GetValueByKeyOnce("comics/", prev)
      .then( data => {
        let prev_comic = data.val();
        prev_comic.key = data.key;
        dispatch({
          type: types.GET_PREV_COMIC,
          payload: prev_comic
        });
      });
    } else {
      dispatch({
        type: types.GET_PREV_COMIC,
        payload: null
      });
    }
    if(next) {
      firebaseApi.GetValueByKeyOnce("comics/", next)
      .then( data => {
        let next_comic = data.val();
        next_comic.key = data.key;
        dispatch({
          type: types.GET_NEXT_COMIC,
          payload: next_comic
        });
      });
    }
    else {
      dispatch({
        type: types.GET_NEXT_COMIC,
        payload: null
      });
    }
  }
}
