import React from 'react/addons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import reactMixin from 'react-mixin';
import * as actionCreators from '../actions/register';

class RegisterView extends React.Component {

  constructor(props) {
    super(props);
    const redirectRoute = this.props.location.query.next || '/login';
    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }

  register(e) {
    e.preventDefault();
    let {name, email, password} = this.state;
    this.props.actions.registerUser(name, email, password)
  }

  render() {
    return (
      <div className='col-xs-12 col-md-6 col-md-offset-3'>
        <h3>Register to create an account!</h3>
        {this.props.statusText
          ? <div className='alert alert-info'>{this.props.statusText}</div>
          : ''}
        <form role='form'>
          <div className='form-group'>
            <input type='text'
              className='form-control input-lg'
              valueLink={this.linkState('name')}
              placeholder='Name'
            />
          </div>
          <div className='form-group'>
            <input type='text'
              className='form-control input-lg'
              valueLink={this.linkState('email')}
              placeholder='Email'
            />
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
            onClick={this.register.bind(this)}
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}

reactMixin(RegisterView.prototype, React.addons.LinkedStateMixin);

const mapStateToProps = (state) => ({
  isRegistering: state.register.isAuthenticating,
  statusText: state.register.statusText
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);
