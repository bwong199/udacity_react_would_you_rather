import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Leaderboard from './components/Leaderboard';
import NewQuestion from './components/NewQuestion';
import Navbar from './components/Navbar';
import Signin from './components/Signin';
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
                    {/* <Route exact path="/" component={Homepage} /> */}
                    {/* <Route path="/signin" component={noRequireAuth(Signin)} />
                    <Route path="/signup" component={noRequireAuth(Signup)} />
                    <Route path="/signout" component={requireAuth(Signout)} />
                    <Route path="/secret" component={requireAuth(SecretPage)} /> */}
                    <Route path="/" component={App} exact />
                    <Route path="/signin" component={noRequireAuth(Signin)} exact />
                    <Route path="/leaderboard" component={requireAuth(Leaderboard)} exact />
                    <Route path="/newquestion" component={requireAuth(NewQuestion)} exact />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
