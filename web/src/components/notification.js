/**
 * Created by lucas on 10/05/16.
 */
import React from 'react';
import EventManager from "../event-manager";

export var notificationTypes = {
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'danger'
};

var evManager = new EventManager();
export var notification =  {
    add(text, type = notificationTypes.SUCCESS) {
        evManager.notify({text, type});
    },
    onAdd: function (fn) {
        return evManager.addListener(fn);
    },
    removeListener: function (index) {
        evManager.removeListener(index, 1);
    }
};

var Notification = (props) => (
    <div className={'alert alert-' + props.type}>
        <div className="clearfix">
            {props.text}
            <a className="btn pull-right" onClick={props.onCloseClick}>
                <span className="glyphicon glyphicon-remove"></span>
            </a>
        </div>

    </div>
);

export var Notifications = React.createClass({
    getInitialState: function () {
        return {notifications: [], listenerIdx: null};
    },
    componentDidMount: function () {
        var listenerIdx = notification.onAdd(function (n) {
            var notifications = this.state.notifications;
            notifications.push(n);
            this.setState({notifications});
        }.bind(this));
        this.setState({listenerIdx});
    },
    componentWillUnmount: function () {
        notification.removeListener(this.state.listenerIdx);
    },
    removeNotification: function(index) {
        var notifications = this.state.notifications;

        notifications.splice(index, 1);
        this.setState({notifications});
    },
    render: function() {
        var notifications = this.state.notifications;
        return (
            <div className="container alert-container">
                {notifications.map((n, idx) => (<Notification key={idx} {... n} onCloseClick={() => {this.removeNotification(idx)}}/>))}
            </div>
        )
    }
});