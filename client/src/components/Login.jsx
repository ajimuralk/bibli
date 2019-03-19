import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
// import { Route, Link } from 'react-router-dom';
// import SignUp from './SignUp';


class Login extends Component {
  render() {
    return (
      <div>
        <h2>Log In</h2>
        <form>
          <Form.Group>
          <Form.Control
            type="text"
            placeholder="email"
            size="sm"
            ref={self => {
              this.emailInput = self;
            }}
          />
          <Form.Control
            type="password"
            size="sm"
            placeholder="password"
            ref={self => {
              this.passwordInput = self;
            }}
          />
          <Button
            type="button"
            variant="outline-primary"
            size="sm"
            block
            onClick={() => {
              this.props.login(this.emailInput.value, this.passwordInput.value);
            }}
          >
            Log In
          </Button>
          </Form.Group>
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
