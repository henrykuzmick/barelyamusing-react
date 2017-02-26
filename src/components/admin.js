import React, { Component } from 'react';
import checkAuth from './requireAuth';
import NewComicForm from './newComicForm';
import { connect } from 'react-redux';
import { submitComic } from '../actions'
import firebaseApi from '../api/firebase';

class Admin extends Component {
  constructor(props, context) {
    super(props, context);
  }
  handleSubmit = (values) => {
    const key = firebaseApi.databaseGenerateKey("comics/")
    this.props.submitComic(key, values);
  }
  render() {
    return(
      <NewComicForm onSubmit={this.handleSubmit} />
    )
  }
}


export default connect(null, {submitComic})(Admin);
