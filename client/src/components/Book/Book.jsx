import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Collapse from 'react-bootstrap/Collapse';
import add from '../../assets/icons/plus-circle.svg';

class Book extends Component {
  render() {
    const { ...book } = this.props;
    return (
      <div>
        <Card onClick={() => this.props.toggleBookModal()}>
          <Card.Img
            variant="top"
            src={book.image}
            alt="cover-art"
            className="img"
          />
          <Card.Body>
            <Card.Title>{book.title} </Card.Title>
            <Card.Text>{book.author}</Card.Text>
          </Card.Body>
          <Image
            className="addBtn"
            src={add}
            onClick={() => this.props.postBook(book)}
          />
        </Card>
      </div>
    );
  }
}

export default Book;
