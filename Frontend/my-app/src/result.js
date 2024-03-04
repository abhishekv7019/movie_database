import React ,{useState,useEffect}from "react";
import "./css/result.css"
import Navbar from './defaults/navbar';
import SearchBar from './searchbar';
import { useLocation,useNavigate } from 'react-router-dom';
import Footer from './defaults/footer';

function Result() { 
    

    const location = useLocation();
    const { jsonData} = location.state ;
    console.log("recived data in the result route"+jsonData)
    const url="https://image.tmdb.org/t/p/w500"
    

    useEffect(() => {
        window.scrollTo(0, 0)
      }, []);

    

    const navigate = useNavigate();

    const handleDivisionClick = (divisionName) => {
    
      navigate(`/movie/${divisionName}`); 
  
    };
  
    
    return(
        <div>
            <Navbar/>
            <SearchBar/>
            
                <div className="resultbox">
                {   jsonData.map(card => (
                    <div onClick={() => handleDivisionClick(card[2])}>
                        <img src={url+card[1]} />
                        <p>{card[0]}</p>
                    </div>
                ))}
            </div> 
            <Footer/>
        </div>
    );
}

export default Result;