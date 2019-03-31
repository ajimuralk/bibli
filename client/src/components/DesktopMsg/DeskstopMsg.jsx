import React from 'react';
import Image from 'react-bootstrap/Image';
import mobileSvg from '../../assets/svg/undraw_mobile_browsers_lib5 (1).svg';

const DesktopMsg = () => {
  return (
    <div className="desktop-container">
      <h1 className="desktop__header">Hello!</h1>
      <h3 className="desktop__sub-header">
        This site was designed for mobile devices.
      </h3>
      <h3 className="desktop__sub-header">
        Open your mobile browser for the best experience.
      </h3>
      <Image src={mobileSvg} className="desktop__img" />
    </div>
  );
};

export default DesktopMsg;
