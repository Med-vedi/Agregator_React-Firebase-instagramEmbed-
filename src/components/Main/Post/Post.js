import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import "./Post.css";
import { db } from "../../../firebase";
import firebase from "firebase";

function Post({ postId, videoUrl, imageUrl, username, user, caption }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        // .collection("cards") // VideoVersion
        .collection("posts") // VideoVersion

        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();
    // db.collection("cards").doc(postId).collection("comments").add({// VideoVersion
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={username}
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>
      <div className="post__img-hover-zoom">
        <img className="post__image" src={imageUrl} alt="" />
 
        { /* <video // VideoVersion

          className="post__image"
          src={videoUrl}
          alt=""
          onClick={(e) => e.target.play()}
        /> */}
      </div>
      <h4 className="post__text">
        <strong>{username}</strong>: {caption}
      </h4>
      <div className="post__comments" key={postId}>
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
            placeholder="Add a comment..."
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
}

export default Post;
