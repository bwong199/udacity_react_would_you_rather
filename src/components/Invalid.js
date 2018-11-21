import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOutAction } from '../actions';
import { getUser, _getUsers } from '../actions';
import _ from 'lodash';

class Invalid extends Component {


  componentWillMount(){
    this.props._getUsers();
  }

  constructor(props) {
    super(props);
    this.state = {
      signedInUser: ""
    }
  }


  logout = () => {
    this.props.signOutAction();
  }

  navbarLinks() {
    if (this.props.authenticated) {
      return [
        <div key="1">
          <Link className="link" to="/home">Home</Link>
          <Link className="link" to="/leaderboard">Leader Board</Link>
          <Link className="link" to="/add">New Question</Link>
          <Link className="link" to="/signin" onClick={this.logout}>Sign out</Link>
          <Link className="link" to="/home">
            {this.props.user ? <div>Hello {this.props.user}</div> : <div></div>
            }</Link>
          <Link className="link" to="/home">
            {this.props.user ? 
            <img src={this.props.userAvatar} alt="Smiley face" height="42" width="42"></img>
            : <div></div>
            }</Link>
        </div>
    
      ];


    }
    return [
      <Link className="link" to="/signin" onClick={this.signedInUser}>Sign In</Link>

     ]
  }

  componentDidMount() {
    const user = this.props.getUser(this.props.user);
  }

  render() {
    return (
        <span className="selected">404 Not Found</span>
    );
  }
}



function mapStateToProps(state) {
  if (state.auth.signedInUser == null) {
    const userFromStorage = localStorage.getItem("user")
    return {
      authenticated: state.auth.authenticated,
      user: userFromStorage,
      userAvatar: state.auth.user ? state.auth.user.avatarURL : ''
        };
  } else {
    const signedInUser = _.find(state.auth.users, { id: state.auth.signedInUser})
    return {
      authenticated: state.auth.authenticated,
      user: state.auth.signedInUser,
      userAvatar: state.auth.signedInUser ? signedInUser.avatarURL : ''
    };
  }

}

export default connect(mapStateToProps, { signOutAction, getUser, _getUsers })(Invalid);

