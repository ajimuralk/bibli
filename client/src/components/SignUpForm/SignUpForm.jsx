import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class SignUp extends Component {
  render() {
    return (
      <div>
        <Form.Group className="signup__form">
          <Form.Control
            type="text"
            className="signup-input"
            placeholder="first name"
            ref={self => {
              this.firstNameInput = self;
            }}
          />
          <Form.Control
            type="text"
            className="signup-input"
            placeholder="last name"
            ref={self => {
              this.lastNameInput = self;
            }}
          />
          <Form.Control
            type="text"
            className="signup-input"
            placeholder="email"
            ref={self => {
              this.emailInput = self;
            }}
          />
          <Form.Control
            type="password"
            className="signup-input"
            placeholder="password"
            ref={self => {
              this.passwordInput = self;
            }}
          />
          <Button
            type="button"
            className="button__signup"
            onClick={() => {
              this.props.signUp(
                this.firstNameInput.value,
                this.lastNameInput.value,
                this.emailInput.value,
                this.passwordInput.value
              );
            }}
          >
            SIGN UP
          </Button>
          <Link to="/login">
            <Button type="button" className="button__cancel">CANCEL</Button>
          </Link>
        </Form.Group>
      </div>
    );
  }
}

export default SignUp;
