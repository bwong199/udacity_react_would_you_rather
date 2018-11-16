import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOutAction } from '../actions';
import { getUser, _getUsers } from '../actions';

class Navbar extends Component {


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
        // <li key="secret"><Link to="/secret">Secret</Link></li>,
        <div>
          <Link className="link" to="/home">Home</Link>
          <Link className="link" to="/leaderboard">Leader Board</Link>
          <Link className="link" to="/newquestion">New Question</Link>
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
      <li key="signin"><Link to="/signin">Sign in</Link></li>,
      // <li key="signup"><Link to="/signup">Sign up</Link></li>
    ];
  }

  componentDidMount() {
    const user = this.props.getUser(this.props.user);
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
  if (state.auth.signedInUser == null) {
    const userFromStorage = localStorage.getItem("user")
    return {
      authenticated: state.auth.authenticated,
      user: userFromStorage,
      userAvatar: state.auth.user ? state.auth.user.avatarURL : ''
        };
  } else {

    return {
      authenticated: state.auth.authenticated,
      user: state.auth.signedInUser,
      userAvatar: state.auth.user ? state.auth.user.avatarURL : ''
    };
  }

}

export default connect(mapStateToProps, { signOutAction, getUser, _getUsers })(Navbar);

