import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {App} from 'containers';
import {HomeView, LoginView, ProtectedView} from 'views';
import {requireAuthentication} from 'components/AuthenticatedComponent';

export default(
    <Route path='/' component={App}>
        <IndexRoute component={HomeView}/>
        <Route path="login" component={LoginView}/>
        <Route path="protected" component={requireAuthentication(ProtectedView)}/>
    </Route>
);
