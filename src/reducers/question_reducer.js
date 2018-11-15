import { SAVE_QUESTION, GET_QUESTIONS } from '../actions';
import _ from 'lodash';

export default function (state = {}, action) {
    switch (action.type) {
        case SAVE_QUESTION:
            return { ...state, ['users']: action.payload.users }
        case GET_QUESTIONS:

        var questions = action.questions

        var questionsArr = []

            Object.keys(action.questions).forEach(function (key) {
                questionsArr.push(questions[key])
            });

            return { ...state, ['questions']: questionsArr}
        default:
            return state;
    }
}