import axios from 'axios';

export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';
export const GET_USERS = 'get_users';
export const GET_USER = 'get_user';

const URL = 'http://www.sample-website.com';
let users = [
    {
        id: 'sarahedo',
        name: 'Sarah Edo',
        avatarURL: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/user-account-profile-avatar-person-student-female-2-21045.png',
        answers: {
          "8xf0y6ziyjabvozdd253nd": 'optionOne',
          "6ni6ok3ym7mf1p33lnez": 'optionOne',
          "am8ehyc8byjqgar0jgpub9": 'optionTwo',
          "loxhs1bqm25b708cmbf3g": 'optionTwo'
        },
        questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
      },
       {
        id: 'tylermcginnis',
        name: 'Tyler McGinnis',
        avatarURL: 'https://cdn1.iconfinder.com/data/icons/avatars-55/100/avatar_profile_user_music_headphones_shirt_cool-512.png',
        answers: {
          "vthrdm985a262al8qx3do": 'optionOne',
          "xj352vofupe1dqz9emx13r": 'optionTwo',
        },
        questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
      },
      {
        id: 'johndoe',
        name: 'John Doe',
        avatarURL: 'https://freeiconshop.com/wp-content/uploads/edd/person-outline-filled.png',
        answers: {
          "xj352vofupe1dqz9emx13r": 'optionOne',
          "vthrdm985a262al8qx3do": 'optionTwo',
          "6ni6ok3ym7mf1p33lnez": 'optionOne'
        },
        questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
      }
    ]

export function _getUsers() {
    return function(dispatch){
        new Promise((res, rej) => {
            setTimeout(() => res({ ...users }), 1000)
        }).then(dispatch({
            type: GET_USERS,
            users
        }))
    } 
}

export function getUser(userID){

    let thisUser = [];

    return function(dispatch){
        new Promise((res, rej) => {
            thisUser = users.filter(function(user){
                return user.id == userID;
            })
        
            thisUser = thisUser[0];
        
            return thisUser;        }).then(dispatch({
            type: GET_USER,
            thisUser
        }))
    } 





}

// function uuid() {
//     return crypto.getRandomValues(new Uint32Array(4)).join('-');
// }

export function signInAction(user, history) {
    return async (dispatch) => {
        try {
            // const res = await axios.post(`${URL}/signin`, { email, password });
            
            dispatch({ 
                type: AUTHENTICATED,
                user 
            })
            localStorage.setItem('user', user);
            history.push('/app');
        } catch (error) {
            dispatch({
                type: AUTHENTICATION_ERROR,
                payload: 'Invalid email or password'
            });
        }
    };
}

export function signOutAction() {
    localStorage.clear();
    return {
        type: UNAUTHENTICATED
    };
}

