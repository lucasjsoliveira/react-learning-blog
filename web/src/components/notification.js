/**
 * Created by lucas on 10/05/16.
 */
import React from 'react';

export var notificationTypes = {
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'danger'
};

export var notification =  {
    add(text, type = notificationTypes.SUCCESS) {},
    setAdd: function (fn) {
        this.add = fn;
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
        return {notifications: []};
    },
    addNotification: function(text, type = notificationTypes.SUCCESS) {
        if (!text)
            return;
        var notifications = [... this.state.notifications, {type, text}];
        console.log(notifications);
        this.setState({notifications});
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