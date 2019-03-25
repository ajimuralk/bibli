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
