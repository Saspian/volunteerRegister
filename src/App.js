import React from 'react';
// import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Signupform from './Component/Signup';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/signup" exact component={Signupform} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
