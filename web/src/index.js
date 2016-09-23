/**
 * Created by lucas on 06/04/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import App from './App';
import About from './view/About';
import Home from './view/Home';
import Tags from './view/Tags';
import NewPost from './view/NewPost';
import ViewPost from './view/ViewPost';
import EditPost from './view/EditPost';
import TagPosts from './view/TagPosts';
import {observer} from 'mobx-react';

// Polyfill ES6
require('es6-promise').polyfill();

@observer
class AppRouter extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Home}/>
                    <Route path="/about" component={About} />
                    <Route path="/tags" component={Tags} />
                    <Route path="/new" component={NewPost} />
                    <Route path="/edit/:id" component={EditPost} />
                    <Route path="/view/:id" component={ViewPost} />
                    <Route path="/posts/:tagId" component={TagPosts} />
                </Route>
            </Router>
        )
    }
}

ReactDOM.render(<AppRouter />, document.getElementById('app'));