import React,{useState,useEffect} from 'react';
import Navbar from '../defaults/navbar';
import Footer from '../defaults/footer';
import Sidebar from './sidebar';
import Statics from './statics';
import GenreOverview from './genreoverview'
import {  Link,redirect,useNavigate } from "react-router-dom";
import { getUsername } from '../Auth/Login';
import "../css/profile.css";

function Profile () {

  
  const navigate = useNavigate();

  useEffect(() => {
    const username = getUsername();
    if(!!username){
      console.log("passed")
    }
    else{
      navigate('/login');
    }
    insertArticle()
  }, []);

  const [stats,setstats]=useState({
    totalmovies:'',
    peoplefollowing:'',
    average_score:'',
    email:'',
    pplfollowing:[],
    favorites:[],
    Action:'0',
    Adventure:'0',
    Animation:'0',
    Comedy:'0',
    Crime:'0',
    Drama:'0',
    Family:'0',
    Fantasy:'0',
    History:'0',
    Horror:'0',
    Music:'0',
    Mystery:'0',
    Romance:'0',
    Science_Fiction:'0',
    Thriller:'0',
    TV_Movie:'0',
    War:'0',
    Western:'0',
      })
  
  const loggedinuser=getUsername()

  function InsertArticle(body){
    return fetch(`http://127.0.0.1:5000/profilestatics`,{
          'method':'POST',
           headers : {
          'Content-Type':'application/json'
      },
      body:JSON.stringify(body)
    })
  .then(response => response.json())
  .then(jsonData => {
    
    setstats(jsonData)
    console.log(jsonData)
    })
  .catch(error => console.log(error))
  }

  const insertArticle = () =>{
        InsertArticle({loggedinuser})
        .then((response) => InsertArticle(response))
        .catch(error => console.log('error',error))
      }
    const handleDivisionClick = (divisionName) => {
        navigate(`/people/${divisionName}`); 
      };

      const handleDivisionClick1 = (divisionName) => {
        navigate(`/movie/${divisionName}`); 
      };


const ppl_img="https://image.tmdb.org/t/p/w500"
const movie_img="https://image.tmdb.org/t/p/w500"

	return (
    <div className='appp'>
      <Navbar/>
      <div className='topcontainer'>
        <div className="profile-section"><Sidebar username={loggedinuser} email={stats.email}/></div>
          <Statics totalmovies={stats.totalmovies } peoplefollowing={stats.peoplefollowing} average_score={stats.average_score} />
        <GenreOverview
        Action={stats.Action}
        Adventure={stats.Adventure}
        Animation={stats.Animation}
        Comedy={stats.Comedy}
        Crime={stats.Crime}
        Drama={stats.Drama}
        Family={stats.Family}
        Fantasy={stats.Fantasy}
        History={stats.History}
        Horror={stats.Horror}
        Music={stats.Music}
        Mystery={stats.Mystery}
        Romance={stats.Romance}
        Science_Fiction={stats.Science_Fiction}
        Thriller={stats.Thriller}
        TV_Movie={stats.TV_Movie}
        War={stats.War}
        Western={stats.Western}
        />
      </div>
      <div className='favandfollow'>
        <div className='section'>
          <h3 className='favoritesmovies'>Favorites</h3>
          <div className='outerbox'>
            <div className='gridbox'>
            { stats.favorites.map(item => (
            <div onClick={() => handleDivisionClick1(item[0])}>
              <img src={movie_img+item[1]}/>
            </div>
            
            
        
        ))}
            </div>
          </div>

        </div>
        <div className='section'>
          <h3 className='followingppls'>Following</h3>
          <div className='outerbox'>
          { stats.pplfollowing.map(item => (
            <div className='gridbox' onClick={() => handleDivisionClick(item[0])}>
              <div className='pplbox'>
                <img src={ppl_img+item[2]} className='pplposter'/>
                <div>
                  <p className='pplname'>{item[1]}</p>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
	);
}

export default Profile;



