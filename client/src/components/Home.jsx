import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchForm from './SearchForm';

//1) Header, 2) Seach bar, 3) News Feed, 4) Footer

class Home extends Component {
  render() {
    return (
      <div className="App">
        <h1>Home</h1>
        <SearchForm findBooks={this.props.findBooks}/>
        
      </div>
    );
  }
}

export default Home;
