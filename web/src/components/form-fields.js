/**
 * Created by lucas on 23/09/16.
 */

import {observer, PropTypes} from 'mobx-react';
import React from 'react';

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



export {
    ReactiveInput,
    ReactiveTextArea
}