import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('sign up form email: ' + this.state.email);
    axios.post('/register', {
      email: this.state.email,
      password: this.state.password
    }).then((res) => {
      // Data went through -- either signup successful or duplicate email
      if (!res.data.error) {
        console.log('Signup successful.');
        // redirect to res.data.redirectUrl
      } else {
        console.log('email already taken.');
      }
      this.setState({ email: '', password: '' });
    }).catch((err) => {
      console.log(`${err}`)
    });
  }

  render() {
    return (
      <form>
        <label htmlFor="email">email</label>
        <input type="text"
              name="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange} />
        <label htmlFor="password">Password</label>
        <input type="password"
              name="password"
              id="password"
              value={this.state.password}
              onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }
}

export default Register;
