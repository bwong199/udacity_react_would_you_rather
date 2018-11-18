import React, { Component } from 'react';
import '../styles/index.css';
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { _saveQuestion, _getQuestions } from '../actions';
import { connect } from 'react-redux';

class NewQuestion extends Component {
    constructor() {
        super();

        this.state = {
            option1: '',
            option2: ''
        }

    }

    submit() {
        console.log(this.state);

        var question = {
            author: this.props.author ? this.props.author : '',
            optionOneText: this.state.option1,
            optionTwoText: this.state.option2
        }

        this.props._saveQuestion(question, this.props.history, () => {
            this.props._getQuestions();
            // this.props._getUsers();
        });

        this.setState({ option1: ""})
        this.setState({ option2: ""})
    }

    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Create New Question</h5>
                        <p className="card-text">
                            Complete the question
                        </p>
                        <p className="card-text">
                            Would you rather...
                        </p>
                        <Form inline>
                            <FormGroup>

                                <FormControl
                                    type="text"
                                    placeholder="Enter Option 1 Text Here"
                                    onChange={event => this.setState({ option1: event.target.value })}
                                />

                            </FormGroup>
                            {' '}

                            <FormGroup>
                                {' '}
                                <FormControl
                                    type="text"
                                    placeholder="Enter Option 2 Text Here"
                                    onChange={event => this.setState({ option2: event.target.value })}
                                ></FormControl>
                            </FormGroup>
                            {' '}
                            <Button onClick={() => this.submit()}>Submit</Button>
                        </Form>

                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {

    console.log(state);

    return {
        errorMessage: state.auth.error,
        author: state.auth.user ?  state.auth.user.id : ''
    };
}

export default connect(mapStateToProps, { _saveQuestion, _getQuestions })(NewQuestion);