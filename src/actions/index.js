import axios from 'axios';
import _ from 'lodash';

export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';
export const GET_USERS = 'get_users';
export const GET_USER = 'get_user';
export const SAVE_QUESTION = 'save_question';

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
        avatarURL: 'https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png',
        answers: {
            "xj352vofupe1dqz9emx13r": 'optionOne',
            "vthrdm985a262al8qx3do": 'optionTwo',
            "6ni6ok3ym7mf1p33lnez": 'optionOne'
        },
        questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
    }
]

let questions = {
    "8xf0y6ziyjabvozdd253nd": {
        id: '8xf0y6ziyjabvozdd253nd',
        author: 'sarahedo',
        timestamp: 1467166872634,
        optionOne: {
            votes: ['sarahedo'],
            text: 'have horrible short term memory',
        },
        optionTwo: {
            votes: [],
            text: 'have horrible long term memory'
        }
    },
    "6ni6ok3ym7mf1p33lnez": {
        id: '6ni6ok3ym7mf1p33lnez',
        author: 'johndoe',
        timestamp: 1468479767190,
        optionOne: {
            votes: [],
            text: 'become a superhero',
        },
        optionTwo: {
            votes: ['johndoe', 'sarahedo'],
            text: 'become a supervillian'
        }
    },
    "am8ehyc8byjqgar0jgpub9": {
        id: 'am8ehyc8byjqgar0jgpub9',
        author: 'sarahedo',
        timestamp: 1488579767190,
        optionOne: {
            votes: [],
            text: 'be telekinetic',
        },
        optionTwo: {
            votes: ['sarahedo'],
            text: 'be telepathic'
        }
    },
    "loxhs1bqm25b708cmbf3g": {
        id: 'loxhs1bqm25b708cmbf3g',
        author: 'tylermcginnis',
        timestamp: 1482579767190,
        optionOne: {
            votes: [],
            text: 'be a front-end developer',
        },
        optionTwo: {
            votes: ['sarahedo'],
            text: 'be a back-end developer'
        }
    },
    "vthrdm985a262al8qx3do": {
        id: 'vthrdm985a262al8qx3do',
        author: 'tylermcginnis',
        timestamp: 1489579767190,
        optionOne: {
            votes: ['tylermcginnis'],
            text: 'find $50 yourself',
        },
        optionTwo: {
            votes: ['johndoe'],
            text: 'have your best friend find $500'
        }
    },
    "xj352vofupe1dqz9emx13r": {
        id: 'xj352vofupe1dqz9emx13r',
        author: 'johndoe',
        timestamp: 1493579767190,
        optionOne: {
            votes: ['johndoe'],
            text: 'write JavaScript',
        },
        optionTwo: {
            votes: ['tylermcginnis'],
            text: 'write Swift'
        }
    },
}

export function _getUsers() {
    return function (dispatch) {
        new Promise((res, rej) => {
            setTimeout(() => res({ ...users }), 1000)
        }).then(dispatch({
            type: GET_USERS,
            users
        }))
    }
}

export function getUser(userID) {

    let thisUser = [];

    return function (dispatch) {
        new Promise((res, rej) => {
            thisUser = users.filter(function (user) {
                return user.id == userID;
            })

            thisUser = thisUser[0];

            return thisUser;
        }).then(dispatch({
            type: GET_USER,
            thisUser
        }))
    }
}

function generateUID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function formatQuestion({ optionOneText, optionTwoText, author }) {
    return {
        id: generateUID(),
        timestamp: Date.now(),
        author,
        optionOne: {
            votes: [],
            text: optionOneText,
        },
        optionTwo: {
            votes: [],
            text: optionTwoText,
        }
    }
}

export function _saveQuestion(question) {

    return function (dispatch) {
        new Promise((res, rej) => {
            const authedUser = question.author;
            const formattedQuestion = formatQuestion(question);

            setTimeout(() => {
                questions = {
                    ...questions,
                    [formattedQuestion.id]: formattedQuestion
                }

                let user = _.find(users, {id : authedUser})

                var elementPos = users.map(function(x) {return x.id; }).indexOf(authedUser);
                var objectFound = users[elementPos];

                users = users.concat(user.questions.push(formattedQuestion.id))

                users = users.filter(item => item.id != null )

                res(formattedQuestion)
            }, 1000)
        }).then(dispatch({
            type: SAVE_QUESTION,
            payload: { questions, users}
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

