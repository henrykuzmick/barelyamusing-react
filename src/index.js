// modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory} from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// api
import FirebaseApi from './api/firebase';

// actions
import {authInitialized} from './actions/';

// components
import App from './components/app';
import Login from './components/login'

// store
import initialState from './reducers/initialState';
import configureStore from './store/configureStore';

// routes
import routes from './routes'





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
