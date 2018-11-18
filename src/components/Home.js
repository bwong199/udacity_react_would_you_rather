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

        console.log('component did mount');
        // this.props._getQuestions();
        // this.props._getUsers();
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
                        <AnsweredQuestions /> :
                        <UnansweredQuestions />
                }
            </div>
        )
    }
}


function mapStateToProps(state) {
    // console.log(state.questions);

    // if(Object.keys(state.questions).length == 0){
    //     console.log('empty');
    // }

    return {
        questions: state.questions
    };
}


export default connect(mapStateToProps, { _getQuestions, _getUsers })(Home);
