import React, { Component } from 'react';

class Book extends Component {
  render() {
    const { ...book } = this.props;
    return (
      <div>
        <h3>{book.title}</h3>
        <h4>{book.author}</h4>
        <img src={book.image} alt="cover-art" />
      </div>
    );
  }
}

export default Book;
