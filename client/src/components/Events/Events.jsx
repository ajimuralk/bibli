import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import eventsSvg from '../../assets/svg/undraw_social_dashboard_k3pt.svg';

class Events extends Component {
  render() {
    return (
      <div>
        <h1 className='events__h1'>Events</h1>
        <Image className='eventsSvg' src={eventsSvg} />
      </div>
    );
  }
}
export default Events;
