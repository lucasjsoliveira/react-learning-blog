/**
 * Created by lucas on 14/04/16.
 */
import React from 'react';
import PostForm from './../components/post-form';
import {connect} from 'react-redux';

var NewPost = React.createClass({
    render() {
        return (
            <PostForm />
        )
    }
});

var assignDispatchToProps = {

}

export default NewPost