import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// -> I will need a route for login, register, and dashboard.

import Login from './Routes/Login';
import Register from './Routes/Register';
import Dashboard from './Routes/Dashboard';
import PrivateRoute from './Routes/PrivateRoute';

export default function App() {
  return (
    <div>
      <Router>
        <h1>Top Secret Dad Jokes</h1>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/register' component={Register} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
        </Switch>
      </Router>
    </div>
  )
}
