import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import mapSvg from '../../assets/svg/undraw_directions_x53j (1).svg';
import Image from 'react-bootstrap/Image';
import { Map, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';

const lightMap =
  'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';
const mapTile =
  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>';

class Nearby extends Component {
  render() {
 
  
    // if (this.props.userLatLng === '' || null) 
    // return <h4>Loading...</h4>

    return (
      <div>
        {(this.props.userLatLng === null || '') && (
          <Image className="mapSvg" src={mapSvg} />
        )}

        <Map center={this.props.userLatLng} zoom="18" id="Map">
          <TileLayer url={lightMap} attribution={mapTile} />
        </Map>
        <Navbar />
      </div>
    );
  }
}

export default Nearby;
