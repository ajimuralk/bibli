import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import logo from '../../assets/bibli-logo-b-darkgray-01.png';
import { Switch, Route, Link } from 'react-router-dom';
import SignUpForm from '../SignUpForm/SignUpForm';
import LoginForm from '../LoginForm/LoginForm';

class Login extends Component {
  render() {
    return (
      <div className="login-container">

      {(this.props.errMsg) && (<div className="login-error">{this.props.errMsg}</div>)}

      {(this.props.successMsg) && (<div className="success-message">{this.props.successMsg}</div>) }

        <Image className="login__logo" src={logo} />
        <h1 className="login__h1">b i b l i</h1>

        <Switch>
          <Route
            path="/login/new"
            render={() => <SignUpForm signUp={this.props.signUp} toggleSignUp={this.props.toggleSignUp} />}
          />
          <LoginForm login={this.props.login} />
        </Switch>

        {!this.props.signUpClicked && (
          <Link
            className="signup-link"
            to="/login/new"
            onClick={() => this.props.toggleSignUp()}
          >
            Sign Up
          </Link>
        )}
      </div>
    );
  }
}

export default Login;
