import React, { Component } from 'react';
import checkAuth from './requireAuth';
import NewComicForm from './newComicForm';
import { connect } from 'react-redux';
import { submitComic } from '../actions'
import {Link, IndexLink} from 'react-router';

class Admin extends Component {
  constructor(props, context) {
    super(props, context);
  }
  handleSubmit = (values) => {
    const key = firebaseApi.databaseGenerateKey("comics/")
    this.props.submitComic(key, values);

    console.log(values);
  }
  render() {
    return(
      <div className="container-fluid">
        <div className="row text-left">
          <div className="col-xs-12">
            <Link to="/admin/new" className="btn btn-primary">New Comic</Link>
            <br/><br/>
          </div>
          <div className="col-xs-12">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  uploading : state.comics.uploading
});

export default checkAuth(connect(mapStateToProps, {submitComic})(Admin));
