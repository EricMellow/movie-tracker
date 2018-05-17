import React from "react";

export const Card = ({ title, backdrop, overview, rating }) => {
  const img = `https://image.tmdb.org/t/p/w500/${backdrop}`;

  return (
    <div>
      <img src={img} />
      <h1>{title}</h1>
      <p>{overview}</p>
      <p>{rating}</p>
    </div>
  );
};