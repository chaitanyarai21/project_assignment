import React, { Component } from 'react';
import { MapContainer, CircleMarker, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import data from './country_usage'
import country_code from './countrycode'
let country = country_code.country;
class App extends Component {

  render() {
    var centerLat = (data.minLat + data.maxLat) / 2;
    var distanceLat = data.maxLat - data.minLat;
    var bufferLat = distanceLat * 0.05;
    var centerLong = (data.minLong + data.maxLong) / 2;
    var distanceLong = data.maxLong - data.minLong;
    var bufferLong = distanceLong * 0.05;
    return (
      <div>
        <h3 style={{ textAlign: "center" }}>Usage data distribution over the world</h3>
        <MapContainer
          style={{ height: "480px", width: "100%" }}
          zoom={1}
          center={[centerLat, centerLong]}
          bounds={[
            [data.minLat - bufferLat, data.minLong - bufferLong],
            [data.maxLat + bufferLat, data.maxLong + bufferLong]
          ]}
        >
          <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {data.city.map((city, k) => {
            return (
              <CircleMarker
                key={k}
                center={[parseFloat(country[city["region"].toLowerCase()][0]), parseFloat(country[city["region"].toLowerCase()][1])]}
                radius={20 * Math.log(city["data"]/10000000)}
                fillOpacity={0.5}
                stroke={false}
              >
                <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                  <span>{city["region"] + ": " + "data" + " " + city["data"]}</span>
                </Tooltip>
              </CircleMarker>)
          })
          }
        </MapContainer>
      </div>
    );
  }
}

export default App;