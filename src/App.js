import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Calibrate from './components/pages/Calibrate';
import AuthState from './context/auth/AuthState';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/calibrate" component={Calibrate} />
            </Switch>
          </div>
        </div>
      </Router>
    </AuthState>
  );
};

export default App;