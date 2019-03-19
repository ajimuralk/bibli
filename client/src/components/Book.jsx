import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

class Book extends Component {
  render() {
    const { ...book } = this.props;
    return (
      <div>
        <Card>
          <Card.Img variant="top" src={book.image} alt="cover-art" />
          <Card.Body>
            <Card.Title>{book.title} </Card.Title>
            <Card.Text>{book.author}</Card.Text>
          </Card.Body>

          {/* add button w/func to post book to user's acct */}
        </Card>
      </div>
    );
  }
}

export default Book;
