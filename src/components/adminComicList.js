import React, { Component } from 'react';
import checkAuth from './requireAuth';
import { connect } from 'react-redux';
import {Link, IndexLink} from 'react-router';

class AdminComicList extends Component {
  constructor(props, context) {
    super(props, context);
  }

  renderComicList() {
    return(
      this.props.comics.map((comic) => {
        return(
          <Link key={comic.key} to={`admin/edit/${comic.key}`} className="list-group-item list-group-item-action clearfix">
            <img src={comic.thumb} className="pull-left" />
            <h4 className="title">
							{ comic.name }
						</h4>
						<p className="summary">{ comic.tags }</p>
          </Link>
        )
      })
    )
  }
  render() {
    return(
      <div className="list-group adminlist">
        { this.renderComicList() }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  comics : state.comics.list
});

export default checkAuth(connect(mapStateToProps)(AdminComicList));
