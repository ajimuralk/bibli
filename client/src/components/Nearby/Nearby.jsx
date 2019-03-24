import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import mapSvg from '../../assets/svg/undraw_directions_x53j (1).svg';
import Image from 'react-bootstrap/Image';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import distanceCalc from '../../distanceCalc';

const lightMap =
  'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';
const mapTile =
  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>';

class Nearby extends Component {
  click = ref => {};

  render() {
    const { userLatLng } = this.props;

    const nearbyList = this.props.nearbyUsers
      .filter(user => {
        return (
          distanceCalc(
            userLatLng[0],
            userLatLng[1],
            user.latitude,
            user.longitude
          ) < .2
        );
      })
      .map((user, i) => {
        return (
          <Marker
            position={[user.latitude, user.longitude]}
            id={user.UserId}
            key={i}
          >
            <Popup>{user.UserId}</Popup>
          </Marker>
        );
      });

    console.log(
      distanceCalc(
        userLatLng[0],
        userLatLng[1],
        49.258518699999996,
        -123.10102339999999
    ));

    return (
      <div>
        {!userLatLng ? (
          <>
            <Image className="mapSvg" src={mapSvg} />
            <Navbar />
          </>
        ) : (
          <>
            <Map center={userLatLng} zoom="18" id="Map" animate="true">
              <TileLayer url={lightMap} attribution={mapTile} />
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
