/**
 * Created by lucas on 20/07/16.
 */

import React from 'react';
import {fetchJson, postJson} from './../fetch-json';
import {browserHistory} from 'react-router';
import {notification, notificationTypes} from './notification';

var FormMixin = {

    // propTypes: {
    //     loadUrl: React.PropTypes.string.isRequired,
    //     submitUrl: React.PropTypes.string.isRequired,
    //     submitOn: React.PropTypes.func.isRequired,
    //     edit: React.PropTypes.number
    // },
    getInitialState: function () {
        return {model: {}};
    },
    getModel() {
        return this.getState().model
    },
    handleModelChange(prop, val) {
        var model = Object.assign({}, this.state.model);
        model[prop] = val;
        this.setState({model});
    },
    handleTextFieldChange(fieldName) {
        return function (e) {
            this.handleModelChange(fieldName, e.target.value);
        }.bind(this);
    },
    handleSelect2Change(fieldName) {
        return function (values) {
            this.handleModelChange(fieldName, values);
        }.bind(this);
    },
    load(id) {
        fetchJson(`${this.loadUrl}?id=${id}`).then(function (data) {
            this.setState({model: data});
        }.bind(this))
    },
    submit() {
        var model = this.state.model;
        postJson(this.submitUrl, model).then(function (data) {
            notification.add(data.message, data.success ? notificationTypes.SUCCESS : notificationTypes.WARNING);
            if (data.success)
                browserHistory.goBack();
        });
    },
    componentDidMount: function () {
        // Bind de submit ao evento passado
        if (this.props.submitOn) {
            this.props.submitOn(function () {
                this.submit()
            }.bind(this))
        }

        // Caso tenha sido definido id de registro a carregar, chamar load
        if (this.props.edit)
            this.load(this.props.edit);
    }
};

export default FormMixin;