/**
 * Created by lucas on 04/05/16.
 */

import React from 'react';
import {browserHistory} from 'react-router';
import moment from 'moment';
import {fetchJson, postJson} from './../fetch-json';
import {TagSelector} from './../components/tags';

export default React.createClass({
    getInitialState: function () {
        return {post: {data: moment().format('DD/MM/YYYY')}};
    },
    componentDidMount: function () {
        if (!this.props.edit)
            return;

        fetchJson('/api/post/edit?id=' + this.props.edit).then(function (data) {
            var post = data;
            post.data = (data.data.startsWith('0000')) ? null : moment(data.data).format('DD/MM/YYYY');
            this.setState({post});
        }.bind(this))
    },
    handlePostChange: function(prop, val) {
        var post = Object.assign({}, this.state.post);
        post[prop] = val;
        this.setState({post: post});
    },
    handleTituloChange: function(e) {
        this.handlePostChange('titulo', e.target.value);
    },
    handleCorpoChange: function(e) {
        this.handlePostChange('corpo', e.target.value);
    },
    handleAutorChange: function(e) {
        this.handlePostChange('autor', e.target.value);
    },
    handleDataChange: function(e) {
        this.handlePostChange('data', e.target.value);
    },
    handleTagsChange: function (tagIds) {
        this.handlePostChange('tags', tagIds);
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var data = moment(this.state.post.data, 'DD/MM/YYYY').format('YYYY-MM-DD');
        var post = Object.assign({}, this.state.post, {data});
        console.log(data);
        postJson('/api/post/submit', post).then(function (data) {
            alert(data.message);
            if (data.success)
                browserHistory.goBack();
        });
    },
    render: function() {
        return (
            <section>
                <h1>Inserir novo Post</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Título</label>
                        <input className="form-control" type="text"
                               value={this.state.post.titulo}
                               onChange={this.handleTituloChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Corpo</label>
                        <textarea className="form-control"
                                  value={this.state.post.corpo}
                                  onChange={this.handleCorpoChange}/>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="form-group">
                                <label>Autor</label>
                                <input className="form-control" type="text"
                                       value={this.state.post.autor}
                                       onChange={this.handleAutorChange}/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label>Data</label>
                                <input className="form-control" type="text"
                                       value={this.state.post.data}
                                       onChange={this.handleDataChange} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <TagSelector onChange={this.handleTagsChange} />
                        </div>
                    </div>
                    <p><button type="submit" className="btn btn-success pull-right">Salvar</button></p>
                </form>
            </section>
        )
    }
});
