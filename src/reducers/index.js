import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import questionReducer from './question_reducer';

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    questions: questionReducer
});

export default rootReducer;