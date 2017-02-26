import React, { Component } from 'react';
import {connect} from 'react-redux';
import {signInWithGoogle, signOut} from '../actions/';
import toastr from 'toastr';

class Login extends Component {
  constructor(props, context) {
    super(props, context);
  }

  loginUser() {
    this.props.signInWithGoogle()
    .then(user => toastr.success('You are logged in'))
    .catch(error => {
      toastr.error(error.message);
    });
  }

  logoutUser() {
    this.props.signOut()
    .then(user => toastr.success('You have logged out'))
    .catch(error => {
      toastr.error(error.message);
    });
  }

  render() {
    return(
      <div>
        <h3>Login:</h3>
        <button className="btn btn-primary" onClick={this.loginUser.bind(this)}>Login with Google</button>
        <button className="btn btn-danger" onClick={this.logoutUser.bind(this)}>Logout</button>
      </div>
    )
  }
}

export default connect(null, {signInWithGoogle, signOut})(Login);
