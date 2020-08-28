import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import "./Comments.css";
import { db } from "../../../firebase";
import firebase from "firebase";

export default function CommentsModal({ videoId, user, seller }) {
  const [open, setOpen] = useState(false);

  const [comments, setComments] = useState([]);
  const [commentsCounter, setCommentsCounter] = useState(0);

  const [comment, setComment] = useState("");

  const placeholder = `Add comment to ${seller}`;
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let unsubscribe;
    let countComments;
    if (videoId) {
      unsubscribe = db
        .collection("videos")
        .doc(videoId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
      countComments = db
        .collection("videos")
        .doc(videoId)
        .collection("comments")
        .get()
        .then(function (querySnapshot) {
          // console.log(querySnapshot.size);
          setCommentsCounter(querySnapshot.size);
        });
    }

    return () => {
      // countComments();
      unsubscribe();
    };
  }, [videoId]);

  const postComment = (e) => {
    e.preventDefault();
    db.collection("videos").doc(videoId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  const body = (
    <div className="post">
      <div className="post__comments" key={videoId}>
        {comments.map((comment) => (
          <p className="post__comments_comment">
            <b>{comment.username}</b> {comment.text}
          </p>
        ))}
      </div>
      {user ? (
        <form className="post__commentBox">
          <input
            className="post__input"
            placeholder={placeholder}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
          />
          <button
            disabled={!comment}
            className="post__button"
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      ) : (
        <p className="post__danger">Login to comment</p>
      )}
    </div>
  );

  return (
    <div>
      <div className="videoFooter__btn">
        <InsertCommentIcon fontSize="large" onClick={handleOpen} />
        <p>{commentsCounter}</p>
      </div>

      <Modal
        onOpen={handleOpen}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
