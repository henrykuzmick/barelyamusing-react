import React, { Component } from 'react';
import {Link, IndexLink} from 'react-router';
import { connect } from 'react-redux';
import RandomHeader from './randomHeader';

class Header extends Component {

  renderAdminLinks() {

    if(this.props.auth.isLogged) {
      return(
        <li><Link to="/admin" activeClassName="active">Admin</Link></li>
      )
    }
  }

  render() {
    console.log(this.props);
    return (
      <div className="header">
        <RandomHeader />
        <div id="navbar" className="navbar">
          <ul className="nav navbar-nav">
            <li><a href="/">Home</a></li>
            <li><a href="#">Comics</a></li>
            <li><a href="#">About</a></li>
            { this.renderAdminLinks() }
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Header);
