import React, { useState , useEffect } from 'react';
import {useNavigate , useParams} from 'react-router-dom';
import NavbarTransparent from "./defaults/navbarTransparent";
import Footer from './defaults/footer';
import "./css/peoplepage.css"
import { getUsername } from './Auth/Login';




function People(){

  
  let { peopleid } = useParams();
 

  const navigate = useNavigate();

  

  useEffect(() => {
    insertArticle()
    window.scrollTo(0, 0)
  }, []);
   

  


   function InsertArticle(body){
    return fetch(`http://127.0.0.1:5000/peoplepage`,{
          'method':'POST',
           headers : {
          'Content-Type':'application/json'
      },
      body:JSON.stringify(body)
    })
  .then(response => response.json())
  .then(jsonData => {
    setPeopledetails(jsonData)
    })
  .catch(error => console.log(error))
  }

  const insertArticle = () =>{
        const username = getUsername()
        InsertArticle({peopleid,username})
        .then((response) => InsertArticle(response))
        .catch(error => console.log('error',error))
      }
  
      const [clickedDivision, setClickedDivision] = useState(null);

      
  
      const handleDivisionClick = (divisionName) => {
        setClickedDivision(divisionName);
        navigate(`/movie/${divisionName}`); 
    
      };



    const [peopledetails, setPeopledetails] = useState({
      id:'',
      nameee:'',
      dob:'',
      bio:'',
      posterpath:'',
      moviesactedin:[],
      countofmovies:0,
      follow:false
    });


   

  const url="https://image.tmdb.org/t/p/original"
  
  function InsertArticle1(body){
    return fetch(`http://127.0.0.1:5000/followpeople`,{
          'method':'POST',
           headers : {
          'Content-Type':'application/json'
      },
      body:JSON.stringify(body)
    })
  .then(response => response.json())
  .then(jsonData => {
     console.log(jsonData)
     
    })
  .catch(error => console.log(error))
  }

  const insertArticl1e = () =>{
        const username = getUsername()
        InsertArticle1({peopleid,username})
        .then((response) => InsertArticle(response))
        .catch(error => console.log('error',error))
      }


  function handleClick(){
    insertArticl1e()
   
        setPeopledetails(prevState => ({
            ...prevState,
            follow: true
        }));
    
  }
  

  function InsertArticle11(body){
    return fetch(`http://127.0.0.1:5000/unfollowpeople`,{
          'method':'POST',
           headers : {
          'Content-Type':'application/json'
      },
      body:JSON.stringify(body)
    })
  .then(response => response.json())
  .then(jsonData => {
    console.log(jsonData)

    })
  .catch(error => console.log(error))
  }

  const insertArticl1e1 = () =>{
        const username = getUsername()
        InsertArticle11({peopleid,username})
        .then((response) => InsertArticle(response))
        .catch(error => console.log('error',error))
      }
   
  function handleClick1(){
    insertArticl1e1()
  
        setPeopledetails(prevState => ({
            ...prevState,
            follow: false 
        }));
    
    
    
  }
   
  
    return (
      <div className="peoplepage0">
       <div className='peopleInfo'>
                <div className='NavbarTransparent23'>
                    <NavbarTransparent/>
                </div>
                <div className='peoplebackdrop'>
                </div>
                <div className='peopleposter'>
                    <img src={url+peopledetails.posterpath} />
                    {peopledetails.follow ?
                    <button onClick={handleClick1}>Unfollow</button>
                    :
                    <button onClick={handleClick}>Follow</button>
                    }
                </div>
            <h1 className='peopletitle'>{peopledetails.nameee}</h1>
            <h3 className='peopledob'>{peopledetails.dob}</h3>
            <p className='peopleoverview'>{peopledetails.bio}</p>
        </div>
        <div className='moviesacteddiv'>
    <h1 className='moviesactedtitle'>Credits:{peopledetails.countofmovies}</h1>
    {peopledetails.moviesactedin.map((movie, index) => (
        <div key={index} className='moviesacted'  onClick={() => handleDivisionClick(movie[3])}>
            <img src={url + movie[2]} alt={`Poster ${index}`} />
            <div className='rolesandmoviename'>
                <p className='movieactedin'>{movie[1]}</p>
                <p>{movie[0]}</p>
            </div>
        </div>
    ))}
</div>

        <Footer/>
      </div>
    );
}

export default People;