import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
          block
          onClick={() => {
            this.props.login(this.emailInput.value, this.passwordInput.value);
          }}
        >
          LOG IN
        </Button>
      </Form.Group>
    );
  }
}

export default LoginForm;
