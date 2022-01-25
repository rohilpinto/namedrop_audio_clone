import React, { useEffect, useState } from "react";

import { Divider, Tooltip, Button, Typography, Grid } from "antd";

import ReactCardFlip from "react-card-flip";
import audioGif from "../assets/audio_play.gif";

import { DoubleLeftOutlined, DoubleRightOutlined, PauseCircleFilled, PlayCircleFilled } from "@ant-design/icons/lib/icons";
import Loading from "./Loading";

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const AudioProfileCard = ({ name = "yourname", profilePic = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png", profileAudio, phoneticName = "yourname", pronoun = "yourname" }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [playingSlow, setPlayingSlow] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const [audio] = useState(new Audio(profileAudio));

  const handlePlay = () => {
    setPlaying(!playing);
  };

  useEffect(() => {
    setPlaying(false);
    setPlayingSlow(false);
  }, [isFlipped]);

  useEffect(() => {
    audio.src = profileAudio;
  });

  const handleSlowPLay = () => {
    // audio.playbackRate = 0.5;
    setPlayingSlow(!playingSlow);
  };

  useEffect(() => {
    setPlayingSlow(false);
    audio.currentTime = 0;
    audio.playbackRate = 1;
    playing ? audio.play() : audio.pause();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  useEffect(() => {
    setPlaying(false);

    audio.currentTime = 0;
    audio.playbackRate = 0.5;
    playingSlow ? audio.play() : audio.pause();

    // playingSlow ? audio.play() : audio.pause();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playingSlow]);

  useEffect(() => {
    audio.addEventListener("ended", () => {
      setPlaying(false);
      setPlayingSlow(false);
    });

    return () => {
      audio.removeEventListener("ended", () => {
        setPlaying(false);
        setPlayingSlow(false);
      });
    };
  });

  const { xs } = useBreakpoint();

  // styles

  const containerStyles = {
    background: "white",
    borderRadius: "5px",
    padding: "20px",

    minWidth: `${xs ? "250px" : "290px"}`,
    height: "440px",
  };

  const nameContainerStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
  };

  return (
    <ReactCardFlip isFlipped={isFlipped}>
      {/* front-card */}
      <div style={containerStyles}>
        <div style={{ textAlign: "right" }}>
          {/* flip-arrow */}
          <Button shape="circle" icon={<DoubleRightOutlined style={{ fontSize: "20px", color: "black" }} />} onClick={() => setIsFlipped(true)} />
        </div>

        <div style={nameContainerStyles}>
          {!imageLoaded ? <Loading /> : null}
          <img width={100} src={profilePic} alt="img" onLoad={() => setImageLoaded(true)} style={!imageLoaded ? { display: "none" } : { borderRadius: "100px", width: "150px", height: "150px", objectFit: "cover" }} />
          <Title level={3} style={{ fontWeight: "400", margin: "5px 0" }}>
            {name}
          </Title>
          <Tooltip title="Phonetic Name" arrowPointAtCenter placement="bottom">
            <Paragraph style={{ fontSize: "18px", fontWeight: "300", margin: 0, color: "#90a4ae" }}>({phoneticName})</Paragraph>
          </Tooltip>
          <Divider style={{ margin: "5px" }} />
          <Paragraph style={{ fontWeight: "300", margin: 0, color: "#90a4ae", fontSize: "18px" }}>{pronoun}</Paragraph>
          <Tooltip title="Click to hear name" arrowPointAtCenter placement="bottom" defaultVisible>
            {!playing ? <PlayCircleFilled style={{ fontSize: "50px", color: "#e16643" }} onClick={handlePlay} /> : <PauseCircleFilled style={{ fontSize: "50px", color: "#e16643" }} onClick={handlePlay} />}
          </Tooltip>
          {playing ? (
            <div sstylex={{ marginTop: 1 }}>
              <img src={audioGif} alt="" />
            </div>
          ) : null}
        </div>
      </div>

      {/* back-card */}

      <div style={containerStyles}>
        <div style={{ textAlign: "right" }}>
          {/* flip-arrow */}
          <Button shape="circle" icon={<DoubleLeftOutlined style={{ fontSize: "20px", color: "black" }} />} onClick={() => setIsFlipped(false)} />
        </div>

        <div style={nameContainerStyles}>
          <Title level={3} style={{ fontWeight: "400", margin: "5px 0" }}>
            Play at 0.75 speed
          </Title>

          <Tooltip title="Phonetic Name" arrowPointAtCenter placement="bottom">
            <Paragraph style={{ fontSize: "18px", fontWeight: "300", margin: 0, color: "#90a4ae" }}>({phoneticName})</Paragraph>
          </Tooltip>

          <Divider style={{ margin: "5px" }} />

          {
            <Tooltip title="Click to hear name" arrowPointAtCenter placement="bottom">
              {!playingSlow ? <PlayCircleFilled style={{ fontSize: "50px", color: "blue" }} onClick={handleSlowPLay} /> : <PauseCircleFilled style={{ fontSize: "50px", color: "blue" }} onClick={handleSlowPLay} />}
            </Tooltip>
          }

          {playingSlow ? (
            <div style={{ marginTop: 1 }}>
              <img src={audioGif} alt="" />
            </div>
          ) : null}
        </div>
      </div>
    </ReactCardFlip>
  );
};

export default AudioProfileCard;
