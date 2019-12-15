import React from 'react';
// import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Signupform from './Component/Signup';
import Loginform from './Component/Login';
import Home from './Component/Home';
import Welcome from './Component/Welcome';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={Signupform} />
          <Route path="/login" exact component={Loginform} />
          <Route path="/welcome" exact component={Welcome} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
