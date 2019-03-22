import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import helloSvg from '../../assets/svg/undraw_personal_notes_8n63.svg';
import Navbar from '../Navbar/Navbar';

class Hello extends Component {
  render() {
    return (
      <div>
        <h1 className='hello__h1'>Say Hello</h1>
        <Image className='helloSvg' src={helloSvg} />
        <Navbar />
      </div>
    );
  }
}
export default Hello;
