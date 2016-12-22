/**
 * Created by lucas on 23/09/16.
 */

import {observer, PropTypes} from 'mobx-react';
import {observable} from 'mobx';
import {Input, DatePicker, Select} from 'antd';
import React from 'react';
import moment from 'moment';
let Option = Select.Option;

function handleDatePicker(e) {
    console.log(e);
}

@observer
class ReactiveInput extends React.Component {
    static propTypes = {
        store: PropTypes.observableObject
    };

    render() {
        let {className, store, field} = this.props;
        return (
            <Input value={store.getValue(field)} className={className}
                   onChange={store.handleTextFieldChange(field)}
            />
        )
    }
}

@observer
class ReactiveTextArea extends React.Component {
    static propTypes = {
        store: PropTypes.observableObject
    };

    render() {
        let {store, field, className} = this.props;
        return (
            <Input type="textarea" value={store.getValue(field)}
                   onChange={store.handleTextFieldChange(field)} className={className}/>
        )
    }
}

@observer
class ReactiveDatePicker extends React.Component {
    render() {
        let {store, field, className} = this.props;


        let stringValue = store.getValue(field);

        let value = (stringValue) ? moment(stringValue).toDate() : null;

        return (
            <div style={{display: 'block'}}>
                <DatePicker defaultValue={value} format="DD/MM/YYYY"
                            onChange={store.handleValueChange(field)} className={className}/>
            </div>
        )
    }
}

class Select2Store {
    @observable options = [];
    apiFn = null;

    constructor(apiFn) {
        this.apiFn = apiFn;
    }

    getOptions() {
        this.apiFn().then(function (data) {
            let options = [];
            Object.keys(data).forEach(function (key) {
                let option = (<Option key={key}>{data[key]}</Option>);
                options.push(option);
            });
            this.options.replace(options);
        }.bind(this));
    }
}

@observer
class ReactiveSelect extends React.Component {
    selectStore = null;
    static propTypes = {
        store: PropTypes.observableObject,
        apiFn: React.PropTypes.func
    };

    componentWillMount() {
        this.selectStore = new Select2Store(this.props.apiFn);
        this.selectStore.getOptions();
    }

    render() {
        let {store, field} = this.props;
        let value = store.getValue(field).slice();
        if (Array.isArray(value)) {
            value = value.map((val) => String(val));
        } else if (this.props.multiple)
            value = null;


        console.log(value, this.selectStore.options.slice());
        return (
            <Select style={{ width: '100%' }} placeholder="Please select" {...this.props}
                    onChange={store.handleValueChange(field)} value={value}>
                    {this.selectStore.options.slice()}
            </Select>
        );
    }
}



export {
    ReactiveInput,
    ReactiveTextArea,
    ReactiveSelect,
    ReactiveDatePicker
}