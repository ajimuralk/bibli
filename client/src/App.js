import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home/Home';
import Nearby from './components/Nearby/Nearby';
import Hello from './components/Hello/Hello';
import Profile from './components/Profile/Profile';
import Events from './components/Events/Events';
import MediaQuery from 'react-responsive';
import Navbar from './components/Navbar/Navbar';
import LoginContainer from './components/LoginContainer/LoginContainer';
import DesktopMsg from './components/DesktopMsg/DeskstopMsg';
import './global-styles/global.css';

const loginUrl = `http://localhost:8080/login`;
const signUpUrl = `http://localhost:8080/signup`;
const booksPostUrl = `http://localhost:8080/books`;
const locationUrl = `http://localhost:8080/location`;
const userUrl = `http://localhost:8080/user`;
const default_viewport = [36.2048, 138.2019];
const getUrl = (route, input) =>
  `http://localhost:8080/${route}?input=${input}`;

let storageToken = localStorage.getItem('token');
let storageId = localStorage.getItem('userId');
let lastLatLng = localStorage.getItem('userLatLng');

class App extends Component {
  state = {
    userLatLng: default_viewport || lastLatLng,
    loggedInToken: '' || storageToken,
    userId: '' || storageId,
    errMsg: '',
    successMsg: '',
    user: {},
    userBooks: {},
    books: [],
    nearbyUsers: [],
    signUpClicked: false,
    bookModalClicked: false
  };

  componentDidMount() {
    if (storageToken) {
      this.getUserData();
      this.getUserLocation();
      this.findNearbyUsers(storageId);
    } else return;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.userLatLng !== lastLatLng) {
      this.getUserLocation();
    }
  }

  setInterval = (() => {
    this.findNearbyUsers(storageId)
  }, 5000);

  getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      success => {
        let { latitude, longitude } = success.coords;
        this.setState(
          {
            userLatLng: [latitude, longitude]
          },
          () => {
            localStorage.setItem('userLatLng', this.state.userLatLng);
            axios.post(locationUrl, {
              latitude,
              longitude,
              UserId: storageId
            });
          }
        );
      },
      error => {
        console.log(error);
      }
    );
  };

  findNearbyUsers = userId => {
    axios.get(getUrl('location', userId)).then(({ data }) => {
      this.setState({
        nearbyUsers: data
      });
    });
  };

  getUserData() {
    axios
      .post(userUrl, {
        id: this.state.userId
      })
      .then(({ data }) => {
        const { firstName, lastName, id, title, author } = data;
        this.setState({
          user: {
            firstName,
            lastName,
            id
          },
          userBooks: {
            title,
            author
          }
        });
      });
  }

  findBooks = input => {
    axios
      .get(getUrl('books', input))
      .then(({ data }) => {
        this.setState({
          books: data
        });
      })
      .catch(err => console.log(err));
  };

  cancelSearch = ref => {
    ref.value = '';
    this.setState({
      books: []
    });
  };

  timeoutErr = () => {
    setTimeout(() => {
      this.setState({
        errMsg: ''
      });
    }, 3000);
  };

  login = (email, password) => {
    if (!email || !password) {
      this.setState({
        errMsg: 'Invalid username/password'
      });
      this.timeoutErr();
      return
    }
    axios
      .post(loginUrl, {
        email,
        password
      })
      .then(({ data }) => {
        if (data.success === false) {
          this.setState({
            errMsg: 'Invalid username/password'
          });
          this.timeoutErr();
          return
        }
        this.setState(
          {
            loggedInToken: data.token,
            userId: data.user.id,
            errMsg: data.err
          },
          () => {
            this.getUserData();
            this.getUserLocation();
            localStorage.setItem('token', this.state.loggedInToken);
            localStorage.setItem('userId', this.state.userId);
          }
        );
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
        UserId: this.state.userId,
        book
      })
      .then(res => {
        this.getUserData();
        this.toggleBookModal();
        setTimeout(() => {
          this.toggleBookModal();
        }, 2000);
      });
  };

  toggleBookModal = () => {
    this.setState({
      bookModalClicked: !this.state.bookModalClicked
    });
  };

  signUp = (firstName, lastName, email, password) => {
    if (!(firstName || lastName) || !(email || password)) {
      this.setState({
        errMsg: 'Please complete all fields'
      });
      this.timeoutErr();
      return;
    }
    axios
      .post(signUpUrl, {
        firstName,
        lastName,
        email,
        password
      })
      .then(({ data }) => {
        if (data.success === false) {
          this.setState({
            errMsg: 'Email address already exists'
          });
          this.timeoutErr();
          return;
        } else if (data.success === true)
          this.setState({
            successMsg: 'Sign up successful!'
          });
        setTimeout(() => {
          window.location.assign('/');
          this.setState({
            successMsg: ''
          });
        }, 1000);
      });
  };

  signOut = id => {
    axios.delete(userUrl, { data: { id } }).then(({ data }) => {
      this.setState({
        loggedInToken: '',
        userLatLng: '',
        userBooks: [],
        userId: ''
      });
      localStorage.clear();
    });
  };

  render() {
    return (
      <div className="App">
        <MediaQuery query="(min-width: 481px)">
          <DesktopMsg />
        </MediaQuery>

        <MediaQuery query="(max-width: 480px)">
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
                    errMsg={this.state.errMsg}
                    successMsg={this.state.successMsg}
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
                  cancelSearch={this.cancelSearch}
                  books={this.state.books}
                  user={this.state.user}
                />
              )}
            />
            <Route
              path="/map"
              render={() => (
                <Nearby
                  userLatLng={this.state.userLatLng}
                  nearbyUsers={this.state.nearbyUsers}
                />
              )}
            />
            <Route
              path="/profile"
              render={() => (
                <Profile
                  user={this.state.user}
                  userBooks={this.state.userBooks}
                  booksUrl={this.booksUrl}
                  signOut={this.signOut}
                />
              )}
            />
            <Route path="/hello" render={() => <Hello />} />
            <Route path="/events" render={() => <Events />} />
          </Switch>
          {this.state.loggedInToken && <Navbar />}
        </MediaQuery>
      </div>
    );
  }
}

export default App;
