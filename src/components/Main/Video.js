import React, { useRef } from "react";

import "./Video.css";
import cls from "classnames";
import { useState } from "react";
import VideoFooter from "./VideoFooter";

const Video = ({
  videoId,
  videoUrl,
  description,
  seller,
  sellerLink,
  user,
}) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const handleVideoClick = () => {
    setOpen((s) => !s);
  };

  const onVideoPlayerClick = () => {
    if (playing) {
      handleVideoClick();
      videoRef.current.pause();
      setPlaying(false);
    } else {
      handleVideoClick();
      videoRef.current.play();
      setPlaying(true);
    }
  };
  return (
    <div className={cls(`video`, { video__open: isOpen })}>
      <div className={cls(`video__player`, { video__open: isOpen })}>
        <video
          // poster={Img}
          onClick={onVideoPlayerClick}
          playsInline
          ref={videoRef}
          src={videoUrl}
        ></video>
        <div className="video__footer">
          <VideoFooter
            id={videoId}
            seller={seller}
            description={description}
            user={user}
            sellerLink={sellerLink}
          />
        </div>
      </div>
    </div>
  );
};

export default Video;
