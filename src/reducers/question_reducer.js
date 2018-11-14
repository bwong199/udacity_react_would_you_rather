import { SAVE_QUESTION } from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case SAVE_QUESTION:
            console.log(state)
            console.log(action.payload);
            return { ...state,  ['users']: action.payload.users }
        default:
            return state;
    }
    return state;
}