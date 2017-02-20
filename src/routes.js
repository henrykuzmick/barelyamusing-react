import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/app';
import ComicPage from './components/comicPage'
import Login from './components/login'
import Admin from './components/admin'
import {requireAuth} from './actions/';

export default function routes(store) {

  const checkAdmin = (nextState, replace, callback) => {
    store.dispatch(requireAuth(nextState, replace, callback));
  };

  return(
    <Route path="/" component={App}>
      <IndexRoute component={ComicPage}/>
      <Route path="login" component={Login}/>
      <Route path="admin" component={Admin}/>
    </Route>
  )
}
