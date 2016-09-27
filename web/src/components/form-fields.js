/**
 * Created by lucas on 23/09/16.
 */

import {observer, PropTypes} from 'mobx-react';
import {observable} from 'mobx';
import React from 'react';
import Select2 from 'react-select2-wrapper';

@observer
class ReactiveInput extends React.Component {
    static propTypes = {
        store: PropTypes.observableObject
    };

    render() {
        let {className, store, field} = this.props;
        return (
            <input type="text"
                   value={store.getValue(field)} className={className}
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
            <textarea value={store.getValue(field)}
                   onChange={store.handleTextFieldChange(field)} className={className}/>
        )
    }
}

class Select2Store {
    @observable options = [];
    apiFn = null;
    mapFn = null;

    constructor(apiFn, mapFn) {
        this.apiFn = apiFn;
        this.mapFn = mapFn;
    }

    getOptions() {
        this.apiFn().then(function (data) {
            this.options = data.map(this.mapFn);
        }.bind(this));
    }
}

@observer
class ReactiveSelect2 extends React.Component {
    selectStore = null;
    static propTypes = {
        store: PropTypes.observableObject,
        apiFn: React.PropTypes.func,
        mapFn: React.PropTypes.func
    };

    componentWillMount() {
        this.selectStore = new Select2Store(this.props.apiFn, this.props.mapFn);
        this.selectStore.getOptions();
    }

    render() {
        let props = Object.assign({}, this.props);
        let propsVal = this.props.value;
        props.value = (typeof propsVal !== 'undefined' && propsVal !== '') ? propsVal : [];
        delete props.store;
        delete props.apiFn;
        delete props.mapFn;
        let data = this.selectStore.options.toJS();
        let {store} = this.props;
        return (
            <Select2 {...props} data={data} value={store.getValue('tags').slice()}
                     onChange={store.handleSelect2Change('tags')}/>
        )
    }
}



export {
    ReactiveInput,
    ReactiveTextArea,
    ReactiveSelect2
}