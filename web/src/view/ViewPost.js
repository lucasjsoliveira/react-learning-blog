/**
 * Created by lucas on 15/04/16.
 */
import React from 'react';
import {Post} from './../components/posts';
import postAPI from './../api/post';
import {observer} from 'mobx-react';
import FormStore from './../components/FormStore';

@observer
class ViewPost extends React.Component {
    componentDidMount() {
        this.store = new FormStore((id)=> postAPI.load(id, true));
        this.store.load(this.props.params.id);
    }
    render () {
        return (
            <section>
                {this.store.isLoading ? '' : <Post post={this.store.getModel()} linkToPost={false} />}
            </section>
        )
    }
}

export default ViewPost;