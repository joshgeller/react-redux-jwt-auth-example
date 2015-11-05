import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import routes from '../routes';
import {reduxReactRouter} from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';
import {applyMiddleware, compose, createStore} from 'redux';
import createLogger from 'redux-logger';

export default function configureStore(initialState) {
    let createStoreWithMiddleware;

    const logger = createLogger();

    const middleware = applyMiddleware(thunk, logger);

    createStoreWithMiddleware = compose(
     middleware,
     reduxReactRouter({routes, createHistory})
    );

    const store = createStoreWithMiddleware(createStore)(rootReducer, initialState);

    if (module.hot) {
        module.hot
            .accept('../reducers', () => {
                const nextRootReducer = require('../reducers/index');
                store.replaceReducer(nextRootReducer);
            });
    }

    return store;

}
