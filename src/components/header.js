import React, { Component } from 'react';
import {Link, IndexLink} from 'react-router';
import { connect } from 'react-redux';

class Header extends Component {

  renderAdminLinks() {

    if(this.props.auth.isLogged) {
      return(
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/admin" activeClassName="active">Admin</Link></li>
        </ul>
      )
    }
  }

  render() {
    console.log(this.props);
    return (
      <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand" activeClassName="active">Home</Link>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li className="active"><a href="#">Comics</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Patreon</a></li>
              <li><a href="#">About</a></li>
            </ul>
            { this.renderAdminLinks() }
          </div>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Header);
