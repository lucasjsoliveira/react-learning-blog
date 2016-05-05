/**
 * Created by lucas on 06/04/16.
 */
import React from 'react';
import {Link} from 'react-router';

var NavItem = React.createClass({
    render () {
        return (
            <li><Link {...this.props} activeClassName="active">{this.props.children}</Link></li>
        )
    }
}
);
var Navbar = React.createClass({
    render() {
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">Blog do React!</Link>
                    </div>
                        <ul className="nav navbar-nav">
                            <NavItem to="/tags">Tags</NavItem>
                            <NavItem to="/about">Sobre</NavItem>

                        </ul>
                </div>
            </nav>
        )
    }
});

export default Navbar;