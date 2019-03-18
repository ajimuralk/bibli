import React, { Component } from 'react';
import Book from './'

class BookList extends Component {
  render() {
    const books = this.props.books.map(book => {
      return <Book {...book} />;
    });
    return <div />;
  }
}

export default BookList;
