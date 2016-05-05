/**
 * Created by lucas on 14/04/16.
 */
import React from 'react';
import PostForm from './../components/post-form';

var NewPost = React.createClass({
    render() {
        return (
            <PostForm edit={this.props.params.id} />
        )
    }
});

export default NewPost