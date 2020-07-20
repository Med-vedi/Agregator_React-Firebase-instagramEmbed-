import React from "react";
import "./PostCard.css";


const PostCard = () => {
  return (
    <div className="postcard__card">
      <img className="postcard__img" src="jeans3.jpg" alt="Denim Jeans" />
      <h1>Tailored Jeans</h1>
      <p>
        <button className="postcard__card_button">Add to Cart</button>
      </p>
    </div>
  );
};

export default PostCard;
