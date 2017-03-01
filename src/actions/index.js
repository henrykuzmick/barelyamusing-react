import toastr from 'toastr';
import firebaseApi from '../api/firebase';
import * as types from './actionTypes';
import { push } from 'react-router-redux';
import { slugify } from '../common';
import _ from 'lodash';
export function signInWithGoogle() {
  return (dispatch) => {
    return firebaseApi.signInWithGoogle()
      .then(data => {
        dispatch({
          type: types.AUTH_LOGGED_IN_SUCCESS,
          userUID: data.user.uid
        })
      })
      .catch(error => {
        throw(error);
      });
  };
}

export function authInitialized(user) {
  return (dispatch) => {
    dispatch({ type: types.AUTH_INITIALIZATION_DONE });
    if (user) {
      dispatch({
        type: types.AUTH_LOGGED_IN_SUCCESS,
        userUID: user.uid
      })
    } else {
      dispatch({ type: types.AUTH_LOGGED_OUT_SUCCESS });
    }
  };
}


export function signOut() {
  return (dispatch, getState) => {
    return firebaseApi.authSignOut()
      .then(() => {
        dispatch({type: types.AUTH_LOGGED_OUT_SUCCESS});
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

export function submitComic(key, data) {
  let comic = {};
  comic.name = data.name;
  comic.tags = data.tags;
  comic.comment = data.comment;
  comic.url = slugify(data.name);
  let dataToSave = {};
  let filesUploaded = 0;
  return dispatch => {
    dispatch({
      type: types.UPLOADING_COMIC,
      payload: true
    });
    _.map(data.files, (file) => {
      let filename = `${file.name}-${key}`;
      firebaseApi.uploadFile(file, filename)
      .then((snapshot) => {
        const nameOfFile = file.name.substring(0, file.name.indexOf('.'));
        comic[nameOfFile] = snapshot.downloadURL
        filesUploaded++;
        if(filesUploaded === 4) {
          dataToSave[`comics/${key}`] = comic;
          dataToSave[`comic_numbers/${key}`] = comic.url;
          firebaseApi.databaseUpdate(dataToSave)
          .then(() => {
            dispatch({
              type: types.ADD_COMIC
            });
            dispatch({
              type: types.UPLOADING_COMIC,
              payload: false
            });
          })
        }
      })
    })
  }
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

export function getLatestComics() {
  return (dispatch, getState) => {
    firebaseApi.getLatestValueByUrl("comics/", 2)
    .then(data => {
      let comics = [];
      _.map(data.val(), (comic, key) => {
        let c = comic;
        c.key = key;
        comics.push(c);
      })
      comics.reverse()
      dispatch({
        type: types.GET_LATEST_COMIC,
        payload: comics
      });
    });
  }
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
