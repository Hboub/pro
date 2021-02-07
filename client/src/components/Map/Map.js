// eslint-disable-next-line
import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import MapGL, { NavigationControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import Geocoder from "react-map-gl-geocoder";

import PlaceTwoTone from "@material-ui/icons/PlaceTwoTone";

import {
  MapWrapper,
  Navigation,
  Popup,
  PinWrapper,
  Image,
  Info,
  Title,
  Desc,
} from "./Map.styles";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYmFydHN0YyIsImEiOiJjanVpcnlpeHMxYzJzM3lwZGZsNmlvNTc2In0.xerR67g9x883LTLBNBRV0A";

const INITIAL_VIEWPORT = {
  latitude: 36.8335,
  longitude: 10.2364,
  zoom: 5,
};

// const recenter = () => {
//   // fly with default options to null island
//   Map.flyTo({ center: [0, 0], zoom: 9 });
//   // using flyTo options
//   Map.flyTo({
//     center: [0, 0],
//     zoom: 9,
//     speed: 0.2,
//     curve: 1,
//     easing(t) {
//       return t;
//     },
//   });
// };

const Map = ({
  mapStyle,
  height,
  pin = null,
  handleCordsChange,
  initViwport,
}) => {
  const [viewport, setViewport] = useState(initViwport || INITIAL_VIEWPORT);
  // console.log(viewport)

  const onMapClick = ({ lngLat, leftButton }) => {
    if (!leftButton) return;
    const [longitude, latitude] = lngLat;
    handleCordsChange(longitude, latitude);
    // setViewport=({longitude, latitude})
  };

  // const mapRef = useRef();

  return (
    <MapWrapper>
      <MapGL
        width="100%"
        height={height}
        mapStyle={`mapbox://styles/mapbox/${mapStyle}-v9`}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onViewportChange={(newViewport) => setViewport(newViewport)}
        onClick={handleCordsChange && onMapClick}
        {...viewport}
      >
        {/* <Geocoder
          mapRef={mapRef}
          onViewportChange={(newViewport) => setViewport(newViewport)}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-left"
        /> */}
        <Navigation>
          <NavigationControl
            onViewportChange={(newViewport) => setViewport(newViewport)}
          />
        </Navigation>

        {pin && pin.latitude !== 0 && (
          <PinWrapper>
            <Marker
              latitude={pin.latitude}
              longitude={pin.longitude}
              offsetLeft={-19}
              offsetTop={-37}
            >
              <PlaceTwoTone style={{ fontSize: "40px", color: "gold" }} />
              {pin.title && (
                <Popup>
                  <Image src={pin.image}></Image>
                  <Info>
                    <Title>{pin.title}</Title>
                    <Desc>{pin.description}</Desc>
                  </Info>
                </Popup>
              )}
            </Marker>
          </PinWrapper>
        )}
      </MapGL>
    </MapWrapper>
  );
};

Map.propTyles = {
  mapStyle: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  pin: PropTypes.object,
  handleCordsChange: PropTypes.func,
  initViwport: PropTypes.object,
};

export default Map;
