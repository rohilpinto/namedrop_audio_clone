import React, { useEffect, useState } from "react";
import AudioProfileCard from "./components/AudioProfileCard";

import { useParams } from "react-router-dom";

import logo from "./assets/namedroplogowhite.png";

import fallbackImage from "./assets/bg.jpg";

const ShowDrop = () => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(false);

  const { id } = useParams();

  const URL = `https://api.user.namedrop.io/profile?username=${id}`;

  // fetch

  const abortContrl = new AbortController();

  const fetchData = async () => {
    try {
      const req = await fetch(URL, { signal: abortContrl.signal });
      const res = await req.json();
      const data = JSON.parse(res.data);

      setUserData({ id: data[2], fullName: data[2] + " " + data[3], profilePic: data[14], phoneticName: data[7] + " " + data[8], pronoun: data[6], profileAudio: data[10], pathid: data[0], bgimage: data[13] });
    } catch (error) {
      if (error === "AbortSignal") {
        console.log("Fetch Aborted");
      } else {
        setError(true);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      abortContrl.abort();
    };
  }, []);

  return (
    <div style={{ height: "100vh", backgroundImage: `url(${!userData.bgimage === "" ? userData.bgimage : fallbackImage})`, backgroundSize: "cover", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ padding: 5, position: "absolute", top: "5px", left: "10px" }}>
        {/* logo */}

        <img src={logo} alt="logo" />
      </div>
      {/* card */}

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {error ? <AudioProfileCard /> : <AudioProfileCard name={userData.fullName} profileAudio={userData.profileAudio} phoneticName={userData.phoneticName} pronoun={userData.pronoun} pathid={userData.pathid} profilePic={userData.profilePic} />}
      </div>
    </div>
  );
};

export default ShowDrop;
