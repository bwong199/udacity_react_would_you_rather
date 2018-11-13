import React, { Component } from 'react';
import '../styles/index.css';
import { _getUsers } from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash';

class Leaderboard extends Component {

    componentWillMount() {
        this.props._getUsers();
    }

    render() {
        return (
            <div>
                <h2>Leaderboard</h2>
                {
                    this.props.leaderboard ?
                        this.props.leaderboard.map((user) => {
                            return (
                                <div className="card">
                                    <img id="leaderBoardImg" className="card-img-top" src={user.avatar} alt="Card image cap"></img>
                                    <div className="card-body">
                                        <h5 className="card-title">{user.name}</h5>
                                        <p className="card-text">
                                            Answer questions: {user.answerPts}
                                        </p>
                                        <p className="card-text">
                                            Created questions: {user.questionPts}
                                        </p>
                                        <p className="card-text">
                                            Score: {user.totalPts}
                                        </p>
                                    </div>
                                </div>
                            )
                        }) : <div></div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    let scores = [];
    if (state.auth.users) {
        state.auth.users.forEach(function (user) {
            let answerPts = Object.keys(user.answers).length
            let questionPts = user.questions.length;
            let totalPts = answerPts + questionPts;
            scores[user.id] = totalPts
            var user = {
                name: user.name,
                answerPts: answerPts,
                questionPts: questionPts,
                totalPts: totalPts,
                avatar: user.avatarURL
            }
            scores.push(user);
        })
        scores = _.sortBy(scores, 'totalPts').reverse();
    }

    return {
        errorMessage: state.auth.error,
        users: state.auth.users,
        leaderboard: scores
    };
}


export default connect(mapStateToProps, { _getUsers })(Leaderboard);