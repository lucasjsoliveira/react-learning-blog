/**
 * Created by lucas on 06/04/16.
 */
import React from 'react';
import {PostList} from './../components/posts';
import {LoadingSpinner} from './../components/ui';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {getPosts} from './../redux-actions';

var ConnectedPostList = React.createClass({
    componentDidMount: function () {
        this.props.getPosts();
    },
    render: function () {
        return (
            <section>
                <Link to="/new/" className="btn btn-default">Novo Post</Link>
                {(this.props.isLoading) ? <LoadingSpinner /> : <PostList posts={this.props.posts} />}
            </section>
        );
    }
});

var mapStateToProps = function (state) {
    return {
        posts: state.postList.posts,
        isLoading: state.postList.isFetching
    };
};

var mapDispatchToProps = {
    getPosts
};

var Home = connect(mapStateToProps, mapDispatchToProps)(ConnectedPostList);

export default Home