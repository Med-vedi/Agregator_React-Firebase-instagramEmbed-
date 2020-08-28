import React, { useRef } from "react";

import "./Video.css";
import cls from "classnames";
import { useState } from "react";
import VideoFooter from "./VideoFooter";
import Img from "../../img/123.png";
// import VideoThumbnailSelector from 'react-video-thumbnail';

const Video = ({ videoId, videoUrl, description, seller, sellerLink, user }) => {
  // console.log({comments});
  const videoRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false)


  const handleVideoClick = () => {
    setOpen((s) => !s);
    setHidden ((s)=> !s)
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
    <div className={cls(`video`, { video__open: isOpen})}>
      <div className={cls(`video__player`, { video__open: isOpen })}>
        {/* <div className="video__player__text">Play</div> */}
        {/* <img src={Img} className={cls({video__poster: hidden })} alt="poster" onClick={onVideoPlayerClick} /> */}
        <video
        poster={Img}
          onClick={onVideoPlayerClick}
          playsInline
          ref={videoRef}
          src={videoUrl}
          snapshotAt={10}
        ></video>
        {/* <VideoThumbnailSelector videoSrc={videoUrl} snapshotAt={10}/> */}
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
