import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory} from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {authInitialized} from './actions/';
import routes from './routes'
import thunk from 'redux-thunk';

import App from './components/app';
import Login from './components/login'
import reducers from './reducers';
import FirebaseApi from './api/firebase';

import initialState from './reducers/initialState';
import configureStore from './store/configureStore';

// styles
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/toastr/build/toastr.min.css';

const store = configureStore(initialState);

FirebaseApi.initAuth()
.then(
  user => {
    store.dispatch(authInitialized(user));
    ReactDOM.render(
      <Provider store={store}>
        <Router history={browserHistory} routes={routes(store)}/>
      </Provider>
      , document.getElementById('root'));
  }
)
