/**
 * Created by lucas on 06/04/16.
 */
import React from 'react';
import {PostList} from './../components/posts';
import {LoadingSpinner} from './../components/ui';
import {Link} from 'react-router';
import {fetchJson} from './../fetch-json';

var Home = React.createClass({
    getInitialState: function () {
        return {posts: [], isLoading: false}
    },
    componentDidMount: function () {
        this.setState({isLoading: true});
        fetchJson('/api/post').then(function (data) {
            this.setState({posts: data, isLoading: false})
        }.bind(this))
    },
    render: function () {
        return (
            <section>
                <Link to="/new/" className="btn btn-default">Novo Post</Link>
                {(this.state.isLoading) ? <LoadingSpinner /> : <PostList posts={this.state.posts} />}
            </section>
        );
    }
});

export default Home