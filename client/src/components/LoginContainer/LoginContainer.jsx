import React from 'react';
import Image from 'react-bootstrap/Image';
import logo from '../../assets/bibli-logo-b-darkgray-01.png';
import { Switch, Route, Link } from 'react-router-dom';
import SignUpForm from '../SignUpForm/SignUpForm';
import LoginForm from '../LoginForm/LoginForm';

const Login = props => {
  const {
    errMsg,
    successMsg,
    signUp,
    toggleSignUp,
    login,
    signUpClicked
  } = props;
  return (
    <div className="login-container">
      {errMsg && <div className="login-error">{errMsg}</div>}

      {successMsg && <div className="success-message">{successMsg}</div>}

      <Image className="login__logo" src={logo} />
      <h1 className="login__h1">b i b l i</h1>

      <Switch>
        <Route
          path="/login/new"
          render={() => (
            <SignUpForm signUp={signUp} toggleSignUp={toggleSignUp} />
          )}
        />
        <LoginForm login={login} />
      </Switch>

      {!signUpClicked && (
        <Link
          className="signup-link"
          to="/login/new"
          onClick={() => toggleSignUp()}
        >
          Sign Up
        </Link>
      )}
    </div>
  );
};

export default Login;
