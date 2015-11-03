import React from 'react';

export default class ProtectedView extends React.Component {

  render () {

    return (
      <div>
        <h1>Welcome back, {this.props.isAuthenticated}!</h1>
    </div>
    );
  }

}
