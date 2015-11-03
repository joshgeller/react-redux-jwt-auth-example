import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { Link }               from 'react-router';

const actionCreators = {
  increment : () => ({ type : 'COUNTER_INCREMENT' })
};

const mapStateToProps = (state) => ({
  counter : state.counter,
  routerState : state.router
});
const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});
export class HomeView extends React.Component {
  static propTypes = {
    actions  : React.PropTypes.object,
    counter  : React.PropTypes.number
  }

  render () {
    return (

            <h1>React Redux Auth Example</h1>
            <p>Attempt to access some <Link to='/protected'>protected content.</Link></p>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
