import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { carList } from "./data/carList.js";
import Link from "next/link";

const RideSelector = ({pickupCoords, dropOffCoords}) => {
  const [rideDuration, setRideDuration] = useState(0);

  useEffect(() => {
    const api_key =
      "pk.eyJ1IjoiZGhidWlsZDAwMiIsImEiOiJja3ZyMDBmZWwybzlxMm50a3YwMTBvM2JyIn0.GXKz4g_RkjmeUo7px9eduQ";
    fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoords[0]}, ${pickupCoords[1]}; ${dropOffCoords[0]}, ${dropOffCoords[1]}?access_token=${api_key}`
    )
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.routes) {
            setRideDuration(data.routes[0].duration / 100);
        };
    })
}, [pickupCoords, dropOffCoords]);
  return (
    <Wrapper>
      <Title>Choose a ride or swipe up for more options</Title>
      <CarList>
        {carList.map((car, index) => (
          <Car key={index}>
            <CarImage src={car.imgUrl} />
            <CarDetails>
              <Service>{car.service}</Service>
              <Time> {(rideDuration).toFixed(0)} minutes away </Time>
            </CarDetails>
            <Price> {'£' + (rideDuration * car.multiplier).toFixed(2)} </Price>
          </Car>
        ))}
      </CarList>
    </Wrapper>
  );
};

export default RideSelector;

const Wrapper = tw.div`
flex-1 bg-grey-500 overflow-y-scroll flex flex-col
`;
const CarList = tw.div`
overflow-y-scroll
`;
const Title = tw.div`
text-gray-500 text-xs text-center py-2 border-b
`;
const Car = tw.div`
flex h-15 p-4 item-center
`;
const CarImage = tw.img`
w-14 mr-2`;
const CarDetails = tw.div`
flex-1`;
const Service = tw.div`
font-medium`;
const Time = tw.div`
text-xs text-blue-500`;
const Price = tw.div`
text-sm mt-5`;
