import React from 'react';
import Image from 'react-bootstrap/Image';
import profileSvg from '../../assets/svg/undraw_Working_32n9.svg';
import { Link } from 'react-router-dom';

const Profile = props => {
  const { user, userBooks, signOut } = props;
  return (
    <div>
      <div className="top-container">
        <h1 className="profile__h1">{user.firstName}</h1>
        <Link
          to="/"
          className="signOut"
          onClick={() => signOut(user.id)}
        >
          SIGN OUT
        </Link>
      </div>

      {userBooks.title === undefined || userBooks.author === undefined ? (
        <Link to={'/'} className="book-link">
          Start searching for books!
        </Link>
      ) : (
        <div className="header-container">
          <h4 className="current-book__header">Currently reading</h4>
          <div className="border" />
          <span className="current-book">
            {' '}
            <strong>{userBooks.title}</strong> by {userBooks.author}
          </span>
        </div>
      )}
      <Image className="profileSvg" src={profileSvg} />
    </div>
  );
};

export default Profile;
