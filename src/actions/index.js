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
  console.log(data);
  let comic = {};
  comic.name = data.name;
  comic.tags = data.tags;
  if(data.comment) {
    comic.comment = data.comment;
  }
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
          if(data.favorite) {
            comic.favorite = data.favorite;
            dataToSave[`favorites/${key}`] = comic.url;
          }
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
    firebaseApi.GetValueByKeyOnce("/", "comics")
    .then(snapshot => {
      let comics = [];
      _.map(snapshot.val(), (comic, key) => {
        let c = comic;
        c.key = key;
        comics.push(c);
      })
      comics.reverse()
      dispatch({
        type: types.GET_ALL_COMICS,
        payload: comics
      });
    });
  }
}

export function getFavoritesMeta() {
  return dispatch => {
    firebaseApi.GetValueByKeyOnce("/", "favorites")
    .then(snapshot => {
      dispatch({
        type: types.GET_FAVORITE_COMICS,
        payload: snapshot.val()
      });
    });
  }
}

export function getAdminList() {
  return dispatch => {
    firebaseApi.getList("comics/")
    .on('value', snapshot => {
      dispatch({
        type: types.GET_ADMIN_LIST,
        payload: snapshot.val()
      })
    })
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
