/**
 * Created by lucas on 03/05/16.
 */
import {fetchJson} from './fetch-json';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECIEVE_POSTS = 'RECIEVE_POSTS';

export const REQUEST_POST = 'REQUEST_POST';
export const RECIEVE_POST = 'RECIEVE_POST';

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