import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import add from '../../assets/icons/plus-circle.svg';

const Book = props => {
  const { image, title, author, postBook } = props;
  return (
    <div>
      <Card>
        <Card.Img variant="top" src={image} alt="cover-art" className="img" />
        <Card.Body>
          <Card.Title>{title} </Card.Title>
          <Card.Text>{author}</Card.Text>
        </Card.Body>
        <Image className="addBtn" src={add} onClick={() => postBook(props)} />
      </Card>
    </div>
  );
};

export default Book;
