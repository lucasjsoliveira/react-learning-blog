/**
 * Created by lucas on 14/04/16.
 */
import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import {TagList} from './../components/tags';

var PostTitle = React.createClass({
    render: function () {
        var titulo = this.props.post.titulo;
        var url = '/view/' + this.props.post.id;
        var urlEdit = '/edit/' + this.props.post.id;
        return (
            <section>
                <Link to={urlEdit} className="pull-right ">Editar</Link>
                <h1>
                    {this.props.linkToPost ?  <Link to={url}>{titulo}</Link> : <span>{titulo}</span>}
                </h1>
            </section>
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
            </section>
        )
    }
});

var PostList = React.createClass({
    render: function() {
        return (
            <section>
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