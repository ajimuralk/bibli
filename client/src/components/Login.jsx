import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <form>
        <input
          type="text"
          ref={self => {
            this.emailInput = self;
          }}
        />
        <input
          type="password"
          ref={self => {
            this.passwordInput = self;
          }}
        />
        <button
          type="button"
          onClick={() => {
            this.props.login(this.emailInput.value, this.passwordInput.value);
          }}
        >
          Log In
        </button>
      </form>
    );
  }
}

export default Login;
