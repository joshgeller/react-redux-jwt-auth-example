import React from 'react';
import {Route, IndexRoute, NotFoundRoute} from 'react-router';
import {App} from '../containers';
import {HomeView, LoginView, ProtectedView, NotFoundView} from '../views';
import {requireAuthentication} from '../components/AuthenticatedComponent';

export default(
    <Route path='/' component={App}>
        <IndexRoute component={HomeView}/>
        <Route path="login" component={LoginView}/>
        <Route path="protected" component={requireAuthentication(ProtectedView)}/>
        <Route path="*" component={NotFoundView}/>
    </Route>
);
