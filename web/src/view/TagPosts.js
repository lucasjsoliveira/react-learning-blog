/**
 * Created by lucas on 10/05/16.
 */
import React from 'react';
import {PostList} from './../components/posts'
import {LoadingSpinner} from './../components/ui';
import {Paginator} from './../components/ui';
import postListStore from './PostListStore';
import {observer} from 'mobx-react';

@observer
class TagPosts extends React.Component {
    render() {
        var store = this.props.store;

        if (store.isLoading)
            return (<LoadingSpinner />);
        return (
            <div>
                <h1>{`Posts marcados como "${store.tagName}"`}</h1>
                <PostList store={store} />
                <Paginator store={store} />
            </div>
        )
    }
}

export default class TagPostsPage extends React.Component {
    componentDidMount() {
        postListStore.fetchPostsByTag(this.props.params.tagId);
    }
    render() {
        return (<TagPosts store={postListStore} />);
    }
}