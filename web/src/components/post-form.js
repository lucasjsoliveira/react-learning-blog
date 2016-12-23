/**
 * Created by lucas on 04/05/16.
 */

import React from 'react';
import {ReactiveInput, ReactiveTextArea, ReactiveDatePicker, ReactiveSelect} from './../components/form-fields';
import postApi from './../api/post';
import FormStore from './../components/FormStore';
import {Button} from 'antd';
import tag from './../api/tag';

class PostForm extends React.Component {
    componentWillMount() {
        this.store = new FormStore((id) => postApi.load(id), (model) => postApi.submit(model));
    }
    componentDidMount() {
        const id = this.props.load;
        if (id)
            this.store.load(id);
    }
    render() {
        let store = this.store;
        return (
            <section>
                <h1>Inserir novo Post</h1>
                <form onSubmit={(e) => store.handleFormSubmit(e)}>
                    <div className="form-group">
                        <label>Título</label>
                        <ReactiveInput store={store} field="titulo" />
                    </div>
                    <div className="form-group">
                        <label>Corpo</label>
                        <ReactiveTextArea store={store} field="corpo" />
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="form-group">
                                <label>Autor</label>
                                <ReactiveInput store={store} field="autor" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label>Data</label>
                                <ReactiveDatePicker store={store} field="data"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Tags</label>
                                <ReactiveSelect multiple store={store} field="tags"
                                                apiFn={() => tag.listOptions()} />
                            </div>
                        </div>
                    </div>
                    <p><Button type="primary" htmlType="submit">Salvar</Button></p>
                </form>
            </section>
        )
    }
}
export default PostForm;
