/**
 * Created by lucas on 06/04/16.
 */
import React from 'react';
import {PostList} from './../components/posts';
import {LoadingSpinner} from './../components/ui';
import {Link} from 'react-router';
import {fetchJson} from './../fetch-json';
import {Paginator} from './../components/ui';

var Home = React.createClass({
    getInitialState: function () {
        return {posts: [], isLoading: false, page: 1}
    },
    fetchPosts: function () {
        this.setState({isLoading: true});
        fetchJson('/api/post?page='+this.state.page).then(function (data) {
            this.setState({posts: data.posts, maxPages: data.total_pages - 1, isLoading: false})
        }.bind(this))
    },
    componentDidMount: function () {
        this.fetchPosts();
    },
    changePage: function (c) {
        this.setState({page: this.state.page + c}, this.fetchPosts);
    },
    nextPage: function () {
        this.changePage(1);
    },
    previousPage: function () {
        this.changePage(-1);
    },
    render: function () {
        if (this.state.isLoading)
            return (<LoadingSpinner />);

        return (
            <section>
                <h1>Posts</h1>
                <Link to="/new/" className="btn btn-default">Novo Post</Link>
                <PostList posts={this.state.posts} />
                <Paginator onNext={this.nextPage} onPrevious={this.previousPage}
                           page={this.state.page} maxPage={this.state.maxPages} />
            </section>
        );
    }
});

export default Home