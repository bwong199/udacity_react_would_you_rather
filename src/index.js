import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Leaderboard from './components/Leaderboard';
import NewQuestion from './components/NewQuestion';
import Navbar from './components/Navbar';
import Signin from './components/Signin';
import Home from './components/Home';

import PollResult from './components/PollResult';

import reduxThunk from 'redux-thunk';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AUTHENTICATED } from './actions';

import requireAuth from './components/hoc/require_auth';
import noRequireAuth from './components/hoc/no_require_auth';
// const store = createStore(rootReducer);
// store.subscribe(
//     () => console.log('store', store.getState())
// )
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);

const user = localStorage.getItem('user');

if (user) {
    store.dispatch({ type: AUTHENTICATED });
}

// https://blog.scalac.io/react-redux-jwt-authentication.html

ReactDOM.render
    (
    <Provider store={store}>

        <BrowserRouter>
            <div className="container">
                <Navbar />
                <Switch>
                    <Route path="/app" component={App} exact />
                    <Route path="/signin" component={noRequireAuth(Signin)} exact />
                    <Route path="/home" component={requireAuth(Home)} exact />
                    <Route path="/leaderboard" component={requireAuth(Leaderboard)} exact />
                    <Route path="/add" component={requireAuth(NewQuestion)} exact />
                    <Route path="/questions/:id" component={requireAuth(PollResult)} exact />

                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
