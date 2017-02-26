import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLatestComic } from '../actions';
import Thumb from './thumb';

class Home extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    // this.props.setCurrentComic();
    this.props.getLatestComic();
  }

  render() {
    return(
      <div>
        <Thumb comic={ this.props.latestComic } heading="latest" />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  latestComic : state.comics.latest
});

export default connect(mapStateToProps, { getLatestComic })(Home);
