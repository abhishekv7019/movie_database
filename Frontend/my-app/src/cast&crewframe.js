import React from 'react';
import './css/cccard.css'; 

function Castcrewcard(props) {
  return (
    <div className="cccard">
      <img src={props.image}  alt={props.title}  />
      <div className="cccard-body">
        <h3 className="cccard-title">{props.title.substring(0, 50)}</h3>
        <p className="cccard-role">{props.description.substring(0, 30)}</p>
      </div>
    </div>
  );
}

export default Castcrewcard;