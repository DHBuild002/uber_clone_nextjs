import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import mapboxgl from "!mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGhidWlsZDAwMiIsImEiOiJja3ZyMDBmZWwybzlxMm50a3YwMTBvM2JyIn0.GXKz4g_RkjmeUo7px9eduQ";

const Map = (props) => {
  console.log(props);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "Map",
      style: "mapbox://styles/dhbuild002/ckvr1194ugh3m14nn7ibcnyck",
      center: [-99.29011, 39.39172, 60.0365],
      zoom: 3,
    });
    if (props.pickupCoords) {
      addToMap(map, props.pickupCoords);
    }
    if(props.dropOffCoords){
      addToMap(map, props.dropOffCoords)
    }

    if(props.pickupCoords && props.dropOffCoords){
      map.fitBounds([
        props.pickupCoords, props.dropOffCoords
      ], {
      padding: 50
      })
    }


  }, [props.pickupCoords, props.dropOffCoords]);
  // Apply a new marker
  const addToMap = (map, coords) => {
    const marker = new mapboxgl.Marker().setLngLat(coords).addTo(map);
  };

  return <Wrapper id="Map"> </Wrapper>;
};

const Wrapper = tw.div`
  flex-1 flex-col bg-red-200 h-screen h-1/2
`;

export default Map;
