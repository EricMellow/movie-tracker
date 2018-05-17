import React from "react";

export const Card = ({ title, backdrop, overview })=>{
  return (
    <div>
      <h1>{title}</h1>
      <p>{overview}</p>
    </div>
  );
};