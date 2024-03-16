import React, {  useEffect, useState } from 'react'
import "./css/searchpage.css"
import Navbar from './defaults/navbar';
import Card from './card';
import SearchBar from './searchbar';
import {useNavigate} from 'react-router-dom';
import Footer from './defaults/footer';
import { getUsername } from './Auth/Login';

function Home() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [lists, setLists] = useState({
    recent: [],
    upcoming: [],
    recommend: [],
    top_rated: []
  });

  useEffect(() => {
    const username = getUsername();
    if(!!username){
      insertArticle();
      setIsLoggedIn(!!username);
    }
    else{
      navigate(`/login`)
    }
    
  }, []);
  
  


   function InsertArticle(body){
    return fetch(`http://127.0.0.1:5000`,{
          'method':'POST',
           headers : {
          'Content-Type':'application/json'
      },
      body:JSON.stringify(body)
    })
  .then(response => response.json())
  .then(jsonData => {
    setLists(jsonData)
    })
  .catch(error => console.log(error))
  }

  const insertArticle = () =>{
        const username = getUsername();
        InsertArticle({username})
        .then((response) => InsertArticle(response))
        .catch(error => console.log('error',error))
      }

 
  const navigate = useNavigate();

  const handleDivisionClick = (divisionName) => {
    navigate(`/movie/${divisionName}`); 
  };
  

  const styles = {
      color:"red",
      fontSize: '34px'
    }

  const consturl="https://image.tmdb.org/t/p/w500"

  return (
    <div>
      <Navbar />
      <div className='homepageposter'>
      </div>
      <div>
        <h1 className='welcomemessage'>Welcome {getUsername()}</h1>
      {isLoggedIn && (
          <>
          {lists.recommend && lists.recommend.length > 0 && (
              <>
                <h1 className='listtitle'>Recommendations</h1>
                <h2 className='recommendtitle'>Because You have watched <span style={styles}>{lists["recent"][0][1]}</span></h2>
                <div className='card-container'>
                {lists["recommend"].map(card => (
                <Card image={consturl + card[2]} title={card[1]} id={card[0]} description={card[3]} handleClick={handleDivisionClick} />
              ))}
                </div>
              </>
            )}  
            {lists.recent && lists.recent.length > 0 && (
              <>
                <h1 className='listtitle'>Recently Watched</h1>
                <div className='card-container'>
                  {lists["recent"].map(card => (
                    <Card image={consturl + card[2]} title={card[1]} id={card[0]} description={card[3]} handleClick={handleDivisionClick} />
                  ))}
                </div>
              </>
            )}  

            {lists.upcoming && lists.upcoming.length > 0 && (
              <>
                <h1 className='listtitle'>Upcoming from Planning</h1>
                <div className='card-container'>
                  {lists["upcoming"].map(card => (
                    <Card image={consturl + card[2]} title={card[1]} id={card[0]} description={card[3]} handleClick={handleDivisionClick} />
                  ))}
                </div>
              </>
            )}  

            
          </>
        )}
        
        {!isLoggedIn && (
          <>
          <div className='notlogged'>
            Login to check out all of our features.
          </div>
          </>
        )}




        {lists["top_rated"] && (
          <>
            <h1 className='listtitle'>Top Rated</h1>
            <div className='card-container'>
            {lists["top_rated"].map(card => (
                    <Card image={consturl + card[2]} title={card[1]} id={card[0]} description={card[3]} handleClick={handleDivisionClick} />
                  ))}
            </div>
          </>
        )}  
      </div>
      <Footer/>
    </div>
  );
}

export default Home;