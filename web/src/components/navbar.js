/**
 * Created by lucas on 06/04/16.
 */
import React from 'react';
import {Link} from 'react-router';
import TetherComponent from 'react-tether';
import {authenticator} from './../athentication';

var NavItem = React.createClass({
    render () {
        return (
            <li><Link {...this.props} activeClassName="active">{this.props.children}</Link></li>
        )
    }
});

var LoginForm = React.createClass({
    getInitialState: function () {
        return {isLogged: false, user: null};
    },
    componentDidMount: function () {
        authenticator.onLoginSuccess(function (user) {
            this.setState({isLogged: true, user: user});
        }.bind(this));

        authenticator.fetchUser().then(function (user) {
            this.setState({isLogged: true, user});
        }.bind(this));
    },
    handleSubmit: function (e) {
        e.preventDefault();
        let {login, senha} = this.refs;

        authenticator.requestLogin(login.value, senha.value);
    },
    logout: function () {
        authenticator.logout();
        this.setState({isLogged: false});
    },
    render: function() {
        if (this.state.isLogged) {
            let username = this.state.user.nome;
            return (
                <div>
                    <p>{username}</p>
                    <p><button onClick={this.logout}>Logout</button></p>
                </div>
            );
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label className="control-label">Login</label>
                    <input type="text" className="form-control" ref="login" />
                </div>
                <div className="form-group">
                    <label className="control-label">Senha</label>
                    <input type="password" className="form-control" ref="senha" />
                </div>
                <p className="clearfix">
                    <button type="submit" className="btn btn-default pull-right">
                        Login
                    </button>
                </p>
            </form>
        );
    }
});

var Authenticator = React.createClass({
    getInitialState: function () {
        return {showBox: false};
    },
    toggleBox: function () {
        this.setState({showBox: !this.state.showBox});
    },
    render: function () {
        let {showBox} = this.state;
        return (
            <TetherComponent attachment="top right" targetAttachment="bottom right">
                <ul className="navbar navbar-nav">
                    <li id="authBtn" onClick={this.toggleBox}><a className="btn btn-link">Login</a></li>
                </ul>
                {showBox && <div className="authBox">
                    <LoginForm />
                </div>}
            </TetherComponent>
        )
    }
});

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
                    <ul className="nav navbar-nav pull-right">
                        <li><Authenticator /></li>
                    </ul>
                </div>
            </nav>
        )
    }
});

export default Navbar;