import React from 'react';
import Navbar from './components/navbar';
import {notification, Notifications} from './components/notification';
export default class App extends React.Component {
    render() {
        function setAdd(component) {
            // Quando o componente é desmontado, é chamada a função ref com o parâmetro nulo
            notification.setAdd(component ? component.addNotification : null)
        }
        return (
            <div>
                <Navbar />
                <Notifications teste="valor" ref={setAdd} />
                <div className="container">{this.props.children}</div>
            </div>
        )
    }
}