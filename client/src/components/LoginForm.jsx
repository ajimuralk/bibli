import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import logo from '../assets/bibli-logo-b-darkgray-01.png';
import { Route, Link } from 'react-router-dom';
import SignUp from './SignUp';

class LoginForm extends Component {
  render() {
    return (
        <Form.Group className="login__form">
          <Form.Control
            type="text"
            size="sm"
            className="login__form-input"
            placeholder="email"
            ref={self => {
              this.emailInput = self;
            }}
          />
          <Form.Control
            type="password"
            size="sm"
            className="login__form-input"
            placeholder="password"
            ref={self => {
              this.passwordInput = self;
            }}
          />
          <Button
            type="button"
            variant="outline-primary"
            className="login__button"
            size="sm"
            block
            onClick={() => {
              this.props.login(this.emailInput.value, this.passwordInput.value);
            }}
          >
            Submit
          </Button>

        <Link to="/login/new" onClick={this.props.toggleSignUp}>
          Sign Up
        </Link>
        </Form.Group>
    );
  }
}

export default LoginForm;


