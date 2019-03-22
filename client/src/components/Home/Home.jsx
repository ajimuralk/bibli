import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import SearchForm from '../SearchForm/SearchForm';
import BookList from '../Booklist/BookList.jsx';
import Navbar from '../Navbar/Navbar';
import bookSvg from '../../assets/svg/undraw_book_lover_mkck.svg';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <SearchForm
          findBooks={this.props.findBooks}
          cancelSearch={this.props.cancelSearch}
        />
        {this.props.books.length === 0 && (
          <Image className="bookSvg" src={bookSvg} />
        )}
        <BookList
          books={this.props.books}
          postBook={this.props.postBook}
          toggleBookModal={this.props.toggleBookModal}
          bookModalClicked={this.props.bookModalClicked}
        />
        <Navbar />
      </div>
    );
  }
}

export default Home;
