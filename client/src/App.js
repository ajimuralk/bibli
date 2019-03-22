import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home/Home';
import LoginContainer from './components/LoginContainer/LoginContainer';
import Nearby from './components/Nearby/Nearby';
import './global-styles/global.css';

// import openSocket from 'socket.io-client';
// const socket = openSocket('http://localhost:8080');

const loginUrl = `http://localhost:8080/login`;
const signUpUrl = `http://localhost:8080/signup`;
const userUrl = `http://localhost:8080/user`;
let storageToken = localStorage.getItem('token');
let storageId = localStorage.getItem('userId');
let lastLatLng = localStorage.getItem('userLatLng');

const booksUrl = input => `http://localhost:8080/books?input=${input}`;
const booksPostUrl = `http://localhost:8080/books`;

let default_viewport = [36.2048, 138.2019];

class App extends Component {
  state = {
    userLatLng: default_viewport || lastLatLng,
    loggedInToken: '' || storageToken,
    userId: '' || storageId,
    errMsg: '',
    locationTimestamp: '',
    user: {},
    books: [],
    signUpClicked: false,
    bookModalClicked: false
  };

  componentDidMount() {
    if (this.state.loggedInToken) {
      this.getUserData();
      return <Home />;
    }
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.userLatLng !== this.getUserLocation()) {
      return true
    }
  }

  // componentDidUpdate(prevProvs, prevState) {
  //   if (prevState.userLatLng !== this.getUserLocation()) {
  //     this.setState({
  //       userLatLng: this.getUserLocation()
  //     });
  //   }
  // }

  getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      success => {
        let { latitude, longitude } = success.coords,
          timestamp = success.timestamp;
        this.setState(
          {
            userLatLng: [latitude, longitude],
            locationTimestamp: timestamp
          },
          () => {
            localStorage.setItem('userLatLng', this.state.userLatLng);
          }
        );
      },
      error => {
        console.log(error);
      }
    );
  };

  //Populate with user content after creating join tables
  getUserData() {
    axios
      .post(userUrl, {
        id: storageId
      })
      .then(({ data }) => {
        console.log(data)
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
        this.getUserLocation();
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

  postBook = book => {
    axios
      .post(booksPostUrl, {
        id: this.state.userId,
        book
      })
      .then(res => {
        console.log(res.data);
      });
  };

  toggleBookModal = () => {
    this.setState({
      bookModalClicked: !this.state.bookModalClicked
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
                toggleBookModal={this.toggleBookModal}
                bookModalClicked={this.state.bookModalClicked}
                postBook={this.postBook}
                findBooks={this.findBooks}
                books={this.state.books}
                user={this.state.user}
              />
            )}
          />
          <Route
            path="/map"
            render={() => <Nearby userLatLng={this.state.userLatLng} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
