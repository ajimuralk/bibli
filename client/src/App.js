import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
const booksUrl = input => `http://localhost:8082/books?input=${input}`;

class App extends Component {
  state = {
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

  cancelBtn = () => {};

  render() {
    console.log(this.state.books)
    return (
      <div className="App">
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <Home findBooks={this.findBooks} books={this.state.books} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
