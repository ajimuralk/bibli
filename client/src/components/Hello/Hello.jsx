import React from 'react';
import Image from 'react-bootstrap/Image';
import helloSvg from '../../assets/svg/undraw_on_the_office_fbfs.svg';

const Hello = () => {
  return (
    <div>
      <h1 className="hello__h1">Say Hello</h1>
      <Image className="helloSvg" src={helloSvg} />
    </div>
  );
};

export default Hello;
