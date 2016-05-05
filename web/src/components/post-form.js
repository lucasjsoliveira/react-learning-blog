/**
 * Created by lucas on 04/05/16.
 */

import React from 'react';
import {browserHistory} from 'react-router';
import moment from 'moment';
import {postJson} from './../fetch-json';
import {TagSelector} from './../components/tags';

export default React.createClass({
    handleTituloChange: function(e) {
        this.props.setPostProperty({titulo: e.target.value});
    },
    handleCorpoChange: function(e) {
        this.props.setPostProperty({corpo: e.target.value});
    },
    handleAutorChange: function(e) {
        this.props.setPostProperty({autor: e.target.value});
    },
    handleDataChange: function(e) {
        this.props.setPostProperty({data: e.target.value});
    },
    handleTagsChange: function (tagIds) {
        this.props.setPostProperty({tags: tagIds});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var post = Object.assign({}, this.state.post);
        post.data = moment(post.data, 'DD/MM/YYYY').format('YYYY-DD-MM');
        postJson('/api/post/submit', this.state.post).then(function (data) {
            alert(data.message);
            if (data.success)
                browserHistory.push('/');
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
