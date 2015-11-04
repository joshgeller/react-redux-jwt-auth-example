import React from 'react';
import {connect} from 'react-redux';
import {pushState} from 'redux-router';

export function requireAuthentication(Component) {

    class AuthenticatedComponent extends React.Component {

        constructor (props) {
            super(props)
        }

        componentWillMount () {
            if (!this.props.isAuthenticated) {
                this.props
                    .dispatch(pushState(null, `/login?next=${this.props.location.pathname}`));
            }
        }

        render () {
            return (
                <Component {...this.props}/>
            )
        }
    }

    const mapStateToProps = (state) => ({
        token: state.auth.token,
        isAuthenticated: state.auth.isAuthenticated
    });

    return connect(mapStateToProps)
    (AuthenticatedComponent);

}
