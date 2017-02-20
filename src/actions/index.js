import toastr from 'toastr';
import firebaseApi from '../api/firebase';
import * as types from './actionTypes';
import {push} from 'react-router-redux';

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
    // firebaseApi.GetChildAddedByKeyOnce('/users', userUID)
    //   .then(
    //     user => {
    //       dispatch(userLoadedSuccess(user.val()));
    //       dispatch(push('/'));
    //     })
    //   .catch(
    //     error => {
    //       throw(error);
    //     });
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
