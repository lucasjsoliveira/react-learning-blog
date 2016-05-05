/**
 * Created by lucas on 15/04/16.
 */
import React from 'react';
import {Post} from './../components/posts';
import {fetchJson} from './../fetch-json';

var ViewPost = React.createClass({
    getInitialState: function () {
        return {post: {}, isLoading: false};
    },
    componentDidMount: function() {
        this.setState({isLoading: true});
        fetchJson('/api/post/view?id=' + this.props.params.id).then(function (data) {
            this.setState({post: data, isLoading: false})
        }.bind(this));
    },
    render: function () {
        return (
            <section>
                {this.state.isLoading ? '' : <Post post={this.state.post} linkToPost={false} />}
            </section>
        )
    }
});

export default ViewPost;