import React, { useEffect, useState } from "react";
import AudioProfileCard from "./components/AudioProfileCard";

import { useParams } from "react-router-dom";
import { audioProfileCardList } from "./const";

import logo from "./assets/namedroplogowhite.png";

import bgImage from "./assets/bg.jpg";

const ShowDrop = () => {
  const [Pathlist, setList] = useState([]);
  const { id } = useParams();

  console.log(id);
  useEffect(() => {
    setList(audioProfileCardList.filter((list) => list.pathid == id));
  }, [id]);

  return (
    <div style={{ height: "100vh", backgroundImage: `url(${bgImage})`, backgroundSize: "cover", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ padding: 5, position: "absolute", top: "5px", left: "10px" }}>
        {/* logo */}

        <img src={logo} alt="sd" />
      </div>
      {/* card */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {Pathlist.length === 0 ? (
          <AudioProfileCard />
        ) : (
          Pathlist?.map((list) => {
            return <AudioProfileCard key={list.id} name={list.name} audio={list.audio} phoneticName={list.phoneticName} pronoun={list.pronoun} pathid={list.pathid} profilePic={list.profilePic} />;
          })
        )}
      </div>
    </div>
  );
};

export default ShowDrop;
