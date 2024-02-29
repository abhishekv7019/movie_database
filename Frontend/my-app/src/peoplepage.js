import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import NavbarTransparent from "./defaults/navbarTransparent";



const Division = ({ name, onClick }) => {
    return (
      <div className="division" onClick={() => onClick(name)}>
        {name}
      </div>
    );
  };




function People(){
  const navigate = useNavigate();

    const [clickedDivision, setClickedDivision] = useState(null);

  
    const handleDivisionClick = (divisionName) => {
      setClickedDivision(divisionName);
      navigate(`/movie/${divisionName}`); 

    };
  
    return (
      <div className="app">
        {/* Render Divisions */}
        <Division name="division 1" onClick={handleDivisionClick} />
        <Division name="division 2" onClick={handleDivisionClick} />
        <Division name="division 3" onClick={handleDivisionClick} />
  
        
        <p>Clicked Division: {clickedDivision}</p>
      </div>
    );
}

export default People;