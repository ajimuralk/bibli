import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import Login from './components/Login';
const loginUrl = `http://localhost:8082/login`;
const signUpUrl = `http://localhost:8082/signup`;
const userUrl = `http://localhost:8082/user`;
let storageToken = localStorage.getItem('token');
let storageId = localStorage.getItem('userId');
const booksUrl = input => `http://localhost:8082/books?input=${input}`;

class App extends Component {
  state = {
    loggedInToken: '' || storageToken,
    userId: '' || storageId,
    errMsg: '',
    user: {},
    books: [],
    events: []
  };

  componentDidMount() {
    if (this.state.loggedInToken) {
      this.getUserData();
      return <Home />;
    }
  }

  //Populate with user content after creating join tables
  getUserData() {
    axios.post(userUrl, {
      id: storageId
    }).then(({data}) => {
      this.setState({
        user: data
      })
    })
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
          alert('Username/Password mismatch')
          return
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
    console.log(this.state.user)
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
              <Home findBooks={this.findBooks} books={this.state.books} user={this.state.user} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
