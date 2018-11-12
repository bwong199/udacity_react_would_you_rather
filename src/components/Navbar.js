import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOutAction } from '../actions';

class Navbar extends Component {

  logout = () => {
    this.props.signOutAction();
  }

  navbarLinks() {
    if (this.props.authenticated) {
      return [
        // <li key="secret"><Link to="/secret">Secret</Link></li>,
        <li key="signout"><Link to="/signin" onClick={this.logout}>Sign out</Link></li>
      ];
    }
    return [
      <li key="signin"><Link to="/signin">Sign in</Link></li>,
      // <li key="signup"><Link to="/signup">Sign up</Link></li>
    ];
  }

  render() {
    return (
      <nav className="navbar">
        <div className="container">
          <Link to="/"><span className="brand">Would-you-rather</span></Link>
          <ul>
            {this.navbarLinks()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, { signOutAction })(Navbar);

