import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import mapSvg from '../../assets/svg/undraw_directions_x53j (1).svg';
import refreshSvg from '../../assets/icons/refresh-cw.svg';
import Image from 'react-bootstrap/Image';
import { Map, Marker, Popup, TileLayer, Circle } from 'react-leaflet';
import distanceCalc from '../../distanceCalc';


const lightMap =
  'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';
const mapTile =
  '&copy; <a href="#">OpenStreetMap</a>, &copy; <a href="#">CARTO</a>';

class Nearby extends Component {

  render() {
    const { userLatLng } = this.props;

    const nearbyList = this.props.nearbyUsers
      .filter(user => {
        return (
          //Display users who are within 200m
          distanceCalc(
            userLatLng[0],
            userLatLng[1],
            user.latitude,
            user.longitude
          ) < 0.2
        );
      })
      .map((user, i) => {
        return (
          <Marker
            position={[user.latitude, user.longitude]}
            id={user.UserId}
            key={i}
          >
           <Circle 
                  center={{lat:user.latitude, lng: user.longitude}}
                  fillColor="white" 
                  radius={15}/>
            <Popup>{user.UserId}</Popup>
          </Marker>
        );
      });

    return (
      <div>
        {(!userLatLng) ? (
          <>
            <Image className="mapSvg" src={mapSvg} />
            <Navbar />
          </>
        ) : (
          <>
            <Map center={userLatLng} zoom="18" id="Map" animate="true">

              <TileLayer url={lightMap} attribution={mapTile} />
              {/* <Image className="refresh" src={refreshSvg}/> */}
              {nearbyList}
              {/* <Marker position={userLatLng}>
                <Popup> You are here</Popup>
              </Marker> */}
            </Map>
            <Navbar />
          </>
        )}
      </div>
    );
  }
}

export default Nearby;
