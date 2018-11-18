import React, { Component } from 'react';
import '../styles/index.css';
import { connect } from 'react-redux';
import { _getQuestions, _getUsers, _getPoll } from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class PollResult extends Component {


    componentDidMount() {
        const { id } = this.props.match.params;
        this.setState({ pollID: id })

        this.props._getPoll(id, function () {
            var selectedPoll = this.props.answeredQuestions.find(obj => obj.id == id);
            this.setState({ selectedPoll: selectedPoll, showPoll: true })
        });

    }

    render() {
        return (
            <div>
                <div className="row">
                    <Link to={`/home`}>
                        Back
                    </Link>
                    <div className="col-sm-6">
                        {
                            this.props.selectedPoll ?
                                <div>
                                    <h1>Results</h1>

                                    <h2>Would you rather be {this.props.selectedPoll.optionOne.text}</h2>
                                    <p>{this.props.selectedPoll.optionOne.votes.length}
                                        /  {this.props.selectedPoll.optionOne.votes.length + this.props.selectedPoll.optionTwo.votes.length} votes</p>
                                    <br />

                                    <h2>Would you rather be {this.props.selectedPoll.optionTwo.text}</h2>
                                    <p>{this.props.selectedPoll.optionTwo.votes.length}
                                        /  {this.props.selectedPoll.optionOne.votes.length + this.props.selectedPoll.optionTwo.votes.length} votes
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

    console.log(state);

    if (state.auth.user && state.questions.questions) {
        let answered = state.auth.user.answers


        const answers = Object.keys(answered)
        const questions = state.questions.questions;

        var results = questions.filter(item => answers.includes(item.id))

        const pollID = state.questions.thisPoll;
        var selectedPoll = results.find(obj => obj.id == pollID);


        return {
            answeredQuestions: results,
            users: state.auth.uses,
            selectedPoll: selectedPoll
        };
    }


}

export default connect(mapStateToProps, { _getQuestions, _getUsers, _getPoll })(PollResult);
