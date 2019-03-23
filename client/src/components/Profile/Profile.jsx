import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import profileSvg from '../../assets/svg/undraw_personalization_triu.svg';
import Navbar from '../Navbar/Navbar';

class Profile extends Component {

  render() {
    const {user, books} = this.props
    console.log(books)
    // bookArray = books.map(book => {
    // })
    return (
      <div> 
        <h1 className="profile__h1">Profile {this.props.user.firstName}</h1>
        <Image className="profileSvg" src={profileSvg} />
        <Navbar />
      </div>
    );
  }
}
export default Profile;
