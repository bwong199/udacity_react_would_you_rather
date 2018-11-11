import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { signInAction } from '../actions';
import { _getUsers } from '../actions';

import { connect } from 'react-redux';

class Signin extends Component {

  componentDidMount() {
    this.props._getUsers();
  }

  submit = (values) => {
    this.props.signInAction(values, this.props.history);
  }

  errorMessage() {
    if (this.props.errorMessage) {
      return (
        <div className="info-red">
          {this.props.errorMessage}
        </div>
      );
    }
  }
  render() {

    const { handleSubmit } = this.props;
    return (

      <div className="form">
        <div className="container">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit(this.submit)}>
            <select>
              {
                this.props.users ?
                  this.props.users.map((user) => {
                    return <option value="{user.id}">{user.name}</option>
                  }) : <div></div>
              }
            </select>
            <button type="submit" className="blue">Sign In</button>
          </form>
          {this.errorMessage()}

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {

  if (state.auth.users) {
    var users = state.auth.users;

    users.forEach(function (user) {
      console.log(user.name);
    })
  }
  return {
    errorMessage: state.auth.error,
    users: state.auth.users
  };
}


const reduxFormSignin = reduxForm({
  form: 'signin'
})(Signin);

export default connect(mapStateToProps, { signInAction, _getUsers })(reduxFormSignin);