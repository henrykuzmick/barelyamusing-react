import React, { Component } from 'react';
import Comic from './comic';
import { connect } from 'react-redux';
import { getLatestComic } from '../actions';

class ComicPage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.getLatestComic();
  }

  render() {
    return(
      <Comic comic={this.props.latestComic}/>
    )
  }
}

const mapStateToProps = (state) => ({
  latestComic : state.comics.latest
});

export default connect(mapStateToProps, {getLatestComic})(ComicPage);
