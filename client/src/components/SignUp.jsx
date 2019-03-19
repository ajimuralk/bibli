import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class SignUp extends Component {
  render() {
    return (
      <div>

          <Form.Group>
          <Form.Control
            type="text"
            placeholder="first name"
            ref={self => {
              this.firstNameInput = self;
            }}
          />
          <Form.Control
            type="text"
            placeholder="last name"
            ref={self => {
              this.lastNameInput = self;
            }}
          />
          <Form.Control
            type="text"
            placeholder="email"
            ref={self => {
              this.emailInput = self;
            }}
          />
          <Form.Control
            type="password"
            placeholder="password"
            ref={self => {
              this.passwordInput = self;
            }}
          />
          <Button
            type="button"
            onClick={() => {
              this.props.signUp(
                this.firstNameInput.value,
                this.lastNameInput.value,
                this.emailInput.value,
                this.passwordInput.value
              );
            }}
          >
            Submit
          </Button>
          </Form.Group>
      </div>
    );
  }
}

export default SignUp;
