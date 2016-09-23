/**
 * Created by lucas on 14/04/16.
 */
import React from 'react';
import PostForm from './../components/post-form';
import FormStore from './../components/FormStore';
import postApi from './../api/post';
import {observer} from 'mobx-react';

let store = new FormStore((id) => postApi.load(id), (model) => postApi.submit(model));

@observer
class NewPost extends React.Component {
    componentDidMount() {
        var id = this.props.params.id;
        if (id)
            store.load(id);
    }
    render() {
        return (
            <PostForm store={store}/>
        )
    }
}

export default NewPost