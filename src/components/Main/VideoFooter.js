import React, { useState, useEffect } from "react";
import "./VideoFooter.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
// import InsertCommentIcon from "@material-ui/icons/InsertComment";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { db } from "../../firebase";
import firebase from "firebase";
import CommentsModal from "./Comments/CommentsModal";
import LoginPopover from './popOverLogin'

// to FIX posting likes in DB

const VideoFooter = ({ id, description, seller, user, sellerLink }) => {
  const [liked, setLiked] = useState(false);
  const [likesCounter, setLikesCounter] = useState(0);
  // let userLiked = db
  //   .collection("videos")
  //   .doc(id)
  //   .collection("likes")
  //   .doc(user.uid);

  useEffect(() => {
    let likesCount;
    likesCount = db
      .collection("videos")
      .doc(id)
      .collection("likes")
      .onSnapshot((snapshot) => {
        // console.log(snapshot.length);
        setLikesCounter(snapshot.size);
      });
    return () => {
      likesCount();
    };
  }, [id]);
///TO FIX : a modal popUp for the case user === null
  const onLikeClick = () => {
    if (user !== null) {
      setLiked(true);
      db.collection("videos").doc(id).collection("likes").doc(user.uid).set({
        likes: 1,
        username: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } else {
      console.log("login");
    }

    // userLiked? console.log('ok'):console.log('Nope');
  };
  const onUnLikeClick = () => {
    if (user !== null) {
      setLiked(false);
      db.collection("videos")
        .doc(id)
        .collection("likes")
        .doc(user.uid)
        .delete();
    } else if (user == null) {
      console.log("login");

    }
    // userLiked? console.log('ok'):console.log('Nope');
  };

  return (
    <div className="videoFooter">
      <div className="videoFooter__text">
        <a href={sellerLink}>
          <h3>{seller}</h3>
          <p>{description}</p>
        </a>
      </div>
      <div className="videoFooter__Buttons__container">
        <div className="videoFooter__btn">
          <CommentsModal videoId={id} seller={seller} user={user} />
        </div>
        <div className="videoFooter__btn">
          {liked ? (
            <FavoriteIcon fontSize="large" onClick={onUnLikeClick} />
          ) : (
            <FavoriteBorderIcon fontSize="large" onClick={onLikeClick} />
          )}
          <p>{likesCounter}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoFooter;
