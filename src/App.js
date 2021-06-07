import React from 'react'
import { Route } from 'react-router-dom'
import Header from './components/Header'

import { Auth } from './components/Auth'
import Dashboard from './components/Dashboard'
function App() {
  return (
    <React.Fragment>
      <Header />
      <Route path="/auth" component={Auth} />
      <Route path="/" component={Dashboard} />
    </React.Fragment>
  );
}

export default App;
