import React from "react";
import './Card.css';

export const Card = ({ title, backdrop, rating }) => {
  const img = `https://image.tmdb.org/t/p/w500/${backdrop}`;

  return (
    <div className="movieCard">
      <img src={img} />
      <div>
        <h3>{title}</h3>
        
        <p>{rating}</p>
      </div>
     
    </div>
  );
};