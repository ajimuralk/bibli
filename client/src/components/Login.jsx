import React, { Component } from 'react';
// import { Route, Link } from 'react-router-dom';
// import SignUp from './SignUp';


class Login extends Component {
  render() {
    return (
      <div>
        <h2>Log In</h2>
        <form>
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
              this.props.login(this.emailInput.value, this.passwordInput.value);
            }}
          >
            Log In
          </button>
        </form>
        {/* <Link to='/signup'> Sign Up </Link>
        <Route
            path="/signup"
            render={() => (<SignUp signUp={this.props.signUp} />)}
          /> */}
      </div>
    );
  }
}

export default Login;
