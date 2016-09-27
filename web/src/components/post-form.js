/**
 * Created by lucas on 04/05/16.
 */

import React from 'react';
import {TagSelector} from './../components/tags';
import {observer} from 'mobx-react';
import {ReactiveInput, ReactiveTextArea} from './../components/form-fields';

@observer
class PostForm extends React.Component {
    render() {
        let {store} = this.props;
        return (
            <section>
                <h1>Inserir novo Post</h1>
                <form onSubmit={(e) => store.handleFormSubmit(e)}>
                    <div className="form-group">
                        <label>Título</label>
                        <ReactiveInput className="form-control" store={store} field="titulo" />
                    </div>
                    <div className="form-group">
                        <label>Corpo</label>
                        <ReactiveTextArea className="form-control" store={store} field="corpo" />
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="form-group">
                                <label>Autor</label>
                                <ReactiveInput className="form-control" store={store} field="autor" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label>Data</label>
                                <ReactiveInput className="form-control" store={store} field="data"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <TagSelector store={store} />
                        </div>
                    </div>
                    <p><button type="submit" className="btn btn-success pull-right">Salvar</button></p>
                </form>
            </section>
        )
    }
}
export default PostForm;
