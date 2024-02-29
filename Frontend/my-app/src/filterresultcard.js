import React from 'react';
import './css/filtercard.css'; // Import your CSS file for styling

function FilterCard(props) {
  return (
    <div className="fcard">
      <img src={props.image}  alt={props.title} />
      <div className="fcard-body">
        <h3 className="fcard-title">{props.title.substring(0, 50)}</h3>
        <p className="fcard-text">{props.description.substring(0, 30)}</p>
      </div>
    </div>
  );
}

export default FilterCard;
