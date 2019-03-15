import React, { Component } from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import axios from 'axios';

import PrivateRoute from './components/privateRoute';
import UserContent from './components/userContent';
// import PublicHome from './components/routes/publicHome';
import Register from './components/routes/register';
import Login from './components/routes/login';

import './App.scss';

// Splash landing page
// Login Link
// Register Link

class App extends Component {
  constructor(props) {
    super();
    this.state = { isLoggedIn: true, user: null }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {

  }

  login(user) {
    this.setState({ isLoggedIn: true, user: user});
  }

  // Accompany with server action (post)
  logout() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    return(
      <Router>
        <div>
          <Route exact path="/login" render={(props) => <Login {...props} login={this.login}/>} />
          <Route exact path="/register" component={Register}/>
          <PrivateRoute path="/" isLoggedIn={this.state.isLoggedIn} component={UserContent} />
        </div>
      </Router>
    );
  }
}

export default App;
