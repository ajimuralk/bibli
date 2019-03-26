import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home/Home';
import LoginContainer from './components/LoginContainer/LoginContainer';
import Nearby from './components/Nearby/Nearby';
import Hello from './components/Hello/Hello';
import Profile from './components/Profile/Profile';
import './global-styles/global.css';
import Events from './components/Events/Events';
import MediaQuery from 'react-responsive';
import DesktopMsg from './components/DesktopMsg/DeskstopMsg';

const loginUrl = `http://localhost:8080/login`;
const signUpUrl = `http://localhost:8080/signup`;
const booksPostUrl = `http://localhost:8080/books`;
const locationUrl = `http://localhost:8080/location`;
const userUrl = `http://localhost:8080/user`;
const getUrl = (route, input) =>
  `http://localhost:8080/${route}?input=${input}`;
let storageToken = localStorage.getItem('token');
let storageId = localStorage.getItem('userId');
let lastLatLng = localStorage.getItem('userLatLng');
let default_viewport = [36.2048, 138.2019];

class App extends Component {
  state = {
    userLatLng: default_viewport || lastLatLng,
    loggedInToken: '' || storageToken,
    userId: '' || storageId,
    errMsg: '',
    user: {},
    userBooks: [],
    books: [],
    nearbyUsers: [],
    signUpClicked: false,
    bookModalClicked: false
  };

  componentDidMount() {
    if (this.state.loggedInToken) {
      this.getUserData();
      this.findNearbyUsers(storageId);
      return <Home />;
    } else return;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.userLatLng !== this.getUserLocation()) {
      return true;
    }
  }

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
      console.log(data);
      this.setState({
        nearbyUsers: data
      });
    });
  };

  getUserData() {
    axios
      .post(userUrl, {
        id: storageId,
        coords: this.state.userLatLng
      })
      .then(({ data }) => {
        console.log(data)
        if (data.coords === null) return;
        const { latitude, longitude } = data.coords;
        this.setState({
          user: data.user,
          userBooks: data.books,
          userLatLng: [latitude, longitude]
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

  login = (email, password) => {
    if (!email || !password) {
      this.setState({
        errMsg: 'Invalid username/password'
      });
      setTimeout(() => {
        this.setState({
          errMsg: ''
        });
      }, 3000);
      return;
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
          setTimeout(() => {
            this.setState({
              errMsg: ''
            });
          }, 3000);
          return;
        }
        this.setState(
          {
            loggedInToken: data.token,
            userId: data.user.id,
            user: data.user,
            errMsg: data.err
          },
          () => {
            this.getUserLocation();
            localStorage.setItem('token', this.state.loggedInToken);
            localStorage.setItem('userId', this.state.user.id);
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
        this.toggleBookModal();
        setTimeout(() => {
          this.toggleBookModal();
        }, 2000);
        console.log(res.data);
      });
  };

  toggleBookModal = () => {
    this.setState({
      bookModalClicked: !this.state.bookModalClicked
    });
  };

  signUp = (firstName, lastName, email, password) => {
    if (!(firstName || lastName) && !(email || password)) {
      this.setState({
        errMsg: 'Please complete all fields'
      });
      setTimeout(() => {
        this.setState({
          errMsg: ''
        });
      }, 3000);
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
          setTimeout(() => {
            this.setState({
              errMsg: ''
            });
          }, 3000);
        }
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
        </MediaQuery>
      </div>
    );
  }
}

export default App;
