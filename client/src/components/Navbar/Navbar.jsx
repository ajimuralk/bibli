import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import homeIcon from '../../assets/icons/home.svg';
import coffee from '../../assets/icons/coffee.svg';
import messageSquare from '../../assets/icons/message-square.svg';
import map from '../../assets/icons/map-pin.svg';
// import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <Nav className="Navbar">
        <Link to="/">
          <Nav.Item>
            <img src={homeIcon} alt="home" />
          </Nav.Item>
        </Link>
        <Link to="/map">
          <Nav.Item>
            <img src={map} alt="nearby" />
          </Nav.Item>
        </Link>
        <Link to="/">
          <Nav.Item>
            <img src={messageSquare} alt="messages" />
          </Nav.Item>
        </Link>
        <Link to="/">
          <Nav.Item>
            <img src={coffee} alt="events" />
          </Nav.Item>
        </Link>
      </Nav>
    );
  }
}

export default Navbar;
