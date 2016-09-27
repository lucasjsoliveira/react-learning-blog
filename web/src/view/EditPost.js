/**
 * Created by lucas on 14/04/16.
 */
import React from 'react';
import PostForm from './../components/post-form';

class NewPost extends React.Component {
    render() {
        var id = this.props.params.id;
        return (
            <PostForm load={id} store={this.store}/>
        )
    }
}

export default NewPost