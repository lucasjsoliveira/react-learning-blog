/**
 * Created by lucas on 10/05/16.
 */
import React from 'react';
import {fetchJson} from './../fetch-json';
import {PostList} from './../components/posts'
import {LoadingSpinner} from './../components/ui';

export default class TagPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {posts: [], tagName: null, isLoading: true};
    }

    componentDidMount() {
        fetchJson('/api/post/get-by-tag?tagId=' + this.props.params.tagId).then(function (data) {
            this.setState(Object.assign({isLoading: false}, data));
        }.bind(this));
    }

    render() {
        if (this.state.isLoading)
            return (<LoadingSpinner />);

        return (
            <div>
                <h1>{`Posts marcados como "${this.state.tagName}"`}</h1>
                <PostList posts={this.state.posts} />
            </div>
        )
    }
}