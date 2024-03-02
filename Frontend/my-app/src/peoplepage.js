import React, { useState , useEffect } from 'react';
import {useNavigate , useParams} from 'react-router-dom';
import NavbarTransparent from "./defaults/navbarTransparent";
import Footer from './defaults/footer';
import "./css/peoplepage.css"



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
        InsertArticle({peopleid})
        .then((response) => InsertArticle(response))
        .catch(error => console.log('error',error))
      }
  




    const [peopledetails, setPeopledetails] = useState({
      id:'',
      nameee:'',
      dob:'',
      bio:'',
      posterpath:'',
      moviesactedin:[]
    });




  const url="https://image.tmdb.org/t/p/original"
  const youtubeurl="https://www.youtube.com/embed/"


    const data={
      backdroppath:"/2ZulC2Ccq1yv3pemuss6Zlfy2s.jpg",
      posterpath:"/2ZulC2Ccq1yv3pemusks6Zlfy2s.jpg",
      namee:"Mark Hamill",
      overview:"Mark Richard Hamill (born September 25, 1951) is an American actor, voice artist, producer, director, and writer. Hamill is best known for his role as Luke Skywalker in the original Star Wars trilogy and also well known for voice-acting characters such as the Joker in various animated series, animated films and video games, beginning with Batman: The Animated Series, the Skeleton king in Super Robot Monkey Team Hyperforce Go!, Fire Lord Ozai in Avatar: The Last Airbender, Master Eraqus in Kingdom Hearts: Birth by Sleep, Skips in Regular Show, and Senator Stampington on Metalocalypse.",
      dob:"1951-09-25"
    }



    const movies = [
      { posterpath: "/2ZulC2Ccq1yv3pemusks6Zlfy2s.jpg", name: 'Movie 1', role: 'Role 1' },
      { posterpath: "/2ZulC2Ccq1yv3pemusks6Zlfy2s.jpg", name: 'Movie 2', role: 'Role 2' },
      { posterpath: "/2ZulC2Ccq1yv3pemusks6Zlfy2s.jpg", name: 'Movie 3', role: 'Role 3' }
  ];
  
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
                    <button>Add to List</button>
                </div>
            <h1 className='peopletitle'>{peopledetails.nameee}</h1>
            <h3 className='peopledob'>{peopledetails.dob}</h3>
            <p className='peopleoverview'>{peopledetails.bio}</p>
        </div>
        <div className='moviesacteddiv'>
    <h1 className='moviesactedtitle'>Movies acted</h1>
    {peopledetails.moviesactedin.map((movie, index) => (
        <div key={index} className='moviesacted'>
            <img src={url + movie[2]} alt={`Poster ${index}`} />
            <div>
                <p>{movie[1]}</p>
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