import React, { Component } from 'react';
import '../styles/index.css';
import { connect } from 'react-redux';

class App extends Component {
    render() {
        return (
            <div>
                {
                    this.props.user ? <div>{this.props.user}</div> : <div></div>
                }
                <h2>Hello World</h2>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state.auth.signedInUser);



    if(state.auth.signedInUser == null){
        const userFromStorage = localStorage.getItem("user");
        return {
            user: userFromStorage
          };
    } else {

        return {
            user: state.auth.signedInUser
          };
    }

  }

  
export default connect(mapStateToProps, null)(App);