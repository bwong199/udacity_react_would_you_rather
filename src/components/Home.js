import React, { Component } from 'react';
import '../styles/index.css';
import AnsweredQuestions from './AnsweredQuestions';
import UnansweredQuestions from './UnansweredQuestions';
import { connect } from 'react-redux';
import { _getQuestions, _getUsers } from '../actions';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAnsweredQuestions: false
        }
    }

    componentDidMount() {
        this.props._getQuestions();
        this.props._getUsers();
      }
    

    render() {
        return (
            <div>
                <a onClick={() => this.setState({ showAnsweredQuestions: true })}>Answered Questions</a>
                {"   "}
                <a onClick={() => this.setState({ showAnsweredQuestions: false })}>Unanswered Questions</a>

                {
                    this.state.showAnsweredQuestions ?
                        <AnsweredQuestions questions={this.props.questions}/> :
                        <UnansweredQuestions />
                }
            </div>
        )
    }
}


function mapStateToProps(state) {
    
    return {
        questions: state.questions
    };
}


export default connect(mapStateToProps, {_getQuestions, _getUsers})(Home);
