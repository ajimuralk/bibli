import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm'
import BookList from '../BookList.jsx';
import Navbar from '../Navbar/Navbar';

//1) Header, 2) Seach bar, 3) News Feed, 4) Footer

class Home extends Component {
  render() {
    // const { firstName } = this.props.user;
    return (
      <div className="App">
        {/* <h3>Welcome {firstName} </h3> */}
        <SearchForm findBooks={this.props.findBooks} />
        <BookList books={this.props.books} />
        <Navbar />
      </div>
    );
  }
}

export default Home;
