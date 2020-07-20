import React from "react";
import './Plug.css'
import img from '../img/plug.jpg'

const Plug = () => {
  return (
    <div>
      <div className="plug__container">
        <img src={img} alt="Avatar" className="plug__image" />
        <div className="plug__overlay">
          <div className="plug__text">Coming soon</div>
        </div>
      </div>
    </div>
  );
};

export default Plug