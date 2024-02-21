import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from "react-simple-maps";
import usamap from "./assets/usageo.json";
import "./mapstyles.css";
import { useState } from "react";

export default function MapChart({ points, lines }) {
  const [selectedState, setSelectedState] = useState(null);
  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={usamap}>
        {({ geographies }) =>
          geographies.map(geo => (
            <Geography
              className={`state ${geo.rsmKey} ${
                selectedState == geo.rsmKey ? "selectedState" : null
              }`}
              key={geo.rsmKey}
              geography={geo}
              stroke="#000000"
              style={{
                default: {
                  fill: "#EEE",
                  outline: "none",
                },
                hover: {
                  fill: "#F53",
                  outline: "none",
                },
                pressed: {
                  fill: "teal",
                  outline: "none",
                },
              }}
              onClick={() => setSelectedState(geo.rsmKey)}
            />
          ))
        }
      </Geographies>
      {points.map(p => (
        <Marker
          key={crypto.randomUUID()}
          coordinates={[p.longitude, p.latitude]}
        >
          {p.name && <text>{p.name}</text>}
          <circle r={8} fill={p.color} />
        </Marker>
      ))}
      {lines.map(l => {
        return (
          <React.Fragment key={crypto.randomUUID()}>
            <Line
              from={[l.longitudeFrom, l.latitudeFrom]}
              to={[l.longitudeTo, l.latitudeTo]}
              stroke={l.color}
              strokeWidth={2}
            ></Line>
            <Marker coordinates={[l.longitudeFrom, l.latitudeFrom]}>
              <circle r={8} fill={l.color} />
            </Marker>
            <Marker coordinates={[l.longitudeTo, l.latitudeTo]}>
              <circle r={8} fill={l.color} />
            </Marker>
          </React.Fragment>
        );
      })}
      {/* <Line from={[-71, 42]} to={[-122, 37]} stroke="#F53" strokeWidth={2} /> */}
    </ComposableMap>
  );
}
