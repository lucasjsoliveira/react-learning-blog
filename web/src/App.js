import React from 'react';
import Navbar from './components/navbar';
import {Notifications} from './components/notification';
export default class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <Notifications />
                <div className="container">{this.props.children}</div>
            </div>
        )
    }
}