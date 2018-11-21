import React, { Component } from 'react';
import '../styles/index.css';
import { connect } from 'react-redux';
import { _getQuestions, _getUsers, _getPoll } from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class AnsweredQuestions extends Component {

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


    showPoll(selectedPoll) {
        var selectedPoll = this.props.answeredQuestions.find(obj => obj.id == selectedPoll);
        this.setState({ selectedPoll: selectedPoll, showPoll: true })
    }

    getPoll(pollID) {
        this.props._getPoll(pollID);
    }

    render() {
        return (
            <div>
                <h2>Answered Questions</h2>
                <div className="row">
                    <div className="col-sm-6">
                        {
                            this.props.answeredQuestions ?
                                this.props.answeredQuestions.map((question, index) => {
                                    return (
                                        <div key={index}>
                                            {question.author} asks
                                            Would you rather:
                                    <br />

                                            1) {question.optionOne.text}     {" "}
                                            2)                       {question.optionTwo.text}

                                            <br />
                                            {/* <a onClick={() => this.showPoll(question.id)}>Show Poll</a> */}

                                            <Link onClick={() => this.getPoll(question.id)} to={`questions/${question.id}`}>
                                                Show results
                                            </Link>
                                            <br />
                                            <br />

                                        </div>
                                    )
                                }) : <div></div>
                        }  </div>
                    <div className="col-sm-6">
                        {
                            this.state.showPoll && this.state.selectedPoll != " " ?
                                <div>
                                    <h1>Results</h1>

                                    <h2>Would you rather {this.state.selectedPoll.optionOne.text}</h2>
                                    <p>{this.state.selectedPoll.optionOne.votes.length}
                                        /  {this.state.selectedPoll.optionOne.votes.length + this.state.selectedPoll.optionTwo.votes.length} votes</p>

                                   
                                   
                                    <br />

                                    <h2>Would you rather {this.state.selectedPoll.optionTwo.text}</h2>
                                    <p>{this.state.selectedPoll.optionTwo.votes.length}
                                        /  {this.state.selectedPoll.optionOne.votes.length + this.state.selectedPoll.optionTwo.votes.length} votes
                            </p>

                                </div> :
                                <div></div>
                        }
                    </div>
                </div>




            </div>
        )
    }
}


function mapStateToProps(state) {

    if (state.auth.user && state.questions.questions) {
        let answered = state.auth.user.answers

        const answers = Object.keys(answered)
        const questions = state.questions.questions;

        var results = questions.filter(item => answers.includes(item.id))

        results = results.sort(function(a, b) {
            return b.timestamp - a.timestamp;
        });
        
        return {
            answeredQuestions: results,
            users: state.auth.uses
        };
    }


}

export default connect(mapStateToProps, { _getQuestions, _getUsers, _getPoll })(AnsweredQuestions);
