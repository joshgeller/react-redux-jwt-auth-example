import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';

export class ProtectedView extends React.Component {

    componentWillMount () {
        this.fetchData();
    }

    fetchData () {
        let token = this.props.token;
        this.props.actions.fetchProtectedData(token);
    }

    render () {
        return (
            <div>
                {this.props.isFetching === true
                    ? <h1>Loading data...</h1>
                    : <div>
                        <h1>Welcome back,
                            {this.props.userName}!</h1>
                        <h3>{this.props.data}</h3>
                    </div>
    }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    data: state.data.data,
    isFetching: state.data.isFetching
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedView);
