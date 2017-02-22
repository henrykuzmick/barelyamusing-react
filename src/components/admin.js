import React, { Component } from 'react';
import checkAuth from './requireAuth';
import NewComicForm from './newComicForm'

class Admin extends Component {
  handleSubmit = (values) => {
    console.log(values);
  }
  render() {
    return(
      <NewComicForm onSubmit={this.handleSubmit} />
    )
  }
}

export default checkAuth(Admin)
