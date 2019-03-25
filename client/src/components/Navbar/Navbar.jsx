import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import homeIcon from '../../assets/icons/home.svg';
import coffee from '../../assets/icons/coffee.svg';
import messageSquare from '../../assets/icons/message-square.svg';
import map from '../../assets/icons/map-pin.svg';
import user from '../../assets/icons/user.svg';

class Navbar extends Component {
  render() {
    return (
      <Nav className="Navbar">
        <NavLink to="/" exact={true} activeClassName="activeRoute">
          <Nav.Item>
            <img src={homeIcon} alt="home" />
          </Nav.Item>
        </NavLink>
        <NavLink to="/map" activeClassName="activeRoute">
          <Nav.Item>
            <img src={map} alt="nearby" />
          </Nav.Item>
        </NavLink>
        <NavLink to="/profile" activeClassName="activeRoute">
          <Nav.Item>
            <img src={user} alt="events" />
          </Nav.Item>
        </NavLink>
        <NavLink to="/hello" activeClassName="activeRoute">
          <Nav.Item>
            <img src={messageSquare} alt="messages" />
          </Nav.Item>
        </NavLink>
        <NavLink to="/events" activeClassName="activeRoute">
          <Nav.Item>
            <img src={coffee} alt="events" />
          </Nav.Item>
        </NavLink>
      </Nav>
    );
  }
}

export default Navbar;
