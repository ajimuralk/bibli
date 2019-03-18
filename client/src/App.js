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
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  cancelBtn = () => {
    
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            path="/"
            exact
            render={() => <Home findBooks={this.findBooks} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
