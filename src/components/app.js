import React, { Component } from 'react';
import Header from './header';
import ComicPage from './comicPage'

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
