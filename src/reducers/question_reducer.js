import { SAVE_QUESTION, GET_QUESTIONS, SAVE_ANSWER, GET_POLL } from '../actions';
import _ from 'lodash';

export default function (state = {}, action) {
    console.log(action);
    switch (action.type) {
        case SAVE_QUESTION:
            var questions = action.payload.questions
            var questionsArr = []
            Object.keys(questions).forEach(function (key) {
                questionsArr.push(questions[key])
            });
            return { ...state, ['users']: action.payload.users, ['questions']: questionsArr }
        case GET_QUESTIONS:
            var questions = action.questions
            var questionsArr = []
            Object.keys(action.questions).forEach(function (key) {
                questionsArr.push(questions[key])
            });
            return { ...state, ['questions']: questionsArr }
        case SAVE_ANSWER:
            var questions = action.payload[0]
            var questionsArr = []
            Object.keys(questions).forEach(function (key) {
                questionsArr.push(questions[key])
            });
            return { ...state, ['questions']: questionsArr }
        case GET_POLL:
            var questions = action.payload.questions
            var questionsArr = []
            Object.keys(questions).forEach(function (key) {
                questionsArr.push(questions[key])
            });
            return { ...state, ['users']: action.payload.users, ['questions']: questionsArr, ["thisPoll"]: action.payload.pollID }
        default:
            return state;
    }
}