import React, { Component } from 'react';
import checkAuth from './requireAuth';

class Admin extends Component {
  render() {
    return(
      <div>Admin Page</div>
    )
  }
}

export default checkAuth(Admin)
