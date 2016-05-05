/**
 * Created by lucas on 14/04/16.
 */
import React from 'react';
import Select2 from 'react-select2-wrapper';
import {fetchJson} from './../fetch-json';

var TagLink = React.createClass({
    render() {
        return (
            <a className="tag-btn" href="">{this.props.tag.tag}</a>
        )
    }
});

var TagList = React.createClass({
    render () {
        return (
            <section className="tag-list">
                {this.props.tags.map(function (tag) {
                    return <TagLink key={tag.id} tag={tag} />
                })}
            </section>
        )
    }
});

var TagSelector = React.createClass({
    getInitialState() {
        return {data: []};
    },
    componentDidMount() {
        fetchJson('/api/tag/').then(function (data) {
            var tags = data.map(e => ({id: e.id, text: e.tag}));
            this.setState({data: tags});
        }.bind(this))
    },
    handleChange(e) {
        var ids = [];
        var els = e.target.querySelectorAll('option:checked');
        [...els].forEach(function (el) {
            ids.push(parseInt(el.value));
        });

        if (this.props.onChange)
            this.props.onChange(ids);
    },
    render() {
        var options = {
            multiple: 'multiple'
        };
        return (
            <Select2 className="form-control" onChange={this.handleChange} options={options} data={this.state.data} />
        )
    }
});

export {
    TagList,
    TagSelector
}