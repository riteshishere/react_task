import React from 'react'
import { Route } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute'
import Header from './components/Header'

import { Auth } from './components/Auth'
import Dashboard from './components/Dashboard'
function App() {
  return (
    <React.Fragment>
      <Header />
      <Route path="/auth" component={Auth} />
      <PrivateRoute path="/" component={Dashboard} exact />
    </React.Fragment>
  );
}

export default App;
