### Goal

This project is an example of one possible authentication flow using [react](https://github.com/facebook/react), [redux](https://github.com/rackt/redux), [react-router](https://github.com/rackt/react-router), [redux-router](https://github.com/rackt/redux-router), and [JSON web tokens (JWT)](http://jwt.io/). It is based on the implementation of a [higher-order component](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750)
to wrap protected views and perform authentication logic prior to rendering them.

**Note:** The focus here is on the client-side flow. The server included in this example is for demonstration purposes only.
It contains some hard-coded API endpoints and is obviously not intended for any
kind of production environment.

---

### Running the Example Locally
````
1. git clone https://github.com/joshgeller/react-redux-jwt-auth-example.git
2. npm install
3. export NODE_ENV=development
4. node server.js
````
Then visit `localhost:3000` in your browser.

---

### General Flow

The overall flow goes something like this:

1. The log in form dispatches an action creator which triggers a POST to the server
2. The server validates login credentials and returns a valid JWT or 401 Unauthorized response as needed
3. The original action creator parses the server response and dispatches success or failure actions accordingly
4. Success actions trigger an update of the auth state, passing along the token and any decoded data from the JWT payload
5. A higher-order authentication component receives the new auth state as props
6. If authentication was successful, the higher-order component renders its child component and passes the auth props down to it
7. Before mounting, the child fetches data from the server using the token it received from its parent wrapper

Taking a look at the code should make this more clear!

---

### How It Works

This example uses [redux-auth-wrapper](https://github.com/mjrussell/redux-auth-wrapper) to provide a higher-order component
to check for authentication. The config options are passed to the library in `utils/index.js` which then exports a function to create
the authentication-protected component. The function takes a single argument: a child component it will wrap.


```javascript
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { pushState } from 'redux-router';

export const requireAuthentication = UserAuthWrapper({
  authSelector: state => state.auth,
  predicate: auth => auth.isAuthenticated,
  // convert history location descriptor from 2.0 to 1.0
  redirectAction: ({ pathname, query }) => {
    if (query.redirect) {
      return pushState(null, `${pathname}?next=${query.redirect}`)
    } else {
      return pushState(null, pathname)
    }
  },
  wrapperDisplayName: 'UserIsJWTAuthenticated'
})
```
A glance at `routes/index.js` shows you how to wrap a view or component using this function:

```javascript
import {HomeView, LoginView, ProtectedView} from '../views';
import { requireAuthentication } from '../utils';

export default(
    <Route path='/' component={App}>
        <IndexRoute component={HomeView}/>
        <Route path="login" component={LoginView}/>
        <Route path="protected" component={requireAuthentication(ProtectedView)}/>
    </Route>
);
```

When we call `requireAuthentication(ProtectedView)`, we create an instance of `AuthenticatedComponent` and pass along our `ProtectedView` as an argument. `AuthenticatedComponent` connects to the Redux store, subscribing to the appropriate authentication state variables. It then handles authentication logic in its lifecycle methods to ensure that the protected component is not rendered if the store does not indicate successful authentication.
