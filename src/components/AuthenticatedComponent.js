import React from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

export function requireAuthentication(Component) {

  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      if (!this.props.isAuthenticated) {
          this.props.dispatch(pushState(null, '/login'));
      }
    }

    render () {
      return (
        <Component
          isAuthenticated={this.props.isAuthenticated}
          />
      )
    }
  }

  const mapStateToProps =
   (state) => ({
    isAuthenticating : state.auth.isAuthenticating,
  });

  return connect(mapStateToProps)(AuthenticatedComponent);

}
