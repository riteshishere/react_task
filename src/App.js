import React from 'react'
import { Route } from 'react-router-dom'
import Header from './components/Header'

import { Auth } from './components/Auth'
function App() {
  return (
    <React.Fragment>
      <Header />
      <Route path="/auth" component={Auth} />
    </React.Fragment>
  );
}

export default App;
