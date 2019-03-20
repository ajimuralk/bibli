import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home/Home';
import LoginContainer from './components/LoginContainer/LoginContainer';
import Nearby from './components/Nearby/Nearby';
import './global-styles/global.css';
const loginUrl = `http://localhost:8080/login`;
const signUpUrl = `http://localhost:8080/signup`;
const userUrl = `http://localhost:8080/user`;

let storageToken = localStorage.getItem('token');
let storageId = localStorage.getItem('userId');

const booksUrl = input => `http://localhost:8080/books?input=${input}`;

const success = pos => {
  let { latitude, longitude } = pos.coords,
  crd = {latitude, longitude}
  console.log(crd);
  return crd
};

const error = err => {
  return `Error: ${err}`;
};

class App extends Component {
  state = {
    loggedInToken: '' || storageToken,
    userId: '' || storageId,
    errMsg: '',
    user: {},
    books: [],
    events: [],
    signUpClicked: false
  };

  componentDidMount() {
    if (this.state.loggedInToken) {
      this.getUserData();
      this.getUserLocation();
      return <Home />;
    }
  }
  getUserLocation = () => {
    return navigator.geolocation.getCurrentPosition(success, error);
  };

  //Populate with user content after creating join tables
  getUserData() {
    axios
      .post(userUrl, {
        id: storageId
      })
      .then(({ data }) => {
        this.setState({
          user: data
        });
      });
  }

  findBooks = input => {
    axios
      .get(booksUrl(input))
      .then(({ data }) => {
        this.setState({
          books: data
        });
      })
      .catch(err => console.log(err));
  };
  t;

  login = (email, password) => {
    if (!email || !password) {
      return alert('Must fill out all fields');
    }
    axios
      .post(loginUrl, {
        email,
        password
      })
      .then(({ data }) => {
        if (data.success === false) {
          alert('Username/Password mismatch');
          return;
        }
        console.log(data);
        this.setState({
          loggedInToken: data.token,
          userId: data.user.id,
          user: data.user,
          errMsg: data.err
        });
        localStorage.setItem('token', this.state.loggedInToken);
        localStorage.setItem('userId', this.state.user.id);
      });
  };

  toggleSignUp = () => {
    this.setState({
      signUpClicked: !this.state.signUpClicked
    });
  };

  signUp = (firstName, lastName, email, password) => {
    axios
      .post(signUpUrl, {
        firstName,
        lastName,
        email,
        password
      })
      .then(({ data }) => {
        console.log(data);
      });
  };

  render() {
    return (
      <div className="App">
        <Switch>
          {!this.state.loggedInToken && (
            <Route
              path="/"
              render={() => (
                <LoginContainer
                  login={this.login}
                  signUp={this.signUp}
                  toggleSignUp={this.toggleSignUp}
                  signUpClicked={this.state.signUpClicked}
                />
              )}
            />
          )}
          <Route
            path="/"
            exact
            render={() => (
              <Home
                findBooks={this.findBooks}
                books={this.state.books}
                user={this.state.user}
              />
            )}
          />
          <Route 
            path='/map'
            render={() => (
              <Nearby />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
