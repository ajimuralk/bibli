import React, { Component } from 'react';

class SignUp extends Component {
  render() {
    return (
      <div>
        <h2>Sign Up</h2>
        <form>
          <input
            type="text"
            placeholder="first name"
            ref={self => {
              this.firstNameInput = self;
            }}
          />
          <input
            type="text"
            placeholder="last name"
            ref={self => {
              this.lastNameInput = self;
            }}
          />
          <input
            type="text"
            placeholder="email"
            ref={self => {
              this.emailInput = self;
            }}
          />
          <input
            type="password"
            placeholder="password"
            ref={self => {
              this.passwordInput = self;
            }}
          />
          <button
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
          </button>
        </form>
      </div>
    );
  }
}

export default SignUp;
