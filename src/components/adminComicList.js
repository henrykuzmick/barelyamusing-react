import React, { Component } from 'react';
import checkAuth from './requireAuth';
import { connect } from 'react-redux';
import { getAdminList } from '../actions'
import _ from 'lodash';
import {Link, IndexLink} from 'react-router';

class AdminComicList extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentWillMount() {
    this.props.getAdminList();
  }
  renderComicList() {
    return(
      _.map(this.props.adminlist, (comic, key) => {
        return(
          <Link key={key} to={`admin/edit/${key}`} className="list-group-item list-group-item-action clearfix">
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
  adminlist : state.comics.adminlist
});

export default connect(mapStateToProps, {getAdminList})(AdminComicList);
