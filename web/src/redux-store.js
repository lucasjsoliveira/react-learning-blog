/**
 * Created by lucas on 02/05/16.
 */
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {RECIEVE_POSTS, REQUEST_POSTS, REQUEST_POST, RECIEVE_POST} from './redux-actions';
import {NEW_POST, SET_POST_PROPERTIES} from './redux-actions';
import {routerReducer} from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

var postList = function (state = {posts: [], isFetching: false}, action) {
    switch (action.type) {
        case (RECIEVE_POSTS):
            return Object.assign({}, state, {isFetching: false, posts: action.posts});
        case (REQUEST_POSTS):
            return Object.assign({}, state, {isFetching: true});
        default:
            return state;
    }
};

var postShow = function (state = {post: {}, isFetching: false}, action) {
    switch (action.type) {
        case (RECIEVE_POST):
            return Object.assign({}, state, {isFetching: false, post: action.post});
        case (REQUEST_POST):
            return Object.assign({}, state, {isFetching: true});
        case (NEW_POST):
            return Object.assign({}, state, {isFetching: false, post: {data: moment().format('DD/MM/YYYY')}});
        case (SET_POST_PROPERTIES):
            let post = Object.assign({}, state.post, action.properties);
            return Object.assign({}, state, {post});

        default:
            return state;
    }
};

var appReducer = combineReducers({
    postList,
    postShow,
    routing: routerReducer
});

export var store =  createStore(appReducer, applyMiddleware(thunkMiddleware));