import React from 'react';
import Image from 'react-bootstrap/Image';
import SearchForm from '../SearchForm/SearchForm';
import BookList from '../Booklist/BookList.jsx';
import bookSvg from '../../assets/svg/undraw_book_lover_mkck.svg';

const Home = props => {
  const { bookModalClicked, findBooks, cancelSearch, postBook, books } = props;
  return (
    <div className="Home">
      {bookModalClicked && (
        <div className="add-book-msg">Added to your booklist!</div>
      )}

      <SearchForm findBooks={findBooks} cancelSearch={cancelSearch} />
      {books.length === 0 && <Image className="bookSvg" src={bookSvg} />}
      <BookList books={books} postBook={postBook} />
    </div>
  );
};

export default Home;
