import React from "react";
import tw from "tailwind-styled-components";
import { useState, useEffect } from "react";
import Map from "./components/Map";
import { useRouter } from "next/dist/client/router";
import RideSelector from "./RideSelector";
import Link from "next/link";

const Confirm = () => {
  const router = useRouter();
  const { pickup, dropOff } = router.query;
  console.log("Pickup", pickup);
  console.log("DropOff", dropOff);

  const [pickupCoords, setPickupCoords] = useState([0, 0]);
  const [dropOffCoords, setDropOffCoords] = useState([0, 0]);

  const getPickupCoords = (pickup) => {
    // hard coded destination: const location = "Santa Monica";
    // FETCH Function
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoiZGhidWlsZDAwMiIsImEiOiJja3ZyMDBmZWwybzlxMm50a3YwMTBvM2JyIn0.GXKz4g_RkjmeUo7px9eduQ",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.features[0].center);
        setPickupCoords(data.features[0].center);
      });
  };

  const getDropoffCoordinates = (dropOff) => {
    // hard coded destination: const dropOff = "Los Angeles";
    // FETCH Function
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropOff}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoiZGhidWlsZDAwMiIsImEiOiJja3ZyMDBmZWwybzlxMm50a3YwMTBvM2JyIn0.GXKz4g_RkjmeUo7px9eduQ",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.features[0].center);
        setDropOffCoords(data.features[0].center);
      });
  };
  useEffect(() => {
    getPickupCoords(pickup);
    getDropoffCoordinates(dropOff);
  }, [pickup, dropOff]);

  console.log(pickupCoords);
  console.log(dropOffCoords);

  return (
    <Wrapper>
       <ButtonContainer> 
         <Link href='/search'>
                <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
           </Link>
        </ButtonContainer>
      <Map pickupCoords={pickupCoords} dropOffCoords={dropOffCoords} />
      <RideContainer>
        <RideSelector pickupCoords={pickupCoords} dropOffCoords={dropOffCoords} />
        <Link href="/confirm">
          <ConfirmButtonContainer>
              <ConfirmButton> Confirm Ride </ConfirmButton>{" "}
          </ConfirmButtonContainer>
        </Link>
      </RideContainer>
    </Wrapper>
  );
};

export default Confirm;

const Wrapper = tw.div`
flex h-screen flex-col
`;
const ButtonContainer = tw.div`
px-4 position:relative absolute z-10 object-contain
`;
const BackButton = tw.img`
cursor-pointer bg-white rounded-full top-4 left-4 shadow-md cursor-pointer mt-5
`;
const RideContainer = tw.div`
flex-1 flex 
flex-col h-1/2
`;
const ConfirmButtonContainer = tw.div`
border-t-2 bg-gray-100
`;
const ConfirmButton = tw.div`
bg-black text-white text-center rounded-2xl text-md py-7 mx-5 my-5 mt-5 cursor-pointer h-auto
`