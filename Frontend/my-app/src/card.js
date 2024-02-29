import React from 'react';
import './css/Card.css'; // Import your CSS file for styling

function Card({image,title,description, id, handleClick}) {
  return (
    <div className="card" onClick={() =>handleClick(id)}>
      <img src={image}  alt={title} />
      <div className="card-body">
        <h3 className="card-title">{title.substring(0, 50)}</h3>
        <p className="card-text">{description.substring(0, 30)}</p>
      </div>
    </div>
  );
}

export default Card;
