import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import profileSvg from '../../assets/svg/undraw_Working_32n9.svg';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';

class Profile extends Component {
  render() {
    const { user, userBooks } = this.props;
    return (
      <div>
        <div className="top-container">
          <h1 className="profile__h1">{user.firstName}</h1>
          <Link
            to="/"
            className="signOut"
            onClick={() => this.props.signOut(user.id)}
          >
            SIGN OUT
          </Link>
        </div>

        {this.props.userBooks.length === 0 ? (
          <>
            <Link to={'/'} className="noBooks-link">Click here to seach for books!</Link>
          </>
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

        <Navbar />
      </div>
    );
  }
}
export default Profile;
