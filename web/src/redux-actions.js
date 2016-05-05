/**
 * Created by lucas on 03/05/16.
 */
import {fetchJson, postJson} from './fetch-json';
import moment from 'moment';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECIEVE_POSTS = 'RECIEVE_POSTS';

export const REQUEST_POST = 'REQUEST_POST';
export const RECIEVE_POST = 'RECIEVE_POST';

export const NEW_POST = 'NEW_POST';
export const SET_POST_PROPERTIES = 'SET_POST_PROPERTIES';
export const SUBMIT_POST = 'SUBMIT_POST';
export const RECIEVE_SUBMIT_POST_RESULT = 'RECIEVE_SUBMIT_POST_RESULT';

function requestPosts() {
    return {
        type: REQUEST_POSTS
    }
}

function recievePosts(posts) {
    return {
        type: RECIEVE_POSTS,
        posts: posts
    }
}

function requestPost(id) {
    return {
        type: REQUEST_POST,
        id
    }
}

function recievePost(post) {
    return {
        type: RECIEVE_POST,
        post
    }
}

export function getPosts() {
    return function (dispatch) {
        dispatch(requestPosts());
        fetchJson('/api/post/index').then(function (data) {
            dispatch(recievePosts(data));
        });
    }
}

export function getPost(id) {
    return function (dispatch) {
        dispatch(requestPost(id));
        fetchJson('/api/post/view?id=' + id).then(function (data) {
            dispatch(recievePost(data));
        })
    }
}

export function newPost() {
    return {
        type: NEW_POST
    }
}

export function setPostProperties(properties) {
    return {
        type: SET_POST_PROPERTIES,
        properties
    }
}

export function submitPost() {
    return {
        type: SUBMIT_POST
    }
}

export function recievePostSubmitResult(result) {
    return {
        type: RECIEVE_SUBMIT_POST_RESULT
    }
}

export function savePost() {
    return function (dispatch, getState) {
        dispatch(submitPost());
        let post = getState().postShow.post;
        postJson('/api/post/submit', post).then(function (data) {
            dispatch(recievePostSubmitResult(data));
        })
    }
}