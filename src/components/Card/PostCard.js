import React from "react";
import "./PostCard.css";
import img from "../../img/adi2.jpg";
import { Button } from "@material-ui/core";

const PostCard = () => {
  return (
    <div className="postcard__card">
      <div className="postcard__img-hover-zoom">
        <img className="postcard__img" src={img} alt="" />
      </div>
      {/* <h1>Tailored Jeans</h1> */}
      <p>
        <Button className="postcard__card_button" color="secondary" variant='outlined'>Go to Profile</Button>
      </p>
    </div>
  );
};

export default PostCard;
