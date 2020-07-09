import React from "react";
import { Avatar } from "@material-ui/core";
import "./Post.css";

function Post({imageUrl, username, caption}) {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="Vladi"
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>
      <img className="post__image" src={imageUrl} alt="" />
      <h4 className="post__text">
        <strong>LetiShop</strong>: {caption}
      </h4>
    </div>
  );
}

export default Post;
