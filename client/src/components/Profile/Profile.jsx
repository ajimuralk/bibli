import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import profileSvg from '../../assets/svg/undraw_personalization_triu.svg';
import Navbar from '../Navbar/Navbar';

class Profile extends Component {

  render() {
    const {user, userBooks} = this.props
    console.log(user, userBooks)

    return (
      <div> 
        <h1 className="profile__h1">Hey {user.firstName}!</h1>
        <Image className="profileSvg" src={profileSvg} />
        <div>
          {/* Your books: {bookArray} */}
        </div>
        <Navbar />
      </div>
    );
  }
}
export default Profile;
