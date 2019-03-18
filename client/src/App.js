import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import Login from './components/Login';
const loginUrl = `http://localhost:8082/login`;
const signUpUrl = `http://localhost:8082/signup`;
const booksUrl = input => `http://localhost:8082/books?input=${input}`;

class App extends Component {
  state = {
    loggedInToken: null,
    user: [],
    books: [],
    events: []
  };

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
    axios
      .post(loginUrl, {
        email,
        password
      })
      .then(({ data }) => {
        console.log(data);
        this.setState({
          loggedInToken: data.token
        });
        localStorage.setItem('token', this.state.loggedInToken);
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
          {this.state.loggedInToken && (
            <Route
              path="/"
              exact
              render={() => (
                <Home findBooks={this.findBooks} books={this.state.books} />
              )}
            />
          )}
          <Route path="/" exact render={() => <Login login={this.login} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
