import React, { Component } from 'react';

class Book extends Component {
  render() {
    const { ...book } = this.props;
    return (
      <div>
        <h3>{book.title}</h3>
        <h4>{book.author}</h4>
        <img src={book.image} alt="cover-art" />
        {/* add button w/func to post book to user's acct */}
      </div>
    );
  }
}

export default Book;
