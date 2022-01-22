import React, { useEffect, useState } from "react";

import { Row, Col, Divider, Tooltip, Button, Typography, Grid } from "antd";

import ReactCardFlip from "react-card-flip";
import audioGif from "../assets/audio_play.gif";

import { DoubleLeftOutlined, DoubleRightOutlined, PauseCircleFilled, PlayCircleFilled } from "@ant-design/icons/lib/icons";

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const AudioProfileCard = ({ name = "yourname", profilePic = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png", audio: audioprop, phoneticName = "yourname", pronoun = "yourname" }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  // const [toolTip, setToolTip] = useState(true);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(!playing);
  };

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

  // const { xs, md, lg } = useBreakpoint();

  const containerStyles = {
    background: "white",
    borderRadius: "5px",
    padding: "20px",
    width: "290px",
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
        <div style={{ textAlign: "right" }} xs={{ display: "none" }}>
          {/* flip-arrow */}
          <Button shape="circle" icon={<DoubleRightOutlined style={{ fontSize: "20px", color: "black" }} />} onClick={() => setIsFlipped(true)} />
        </div>

        <div style={nameContainerStyles}>
          <img width={100} src={profilePic} alt="img" style={{ borderRadius: "100px" }} />
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
          <img width={100} src={profilePic} alt="img" style={{ borderRadius: "100px" }} />
          <Title level={3} style={{ fontWeight: "400", margin: "5px 0" }}>
            {name}
          </Title>

          <Tooltip title="Phonetic Name" arrowPointAtCenter placement="bottom">
            <Paragraph style={{ fontSize: "18px", fontWeight: "300", margin: 0, color: "#90a4ae" }}>({phoneticName})</Paragraph>
          </Tooltip>

          <Divider style={{ margin: "5px" }} />

          <Paragraph style={{ fontWeight: "300", margin: 0, color: "#90a4ae", fontSize: "18px" }}>{pronoun}</Paragraph>

          {
            <Tooltip title="Click to hear name" arrowPointAtCenter placement="bottom">
              {!playing ? <PlayCircleFilled style={{ fontSize: "50px", color: "#e16643" }} onClick={handlePlay} /> : <PauseCircleFilled style={{ fontSize: "50px", color: "#e16643" }} onClick={handlePlay} />}
            </Tooltip>
          }

          {playing ? (
            <div sstylex={{ marginTop: 1 }}>
              <img src={audioGif} alt="" />
            </div>
          ) : null}
        </div>
      </div>
    </ReactCardFlip>
  );
};

export default AudioProfileCard;
