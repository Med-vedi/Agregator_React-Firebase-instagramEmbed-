import React, { useState } from "react";
import "./VideoFooter.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { db } from "../../firebase";
import firebase from "firebase";

// to FIX posting likes in DB

const VideoFooter = ({ id, likes, description, seller, user }) => {
  const [liked, setLiked] = useState(false);
  // console.log({id});

  const onLikeClick = () => {
    console.log({ id });

    setLiked(true);
    db.collection("videos")
      .doc(id)
      .collection("likes")
      .add({
        likes: likes + 1,
        username: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),

        //TO DO
      });
  };

  return (
    <div className="videoFooter">
      <div className="videoFooter__text">
        <h3>{seller}</h3>
        <p>{description}</p>
      </div>
      <div className="videoFooter__Buttons">
        {liked ? (
          <FavoriteIcon fontSize="large" onClick={(e) => setLiked(false)} />
        ) : (
          <FavoriteBorderIcon fontSize="large" onClick={onLikeClick} />
        )}
        <p>{liked ? likes + 1 : likes}</p>
      </div>
    </div>
  );
};

export default VideoFooter;
