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
import {store} from './redux-store';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {getPosts, getPost} from './redux-actions';

var history = syncHistoryWithStore(browserHistory, store);

var homeEnter = function () {
    store.dispatch(getPosts());
};

var viewEnter = function (nextState) {
    store.dispatch(getPost(nextState.params.id));
};

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="/about" component={About} />
                <Route path="/tags" component={Tags} />
                <Route path="/new" component={NewPost} />
                <Route path="/view/:id" component={ViewPost} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'));