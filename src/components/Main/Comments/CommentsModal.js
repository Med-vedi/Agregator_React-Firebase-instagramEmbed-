import React, { useState, useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import "./Comments.css";
import { db } from "../../../firebase";
import firebase from "firebase";

export default function CommentsModal({ id, user, seller }) {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const placeholder = `Add comment to ${seller}`
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    let unsubscribe;
    if (id) {
      unsubscribe = db
        .collection("videos") 
        .doc(id)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [id]);

  const postComment = (e) => {
    e.preventDefault();
    db.collection("videos").doc(id).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  const body = (
    <div className="post">
      <div className="post__comments" key={id}>
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
        <p>0</p>
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
