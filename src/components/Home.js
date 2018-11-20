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

    handleClick(show) {
        this.setState({ showAnsweredQuestions: show })
    }

    render() {
        return (
            <div>
                <a onClick={() => this.handleClick(true)}>Answered Questions</a>
                {"   "}
                <a onClick={() => this.handleClick(false)}>Unanswered Questions</a>

                {
                    this.state.showAnsweredQuestions ?
                        <AnsweredQuestions history= {this.props.history}/> :
                        <UnansweredQuestions history= {this.props.history}/>
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


export default connect(mapStateToProps, { _getQuestions, _getUsers })(Home);
