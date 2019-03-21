import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import SearchForm from '../SearchForm/SearchForm'
import BookList from '../BookList.jsx';
import Navbar from '../Navbar/Navbar';
import bookSvg from '../../assets/svg/undraw_book_lover_mkck.svg';


class Home extends Component {
  render() {
    return (
      <div className="Home">
        <SearchForm findBooks={this.props.findBooks} />
        {this.props.books.length === 0 && 
        <Image className="bookSvg" src={bookSvg}/>}
        <BookList books={this.props.books} />
        <Navbar />
      </div>
    );
  }
}

export default Home;
