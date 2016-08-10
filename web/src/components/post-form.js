/**
 * Created by lucas on 04/05/16.
 */

import React from 'react';
import {TagSelector} from './../components/tags';
import FormMixin from './forms';

export default React.createClass({
    mixins: [FormMixin],
    loadUrl: '/api/post/edit',
    submitUrl: '/api/post/submit',
    render: function() {
        var model = this.state.model;
        return (
            <section>
                <h1>Inserir novo Post</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Título</label>
                        <input className="form-control" type="text"
                               value={model.titulo}
                               onChange={this.handleTextFieldChange('titulo')}
                        />
                    </div>
                    <div className="form-group">
                        <label>Título</label>
                        <input className="form-control" type="text"
                               value={model.titulo}
                               onChange={this.handleTextFieldChange('titulo')}
                        />
                    </div>                    <div className="form-group">
                        <label>Corpo</label>
                        <textarea className="form-control"
                                  value={model.corpo}
                                  onChange={this.handleTextFieldChange('corpo')}/>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="form-group">
                                <label>Autor</label>
                                <input className="form-control" type="text"
                                       value={model.autor}
                                       onChange={this.handleTextFieldChange('autor')}/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label>Data</label>
                                <input className="form-control" type="text"
                                       value={model.data}
                                       onChange={this.handleTextFieldChange('data')} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <TagSelector onChange={this.handleSelect2Change('tags')} />
                        </div>
                    </div>
                    <p><button type="submit" className="btn btn-success pull-right">Salvar</button></p>
                </form>
            </section>
        )
    }
});
