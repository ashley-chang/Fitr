import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange(e) {
  //   let email = this.props.form
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  // }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let {userName, password} = values;
        axios.post('/login', {
          email: userName,
          password
        }).then((res) => {
          // Signin either successful or unsuccessful (duplicate email)
          if (!res.data.error) {
            console.log('Successfully logged in');
            // set state as logged in (through function given in props)
            this.props.login(res.data.user.email);
            this.props.history.push("/");
          } else {
            console.log('Invalid credentials');
          }
        }).catch((err) => {
          console.log(`Error: ${err}`);
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item label="Email">
          {getFieldDecorator('userName')(
          // {getFieldDecorator('email', {
          //   rules: [{
          //     type: 'email',
          //     message: 'Please enter a valid email address.'
          //   }, {
          //     required: true,
          //     message: 'Please input your email address.',
          //   }]
          // })(
              <Input prefix={
                <Icon
                  type="user"
                  style={{ color: 'rgba(0,0,0,.25)'}}
                />
              } placeholder="Email Address" />
            )
        }
        </Form.Item>
        <Form.Item label="Password">
          {getFieldDecorator('password', {
            rules: [{
              required: true,
              message: 'Please input your password.'
            }]
          })(
            <Input prefix={<Icon type="lock" style={{ color:'rgba(0,0,0,.25)'}} />} type="password" placeholder="Password" />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">Register</a>
        </Form.Item>
      </Form>
    );

  }
}

const WrappedLogin = Form.create({name: 'login'})(Login);
export { WrappedLogin as default };
