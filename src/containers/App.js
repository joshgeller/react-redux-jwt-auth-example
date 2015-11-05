import React from 'react';
import {Navbar, NavBrand, Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logoutAndRedirect} from 'actions';

import 'styles/core.scss';

@connect((state) => {
    return {
     isAuthenticated: state.auth.isAuthenticated
    };
})
export default class CoreLayout extends React.Component {

    render () {

        const {dispatch} = this.props;

        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container">
                        <div className="navbar-header">
                            <Link className="navbar-brand" to="/">React Redux JWT Auth Example</Link>
                        </div>
                        <div id="navbar">
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to="/protected">Protected Content</Link></li>
                                <li><Link to="/login">Login</Link></li>
                                {this.props.isAuthenticated
                                 ? <li><a href='#' onClick={() => this.props.dispatch(logoutAndRedirect())}>Logout</a> </li>
                                 : ''
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xs-12'>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
