import React from 'react';
import { Route, IndexRoute } from 'react-router';
import CoreLayout from 'layouts/CoreLayout';
import { HomeView, LoginView, ProtectedView } from 'views';
import {requireAuthentication} from 'components/AuthenticatedComponent';

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path="login" component={LoginView} />
    <Route path="protected" component={requireAuthentication(ProtectedView)}/>
  </Route>
);
