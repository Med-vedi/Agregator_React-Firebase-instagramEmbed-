import React, { useRef } from "react";

import "./Video.css";
import cls from "classnames";
import { useState } from "react";
import VideoFooter from "./VideoFooter";
// import { db } from "../../../firebase";
// import { useEffect } from "react";

const Video = ({ videoId, videoUrl, description, seller, likes, user }) => {
  // console.log({videoUrl});
  const videoRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const handlePostClick = () => {
    setOpen((s) => !s);
  };

  const onVideoPress = () => {
    if (playing) {
      handlePostClick();
      videoRef.current.pause();
      setPlaying(false);
    } else {
      handlePostClick();
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div className={cls(`video`, { video__open: isOpen })}>
      <video
        className={cls(`video__player`, { video__open: isOpen })}
        // loop
        onClick={onVideoPress}
        playsInline
        ref={videoRef}
        src={videoUrl}
      ></video>
      <div className="video__footer">
        <VideoFooter
          id={videoId}
          likes={likes}
          seller={seller}
          description={description}
          user={user}
        />
      </div>
    </div>
  );
};

export default Video;
