import React, { Component } from 'react';
import Header from './header';
import ComicPage from './comicPage';
import { getAllComics } from '../actions';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentWillMount() {
    this.props.getAllComics();
  }
  render() {
    return (
      <div>
        <div className="container maincontainer">
          <Header />
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(null, { getAllComics })(App);
