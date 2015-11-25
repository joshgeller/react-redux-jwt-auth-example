import React from 'react/addons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import reactMixin from 'react-mixin';
import * as actionCreators from '../actions';

export class LoginView extends React.Component {

  constructor(props) {
    super(props);
    const redirectRoute = this.props.location.query.next || '/login';
    this.state = {
      email: '',
      password: '',
      redirectTo: redirectRoute
    };
  }

  login(e) {
      e.preventDefault();
      this.props.actions.loginUser(this.state.email, this.state.password, this.state.redirectTo);
  }

  render () {
    return (
      <div className='col-xs-12 col-md-6 col-md-offset-3'>
        <h3>Log in to view protected content!</h3>
        <p>Hint: hello@test.com / test</p>
        {this.props.statusText ? <div className='alert alert-info'>{this.props.statusText}</div> : ''}
        <form role='form'>
        <div className='form-group'>
            <input type='text'
              className='form-control input-lg'
              valueLink={this.linkState('email')}
              placeholder='Email' />
            </div>
          <div className='form-group'>
            <input type='password'
              className='form-control input-lg'
              valueLink={this.linkState('password')}
              placeholder='Password' />
          </div>
          <button type='submit'
            className='btn btn-lg'
            disabled={this.props.isAuthenticating}
            onClick={this.login.bind(this)}>Submit</button>
      </form>
    </div>
    );
  }
}

reactMixin(LoginView.prototype, React.addons.LinkedStateMixin);

const mapStateToProps = (state) => ({
  isAuthenticating   : state.auth.isAuthenticating,
  statusText         : state.auth.statusText
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
