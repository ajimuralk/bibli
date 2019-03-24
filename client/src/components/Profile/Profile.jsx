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
        <h1 className="profile__h1">{user.firstName}</h1>
        <Image className="profileSvg" src={profileSvg} />
        <div>{/* Your books: {bookArray} */}</div>
        <Link
          to="/"
          className="signOut"
          onClick={() => this.props.signOut(user.id)}
        >
          SIGN OUT
        </Link>
        <Navbar />
      </div>
    );
  }
}
export default Profile;
