import React from 'react';
import Navbar from './components/navbar';
import {Notifications} from './components/notification';
import DevTools from 'mobx-react-devtools';

export default class App extends React.Component {
    render() {
        var devToolsPosition = {right: 5, bottom: 0};
        return (
            <div>
                <DevTools position={devToolsPosition}/>
                <Navbar />
                <Notifications />
                <div className="container">{this.props.children}</div>
            </div>
        )
    }
}