import { AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATION_ERROR, GET_USERS, GET_USER } from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_USERS:
            return { ...state, ['users']: action.users }
        case GET_USER:
            return { ...state, ['user']: action.thisUser }
        case AUTHENTICATED:
        if(action.payload){
            return { ...state, authenticated: true, 
                signedInUser: action.payload.user, 
                ['user']: action.payload.thisUser };
        }
        return { ...state, authenticated: true};
        case UNAUTHENTICATED:
            return { ...state, authenticated: false };
        case AUTHENTICATION_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
    return state;
}