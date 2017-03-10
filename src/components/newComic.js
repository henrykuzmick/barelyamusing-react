import React, { Component } from 'react';
import checkAuth from './requireAuth';
import NewComicForm from './newComicForm';
import { connect } from 'react-redux';
import { submitComic } from '../actions'
import firebaseApi from '../api/firebase';

class NewComic extends Component {
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
      <NewComicForm uploading={this.props.uploading} onSubmit={this.handleSubmit.bind(this)} />
    )
  }
}

const mapStateToProps = (state) => ({
  uploading : state.comics.uploading
});

export default connect(mapStateToProps, {submitComic})(NewComic);
