/**
 * Created by lucas on 06/04/16.
 */
import React from 'react';
import {PostList} from './../components/posts';
import {LoadingSpinner} from './../components/ui';
import {Link} from 'react-router';
import {Paginator} from './../components/ui';
import {observer} from 'mobx-react';
import homeStore from './HomeStore';

@observer
class Home extends React.Component {
    render () {
        var {store} = this.props;
        if (store.isLoading)
            return (<LoadingSpinner />);

        return (
            <section>
                <h1>Posts</h1>
                <Link to="/new/" className="btn btn-default">Novo Post</Link>
                {store.isLoading ?
                (<LoadingSpinner/>) :
                (
                    <div>
                        <PostList store={store} />
                        <Paginator store={store} />
                    </div>
                )}
            </section>
        );
    }
}

class HomePage extends React.Component {
    componentDidMount() {
        homeStore.fetchPosts();
    }
    render() {return (
        <Home store={homeStore} />
    )}
}

export default HomePage;