import { AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATION_ERROR, GET_USERS } from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_USERS:
            return {...state, ['users']: action.users }
        case AUTHENTICATED:
            console.log(action);
            return { ...state, authenticated: true, signedInUser: action.user };
        case UNAUTHENTICATED:
            return { ...state, authenticated: false };
        case AUTHENTICATION_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
    return state;
}