/**
 * Created by lucas on 14/04/16.
 */
import React from 'react';
import {ReactiveSelect2} from './../components/form-fields';
import {Link} from 'react-router';
import tag from './../api/tag';
import {observer} from 'mobx-react';

var TagLink = (props) => (
    <Link className="tag-btn" to={'/posts/' + props.id}>{props.tag}</Link>
);

var TagList = React.createClass({
    render () {
        return (
            <section className="tag-list">
                {this.props.tags.map(function (tag) {
                    return <TagLink key={tag.id} {...tag} />
                })}
            </section>
        )
    }
});

export {
    TagList
}