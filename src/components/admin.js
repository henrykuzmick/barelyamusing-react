import React, { Component } from 'react';
import checkAuth from './requireAuth';
import NewComicForm from './newComicForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submitComic } from '../actions'

class Admin extends Component {
  constructor(props, context) {
    super(props, context);
  }
  handleSubmit = (values) => {
    this.props.actions.submitComic(values);
  }
  render() {
    return(
      <NewComicForm onSubmit={this.handleSubmit} />
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({submitComic}, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Admin);
