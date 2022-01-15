import React, { useEffect, useState } from "react";
import { Box, Card, Divider, Typography, CardMedia, IconButton, Tooltip, Fade } from "@mui/material";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import audioGif from "../assets/audio_play.gif";
import PauseIcon from "@mui/icons-material/Pause";

const AudioProfileCard = ({ name = "yourname", profilePic = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png", audio: audioprop, phoneticName = "yourname", pronoun = "yourname" }) => {
  const [toolTip, setToolTip] = useState(true);
  const [playing, setPlaying] = useState(false);
  const handlePlay = () => {
    setPlaying(!playing);
  };

  // const handlePause = () => {
  //   setPlayAudio(!playAudio);
  // };

  const [audio] = useState(new Audio(audioprop));

  useEffect(() => {
    playing ? audio.play() : audio.pause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fade in={true}>
      <Card sx={{ bgcolor: "", width: "310px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", p: 2, gap: 2 }}>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Box component="img" src={profilePic} alt="profile" sx={{ borderRadius: "100px", width: "120px" }} />
        </Box>
        <Box sx={{ width: "80%", textAlign: "center", "p, h1,h2,h3,h4,h5,h6": { color: "#263238" } }}>
          {/* name */}
          <Typography variant="h4" component="h1" sx={{ fontSize: "24px" }}>
            {name}
          </Typography>
          <Tooltip title="Phonetic Name" sx={{ bgcolor: "black" }} arrow>
            <Typography variant="h5" color={"#90a4ae !important"} sx={{ fontSize: "18px", mt: 1 }}>
              ({phoneticName})
            </Typography>
          </Tooltip>
          <Divider sx={{ width: "100px", margin: "auto", mt: 1 }} />

          <Typography variant="body1" sx={{ mt: 1 }} color={"#90a4ae !important"} fontWeight={"500"}>
            {pronoun}
          </Typography>

          {/* audio */}
        </Box>
        <Box>
          <Tooltip open={toolTip} onClose={() => setToolTip(false)} title="Click to hear name" sx={{ bgcolor: "black" }} arrow>
            <IconButton
              sx={{ bgcolor: "#e16643", color: "#fff", "&:hover": { bgcolor: "#ff987b", color: "grey" } }}
              onClick={() => {
                handlePlay();
                setToolTip(false);
              }}
            >
              {!playing ? <PlayArrowIcon sx={{ height: 38, width: 38 }} /> : <PauseIcon sx={{ height: 38, width: 38 }} />}
            </IconButton>
          </Tooltip>
        </Box>
        {/* animation on audio play */}

        {playing ? (
          <Fade easing={{ enter: "0.9", exit: "0.9" }} in={playing} sx={{ mt: 1 }}>
            <img src={audioGif} alt="" />
          </Fade>
        ) : null}
      </Card>
    </Fade>
  );
};

export default AudioProfileCard;
