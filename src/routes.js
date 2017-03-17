import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {requireAuth, requireAdmin} from './actions/';

// components
import App from './components/app';
import ComicPage from './components/comicPage';
import Login from './components/login';
import Admin from './components/admin';
import Home from './components/home';
import NewComic from './components/newComic';
import AdminComicList from './components/AdminComicList'

export default function routes(store) {

  const checkAdmin = (nextState, replace, callback) => {
    store.dispatch(requireAdmin(nextState, replace, callback));
  };

  return(
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="comic/:id" component={ComicPage}/>
      <Route path="login" component={Login}/>
      <Route path="admin" component={Admin} onEnter={checkAdmin}>
        <IndexRoute component={AdminComicList}/>
        <Route path="new" component={NewComic} />
      </Route>
    </Route>
  )
}
