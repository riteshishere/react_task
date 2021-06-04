import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Header } from './components/Header'

import { Auth } from './components/Auth'
function App() {
  return (
    <Router>
      <Route render={({history})=> <Header history={history} />} />
      <Route path="/auth" component={Auth} />
    </Router>
  );
}

export default App;
