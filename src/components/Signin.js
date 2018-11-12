import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { signInAction } from '../actions';
import { _getUsers } from '../actions';

import { connect } from 'react-redux';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "sarahedo"
    }
  }
  componentDidMount() {
    this.props._getUsers();
  }

  // submit = (values) => {
  //   console.log(values);
  //   this.props.signInAction(values, this.props.history);
  // }

  errorMessage() {
    if (this.props.errorMessage) {
      return (
        <div className="info-red">
          {this.props.errorMessage}
        </div>
      );
    }
  }

  dropdownChange = (event) => {
    let value = event.target.value;
    this.setState({user: value})
    this.setState(state => {
      state.user = value
   }, ()=>{
    console.log(this.state.user);
   });
  }

  submit = (event) => {
    event.preventDefault();
    const userID = this.state.user;
    this.props.signInAction(userID, this.props.history);
  }

  render() {

    return (

      <div className="form">
        <div className="container">
          <h2>Sign In</h2>
          <form>
            <select onChange={this.dropdownChange}>
              {
                this.props.users ?
                  this.props.users.map((user) => {
                    return <option value={user.id}>{user.name}</option>
                  }) : <div></div>
              }
            </select>
            <button type="submit" className="blue" onClick={this.submit}>Sign In</button>
          </form>
          {this.errorMessage()}

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    users: state.auth.users
  };
}


const reduxFormSignin = reduxForm({
  form: 'signin'
})(Signin);

export default connect(mapStateToProps, { signInAction, _getUsers })(reduxFormSignin);