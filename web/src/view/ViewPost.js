/**
 * Created by lucas on 15/04/16.
 */
import React from 'react';
import {Post} from './../components/posts';
import {connect} from 'react-redux';
import {getPost} from './../redux-actions';

var ViewPost = React.createClass({
    componentDidMount: function() {
        this.props.getPost(this.props.params.id);
    },
    render: function () {
        return (
            <section>
                {this.props.isLoading ? '' : <Post post={this.props.post} linkToPost={false} />}
            </section>
        )
    }
});

var mapStateToProps = function (state) {
    return {
        post: state.postShow.post,
        isLoading: state.postShow.isFetching
    };
};

var mapDispatchToProps = {
    getPost
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost);