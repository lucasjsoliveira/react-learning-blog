/**
 * Created by lucas on 04/05/16.
 */

import React from 'react';
import {TagSelector} from './../components/tags';
import postApi from './../api/post';
import {observer} from 'mobx-react';

@observer
class PostForm extends React.Component {
    componentDidMount() {
        let {store} = this.props;

        store.loadFn = (id) => postApi.load(id);
        store.submitFn = (model) => postApi.submit(model);
    }
    render() {
        let {store} = this.props;
        return (
            <section>
                <h1>Inserir novo Post</h1>
                <form onSubmit={(e) => store.handleFormSubmit(e)}>
                    <div className="form-group">
                        <label>Título</label>
                        <input className="form-control" type="text"
                               value={store.getValue('titulo')}
                               onChange={store.handleTextFieldChange('titulo')}
                        />
                    </div>
                    <div className="form-group">
                        <label>Título</label>
                        <input className="form-control" type="text"
                               value={store.getValue('titulo')}
                               onChange={store.handleTextFieldChange('titulo')}
                        />
                    </div>                    <div className="form-group">
                    <label>Corpo</label>
                    <textarea className="form-control"
                              value={store.getValue('corpo')}
                              onChange={store.handleTextFieldChange('corpo')}/>
                </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="form-group">
                                <label>Autor</label>
                                <input className="form-control" type="text"
                                       value={store.getValue('autor')}
                                       onChange={store.handleTextFieldChange('autor')}/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label>Data</label>
                                <input className="form-control" type="text"
                                       value={store.getValue('data')}
                                       onChange={store.handleTextFieldChange('data')} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <TagSelector onChange={store.handleSelect2Change('tags')} />
                        </div>
                    </div>
                    <p><button type="submit" className="btn btn-success pull-right">Salvar</button></p>
                </form>
            </section>
        )
    }
}
export default PostForm;
