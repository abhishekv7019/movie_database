import React from 'react';
import './css/cccard.css'; 

function Castcrewcard({image,title,description, id, handleClick}) {
  return (
    <div className="cccard"  onClick={() =>handleClick(id)}>
      <img src={image} />
      <div className="cccard-body">
        <h3 className="cccard-title">{title.substring(0, 50)}</h3>
        <p className="cccard-role">{description.substring(0, 30)}</p>
      </div>
    </div>
  );
}

export default Castcrewcard;