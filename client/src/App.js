import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import PrivateRoute from './components/privateRoute';
import UserContent from './components/userContent';
import PublicHome from './components/routes/publicHome';
import Register from './components/routes/register';
import Login from './components/routes/login';

import './ant.less';
import './App.scss';

// Splash landing page
// Login Link
// Register Link

class App extends Component {
  constructor(props) {
    super();
    this.state = { isLoggedIn: false, user: null }
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

  // Home page:
  // - If not logged in, show public home page
  // - Else, show dashboard
  render() {
    return(
      <Router>
        <Switch>
          <Route exact path="/login" render={(props) => <Login {...props} login={this.login}/>} />
          <Route exact path="/register" component={Register}/>
          <Route exact path="/" component={PublicHome} />
          <PrivateRoute path="/:userContent" isLoggedIn={this.state.isLoggedIn} component={UserContent} />
        </Switch>
      </Router>
    );
  }
}

export default App;
