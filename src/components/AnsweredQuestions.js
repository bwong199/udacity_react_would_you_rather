import React, { Component } from 'react';
import '../styles/index.css';
import { connect } from 'react-redux';
import { _getQuestions, _getUsers } from '../actions';

class AnsweredQuestions extends Component {

    componentDidMount() {
        this.props._getQuestions();
    }


    render() {
        return (
            <div>
                <h2>Answered Questions</h2>
                {
                    this.props.allQuestions ?
                        this.props.allQuestions.map((question, index) => {
                            return (
                                <div>
                                    {question.author} asks
                                    Would you rather:
                                    <br/>

                            1) {question.optionOne.text}     { " "}         
                            2)                       {question.optionTwo.text}

                                    <br/>
                                    <a onClick={() => this.setState({ showAnsweredQuestions: false })}>Show Poll</a>
                                    <br/>
                                    <br/>

                                </div>
                            )
                        }) : <div></div>
                }
            </div>
        )
    }
}


function mapStateToProps(state) {
    console.log(state.questions.questions);
    return {
        allQuestions: state.questions.questions
    };
}

export default connect(mapStateToProps, { _getQuestions })(AnsweredQuestions);
