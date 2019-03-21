import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import {
  Map as NearbyMap,
  Marker,
  Popup,
  TileLayer,
  GeoJSON
} from 'react-leaflet';

const lightMap =
  'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';

const mapTile =
  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>';

// const markers = [
//   {
//     name: 'Kottbusser Tor',
//     latlng: [52.499040, 13.418392]
//   }, {
//     name: 'Görlitzer Park',
//     latlng: [52.496912, 13.436738]
//   }, {
//     name: 'webkid',
//     latlng: [52.501106, 13.422061]
//   }
// ];

class Nearby extends Component {
  render() {
    // const LeafletMarkers = markers.map(marker => (
    //   <Marker position={marker.latlng} key={`marker_${marker.name}`}>
    //     <Popup>
    //       <span>{marker.name}</span>
    //     </Popup>
    //   </Marker>
    // ));

    let latLng = this.props.userLatLng;
    console.log(latLng);

    // if (this.props.userLatLng === [] ||  null) {
    //   return <div>Loading...</div>;
    // }

    return (
      <div>
        <NearbyMap
          center={[49.284870600000005, -123.11488250000001]}
          zoom="18"
          id="Map"
        >
          <TileLayer url={lightMap} attribution={mapTile} />
        </NearbyMap>
        <Navbar />
      </div>
    );
  }
}

export default Nearby;
