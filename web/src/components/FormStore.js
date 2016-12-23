/**
 * Created by lucas on 20/07/16.
 */

import React from 'react';
import {browserHistory} from 'react-router';
import {notification, notificationTypes} from './notification';
import {observable, asMap, toJS} from 'mobx';

class FormStore {
    @observable loadFn = null;
    @observable submitFn = null;
    @observable edit = null;
    @observable model = asMap();
    afterLoad = null;

    constructor(loadFn, submitFn) {
        this.loadFn = loadFn;
        this.submitFn = submitFn;
    }
    getModel() {
        return toJS(this.model)
    }
    handleModelChange(prop, val) {
        this.model.set(prop, val);
        // console.log(this.getModel().entries());
    }
    handleTextFieldChange(fieldName) {
        return function (e) {
            this.handleModelChange(fieldName, e.target.value);
        }.bind(this);
    }
    handleValueChange(fieldName) {
        return function (value) {
            this.handleModelChange(fieldName, value);
        }.bind(this);
    }
    load(id) {
        this.loadFn(id).then(function (data) {
            this.model = asMap(data);
            if (this.afterLoad) {
                this.afterLoad(data);
            }
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