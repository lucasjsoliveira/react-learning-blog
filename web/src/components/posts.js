/**
 * Created by lucas on 14/04/16.
 */
import React from 'react';
import {Link, browserHistory} from 'react-router';
import moment from 'moment';
import {postJson} from './../fetch-json';
import {TagSelector, TagList} from './../components/tags';

var PostTitle = React.createClass({
    render: function () {
        var titulo = this.props.post.titulo;
        var url = '/view/' + this.props.post.id;
        return (
            <h1>
                {this.props.linkToPost ?  <Link to={url}>{titulo}</Link> : <span>{titulo}</span>}
            </h1>
        )
    }
});

var Post = React.createClass({
    getDefaultProps: function () {
        return {
            linkToPost: true
        }
    },
    render: function() {
        var data = moment(this.props.post.data).format('DD/MM/YYYY');
        var taglist = (this.props.post.tags) ? <div><TagList tags={this.props.post.tags} /></div> : null;
        return (
            <section>
                <PostTitle {... this.props} />
                <p><small>Por: {this.props.post.autor} em {data}</small></p>
                <p>{this.props.post.corpo}</p>
                {taglist}
                <hr />
            </section>
        )
    }
});

var PostList = React.createClass({
    render: function() {
        return (
            <section>
                <h1>Posts</h1>
                {this.props.posts.map(function (post) {
                    return <Post post={post} key={post.id} />
                })}
            </section>
        )
    }
});

export {
    PostList,
    Post
}