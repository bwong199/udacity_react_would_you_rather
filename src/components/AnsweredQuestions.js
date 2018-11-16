import React, { Component } from 'react';
import '../styles/index.css';
import { connect } from 'react-redux';
import { _getQuestions, _getUsers } from '../actions';
import _ from 'lodash';

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
    }


    showPoll(selectedPoll) {
        console.log('show poll');

        var selectedPoll = this.props.answeredQuestions.find(obj => obj.id == selectedPoll);
        this.setState({ selectedPoll: selectedPoll, showPoll: true })

        console.log(this.state.selectedPoll);
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
                                        <div>
                                            {question.author} asks
                                            Would you rather:
                                    <br />

                                            1) {question.optionOne.text}     {" "}
                                            2)                       {question.optionTwo.text}

                                            <br />
                                            <a onClick={() => this.showPoll(question.id)}>Show Poll</a>
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

                                    <h2>Would you rather be {this.state.selectedPoll.optionOne.text}</h2>
                                    <p>{this.state.selectedPoll.optionOne.votes.length}
                                        /  {this.state.selectedPoll.optionOne.votes.length + this.state.selectedPoll.optionTwo.votes.length} votes</p>
                                    <br />

                                    <h2>Would you rather be {this.state.selectedPoll.optionTwo.text}</h2>
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

    if(state.auth.user){
        let answered = state.auth.user.answers


        const answers = Object.keys(answered)
        const questions = state.questions.questions;

        var results = questions.filter(item => answers.includes(item.id))

        return {
            answeredQuestions: results,
            users: state.auth.uses
        };
    }


}

export default connect(mapStateToProps, { _getQuestions })(AnsweredQuestions);
