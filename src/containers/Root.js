import React from 'react';
import {Provider} from 'react-redux';
import routes from '../routes';
import {ReduxRouter} from 'redux-router';

export default class Root extends React.Component {

    static propTypes = {
        store: React.PropTypes.object.isRequired
    };

    render () {
        return (
            <div>
                <Provider store={this.props.store}>
                    <div>
                        <ReduxRouter>
                            {routes}
                        </ReduxRouter>
                    </div>
                </Provider>
            </div>
        );
    }
}
