import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
const loginUrl = `http://localhost:8082/login`;
const signUpUrl = `http://localhost:8082/signup`;
let storageToken = localStorage.getItem('token');
// let storageUserFirstName = localStorage.getItem('userFirstName');
const booksUrl = input => `http://localhost:8082/books?input=${input}`;

class App extends Component {
  state = {
    loggedInToken: '' || storageToken,
    errMsg: '',
    user: [],
    books: [],
    events: []
  };

  componentDidMount() {
    if (this.state.loggedInToken) {
      return <Home />;
    }
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
    if (!email ||! password) {
      return alert('Must fill out all fields')
    }
    axios
      .post(loginUrl, {
        email,
        password
      })
      .then(({ data }) => {
        console.log(data);
        this.setState({
          loggedInToken: data.token,
          user: data.user,
          errMsg: data.err
        });
        localStorage.setItem('token', this.state.loggedInToken);
        // localStorage.setItem('userFirstName', this.state.user);
      });
  };

  signUp = (firstName, lastname, email, password) => {
    axios
      .post(signUpUrl, {
        firstName,
        lastname,
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
              render={() => <Login login={this.login} signUp={this.signUp} />}
            />
          )}
          <Route
            path="/"
            exact
            render={() => (
              <Home findBooks={this.findBooks} books={this.state.books}  />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
