import React from 'react';
import Book from '../Book/Book.jsx';

const BookList = props => {
  const { books } = props;
  const list = books.map((book, i) => {
    return <Book {...book} key={i} postBook={props.postBook} />;
  });
  return <div>{list}</div>;
};

export default BookList;
