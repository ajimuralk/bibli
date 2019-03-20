import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import {
  Map as NearbyMap,
  Marker,
  Popup,
  TileLayer,
  GeoJSON
} from 'react-leaflet';
import Leaflet from 'leaflet';

const markers = [
  {
    name: 'Kottbusser Tor',
    latlng: [52.499040, 13.418392]
  }, {
    name: 'Görlitzer Park',
    latlng: [52.496912, 13.436738]
  }, {
    name: 'webkid',
    latlng: [52.501106, 13.422061]
  }
];
const mapConfig = {
  center: [49.285, -123.114],
  zoom: 18
};

const data = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "01",
      properties: { name: "Alabama", density: 94.65 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-87.359296, 35.00118],
            [-85.606675, 34.984749],
            [-85.431413, 34.124869],
            [-85.184951, 32.859696],
            [-85.069935, 32.580372],
            [-84.960397, 32.421541],
            [-85.004212, 32.322956],
            [-84.889196, 32.262709],
            [-85.058981, 32.13674],
            [-85.053504, 32.01077],
            [-85.141136, 31.840985],
            [-85.042551, 31.539753],
            [-85.113751, 31.27686],
            [-85.004212, 31.003013],
            [-85.497137, 30.997536],
            [-87.600282, 30.997536],
            [-87.633143, 30.86609],
            [-87.408589, 30.674397],
            [-87.446927, 30.510088],
            [-87.37025, 30.427934],
            [-87.518128, 30.280057],
            [-87.655051, 30.247195],
            [-87.90699, 30.411504],
            [-87.934375, 30.657966],
            [-88.011052, 30.685351],
            [-88.10416, 30.499135],
            [-88.137022, 30.318396],
            [-88.394438, 30.367688],
            [-88.471115, 31.895754],
            [-88.241084, 33.796253],
            [-88.098683, 34.891641],
            [-88.202745, 34.995703],
            [-87.359296, 35.00118]
          ]
        ]
      }
    }
  ]
}


class Nearby extends Component {
  render() {
    // create an array with marker components
    const LeafletMarkers = markers.map(marker => (
      <Marker position={marker.latlng} key={`marker_${marker.name}`}>
        <Popup>
          <span>{marker.name}</span>
        </Popup>
      </Marker>
    ));

    return (
      <div>
        <NearbyMap center={mapConfig.center} zoom={mapConfig.zoom} id="Map">
        <TileLayer
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
          />
          <GeoJSON data={data}  />
        </NearbyMap>
        <Navbar />
      </div>
    );
  }
}

export default Nearby;
