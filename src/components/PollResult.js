import React, { Component } from 'react';
import '../styles/index.css';
import { connect } from 'react-redux';
import { _getQuestions, _getUsers, _getPoll, _getQuestionsAsync } from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class PollResult extends Component {
    constructor(props) {
        super(props);

    }

    // componentWillReceiveProps(){
    //     console.log('componentn will receive props')

    //     var questionIDs = []
    //     debugger;
    
    // }

    componentDidUpdate(){
        console.log(this.props);

        const paramID = this.props.match.params.id;
        var questionIDs = [];

        this.props.allQuestions.forEach(element => {
            questionIDs.push(element.id);
        });

        if(!questionIDs.includes(paramID)){
            this.props.history.push('/invalid');
        }

    }
    componentWillMount() {
        this.props._getQuestions();
        this.props._getUsers();

    }

    componentDidMount() {
        console.log(this.props);
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

                                    <h2>Would you rather {this.props.selectedPoll.optionOne.text} </h2><span class="selected">{this.props.selectedPoll.selected == 1 ? "This User Selected This!" : ""} </span>
                                    <p>{this.props.selectedPoll.optionOne.votes.length}
                                        /  {this.props.selectedPoll.optionOne.votes.length + this.props.selectedPoll.optionTwo.votes.length} votes</p>


                                    <p>{this.props.selectedPoll.optionOne.votes.length
                                        / (this.props.selectedPoll.optionOne.votes.length
                                            + this.props.selectedPoll.optionTwo.votes.length) * 100
                                    } % voted
                                    </p>


                                    <br />

                                    <h2>Would you rather {this.props.selectedPoll.optionTwo.text} </h2><span class="selected">{this.props.selectedPoll.selected == 1 ?  "": "This User Selected This!" }</span> 
                                    <p>{this.props.selectedPoll.optionTwo.votes.length}
                                        /  {this.props.selectedPoll.optionOne.votes.length + this.props.selectedPoll.optionTwo.votes.length} votes
                            </p>
                            <p>{this.props.selectedPoll.optionTwo.votes.length
                                        / (this.props.selectedPoll.optionOne.votes.length
                                            + this.props.selectedPoll.optionTwo.votes.length) * 100
                                    } % voted
                                    </p>

                                </div> :
                                <div>
                                    <h1 class="selected">
                                    Error! Selected Question Not Found

                                    </h1>
                                </div>
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
        var selectedPoll = questions.find(obj => obj.id == pollID);

        var optionSelected = null;

        var thisUser = state.auth.user.id;

        if(selectedPoll != null){
            if(selectedPoll.optionOne.votes.includes(thisUser)){
                optionSelected = 1
            } else {
                optionSelected = 2;
            }
            selectedPoll['selected'] = optionSelected
        } 


        
        return {
            answeredQuestions: results,
            users: state.auth.uses,
            selectedPoll: selectedPoll, 
            allQuestions: questions
        };
    }
    return {
        users: state.auth.uses,
    };


}

export default connect(mapStateToProps, { _getQuestions, _getUsers, _getPoll })(PollResult);
