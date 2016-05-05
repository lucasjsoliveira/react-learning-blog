/**
 * Created by lucas on 06/04/16.
 */
import React from 'react';
import {fetchJson} from './../fetch-json';
import {TagList} from './../components/tags';

var Tags = React.createClass({
    getInitialState() {
        return {tags: []}
    },
    componentDidMount() {
        fetchJson('/api/tag/').then(function (data) {
            this.setState({tags: data});
        }.bind(this))
    },
    render() {
        return (
            <section>
                <h1>Tags Cadastradas</h1>
                <TagList tags={this.state.tags} />
            </section>
        )
    }
});

export default Tags