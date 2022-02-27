import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import tw from "tailwind-styled-components";
import Map from "./components/Map";
import Link from "next/link";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user.displayName,
          photoUrl: user.photoURL,
        });
        // console.log(user.photoURL);
      } else {
        setUser(null);
        router.push("/login");
      }
    });
  }, []);

  return (
    <Wrapper>
      <Map id="Map"></Map>
      <ActionItems>
        {/* Header */}
        <Header>
          <UberLogo src="https://i.ibb.co/84stgjq/uber-technologies-new-20218114.jpg" />
          <Profile>
            <Name>Hi, {user && user.name} </Name>
            <UserImage
              src={user && user.photoUrl}
              onClick={() => signOut(auth)}
            />
          </Profile>
        </Header>
        {/* ActionButtons */}
        <ActionButtons>
          <Link href="/search">
            <ActionButton>
              <ActionButtonImage src="https://i.ibb.co/cyvcpfF/uberx.png" />
              Ride
            </ActionButton>
          </Link>
          <ActionButtonCS>
            <ActionButtonImage src="https://i.ibb.co/n776JLm/bike.png" />
            Wheels
          </ActionButtonCS>
          <ActionButtonCS>
            <ActionButtonImage src="https://i.ibb.co/5RjchBg/uberschedule.png" />
            Reserve
          </ActionButtonCS>
        </ActionButtons>

        {/* Input Button */}
        <Link href="/search">
          <InputButton>Where to?</InputButton>
        </Link>
      </ActionItems>
    </Wrapper>
  );
}
const Wrapper = tw.div`
  flex flex-col h-screen
`;
/*
const Map = tw.div`
  bg-red-500 flex-1
`;*/
const ActionItems = tw.div`
 flex-1 p-4
`;
const Header = tw.div`
flex justify-between items-center
`;
const UberLogo = tw.img`
h-28
`;
const Name = tw.div`
mr-4 w-20
`;
const UserImage = tw.img`
h-12 w-12 rounded-full border-gray-100 p-px cursor-pointer
`;

const Profile = tw.div`
flex items-center 
`;
const ActionButtons = tw.div`
flex 
`;
const ActionButton = tw.div`
flex bg-gray-200 flex-1 cursor-pointer m-1 h-32 items-center flex-col justify-center rounded-lg transform hover:scale-95 transition text-xl
`;
const ActionButtonCS = tw.div`
flex bg-blend-darken blur-xl bg-gray-500 flex-1 cursor-not-allowed m-1 h-32 items-center flex-col justify-center rounded-lg transform transition text-xl
`;
const ActionButtonImage = tw.img`
h-3/5 mix-blend-multiply
`;
const InputButton = tw.div`
h-20 bg-gray-200 text-2xl p-4 flex items-center mt-8 cursor-pointer
`;
