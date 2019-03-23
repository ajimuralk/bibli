import React, { Component } from 'react';
import Book from '../Book/Book.jsx';

class BookList extends Component {
  render() {
    const books = this.props.books.map((book, i) => {
      return (
        <Book
          {...book}
          key={i}
          postBook={this.props.postBook}
          bookModalClicked={this.props.bookModalClicked}
          toggleBookModal={this.props.toggleBookModal}
        />
      );
    });
    return (
      <div>
        {books}
      </div>
    );
  }
}

export default BookList;