import React from 'react';

export default class ProtectedView extends React.Component {

  componentWillMount() {
    // dispatch action to fetch protected data from stores
  }

  render () {

    return (
      <div>
        <h1>Welcome back, {this.props.token}!</h1>
      </div>
    );
  }

}
