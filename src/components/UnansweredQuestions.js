import React, { Component } from 'react';
import '../styles/index.css';
import _ from 'lodash';
import { _getQuestions, _getUsers, _saveQuestionAnswer } from '../actions';
import { connect } from 'react-redux';

class UnansweredQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPoll: false,
            selectedPoll: ''
        }
    }

    componentDidMount() {
        this.props._getQuestions();
        this.props._getUsers();

    }

    selectPoll(questionID, choice) {
        this.props._saveQuestionAnswer(this.props.thisUser, questionID, choice)
    }

    render() {
        return (
            <div>
                <h2>Unanswered Questions</h2>
                <div className="row">
                    <div className="col-sm-6">
                        {
                            this.props.unansweredQuestions ?
                                this.props.unansweredQuestions.map((question, index) => {
                                    return (
                                        <div>
                                            {question.author} asks
                                            <h5>Would you rather:</h5>
                                    <br />
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <button className="btn btn-primary" onClick={() => this.selectPoll(question.id, 'optionOne')}>
                                                        {question.optionOne ? question.optionOne.text : ""}
                                                    </button>
                                                </div>
                                                <div className="col-sm-6">
                                                    <button className="btn btn-success" onClick={() => this.selectPoll(question.id, 'optionTwo')}>
                                                        {question.optionTwo ? question.optionTwo.text : ""}
                                                    </button>
                                                </div>
                                            </div>
                                            <br />
                                            <br />
                                        </div>
                                    )
                                }) : <div></div>
                        }  </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    if (state.auth.user) {
        let answered = state.auth.user.answers

        const answers = Object.keys(answered)
        const questions = state.questions.questions;

        var results = questions.filter(item => !answers.includes(item.id))
        console.log(results);
        return {
            unansweredQuestions: results,
            users: state.auth.auth,
            thisUser: state.auth.user.id
        };
    }


}

export default connect(mapStateToProps, { _getQuestions, _saveQuestionAnswer, _getUsers })(UnansweredQuestions);
