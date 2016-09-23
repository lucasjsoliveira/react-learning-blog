/**
 * Created by lucas on 20/07/16.
 */

import React from 'react';
import {fetchJson, postJson} from './../fetch-json';
import {browserHistory} from 'react-router';
import {notification, notificationTypes} from './notification';
import {observable, extendObservable, asMap} from 'mobx';

class FormStore {
    @observable loadFn = null;
    @observable submitFn = null;
    @observable edit = null;
    @observable model = asMap();
    getModel() {
        return this.getState().model
    }
    handleModelChange(prop, val) {
        this.model.set(prop, val);
    }
    handleTextFieldChange(fieldName) {
        return function (e) {
            this.handleModelChange(fieldName, e.target.value);
        }.bind(this);
    }
    handleSelect2Change(fieldName) {
        return function (values) {
            this.handleModelChange(fieldName, values);
        }.bind(this);
    }
    load(id) {
        this.loadFn(id).then(function (data) {
            this.model = asMap(data);
        }.bind(this))
    }
    handleFormSubmit(e) {
        e.preventDefault();

        this.submit();
    }
    submit() {
        var model = this.model;
        this.submitFn(model).then(function (data) {
            notification.add(data.message, data.success ? notificationTypes.SUCCESS : notificationTypes.WARNING);
            if (data.success)
                browserHistory.goBack();
        });
    }
    getValue(key) {
        let model = this.model;
        return model.has(key) ? model.get(key) : '';
    }
}

export default FormStore;