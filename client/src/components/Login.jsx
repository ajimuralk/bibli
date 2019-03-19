import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import logo from '../assets/bibli-logo-b-darkgray-01.png';
import { Route, Link, Switch } from 'react-router-dom';
import SignUp from './SignUp';
import LoginForm from './LoginForm';

class Login extends Component {
  render() {
    return (
      <div className="login-container">
        <Image className="login__logo" src={logo} />

        {/* {this.props.signUpClicked && (
          <Route
            path="/login/new"
            render={() => <SignUp signUp={this.props.signUp} />}
          />
        )}

        <Switch>
        <Route
            path="/login"
            render={() => <LoginForm login={this.props.login} toggleSignUp={this.props.toggleSignUp} />}
          />
        </Switch> */}
{/* 
          <Route
            path="/login"
            render={() => <LoginForm login={this.props.login} toggleSignUp={this.props.toggleSignUp} />}
          /> */}
        

        {/* <Form.Group className="login__form">
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
        </Form.Group>
        <Link to="/login/new" onClick={this.props.toggleSignUp}>
          Sign Up
        </Link> */}
      </div>
    );
  }
}

export default Login;
