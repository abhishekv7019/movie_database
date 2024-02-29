import React, {  useEffect,useState } from 'react'
import "./css/moviepagecss.css"
import NavbarTransparent from './defaults/navbarTransparent'
import Footer from './defaults/footer';
import { useParams } from 'react-router-dom';
import Castcrewcard from './cast&crewframe';

function MoviePage() {

    let { movieid } = useParams();

   const [lists,setLists]=useState('hello')


   useEffect(() => {
    insertArticle()
  }, []);




   function InsertArticle(body){
    return fetch(`http://127.0.0.1:5000/get_movie_details`,{
          'method':'POST',
           headers : {
          'Content-Type':'application/json'
      },
      body:JSON.stringify(body)
    })
  .then(response => response.json())
  .then(jsonData => {
    setData(jsonData)
    })
  .catch(error => console.log(error))
  }

  const insertArticle = () =>{
        InsertArticle({movieid})
        .then((response) => InsertArticle(response))
        .catch(error => console.log('error',error))
      }

      const [data, setData] = useState({
        id:'',
        name: '',
        Language: 0,
        released_date:'',
        overview:'',
        tmdb_rating:'',
        posterpath:'',
        backdroppath:'',
        trailer:'',
        rating:'',
        votes:'',
        production_company:'',
        genres:[],
        cast:[],
        crew:[]
       
    });



    const title =  "The Godfather"
    const release = "1972-03-14"
    const runtime = "175"
    const url="https://image.tmdb.org/t/p/original"
    const backdrop = "/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg"
    const poster = "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg"
    const overview = "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge."
    const tmdb = "8.7"
    const rating = "9.2"
    const votes = "324"
    const trailer = "/GiZVLFvQruQ"
    const prod =  "Paramount"
    const youtubeurl="https://www.youtube.com/embed/"
    const genres = ["Drama", "Crime"]

    const crew = [{name: "Francis Ford Coppola", img:"/3Pblihd6KjXliie9vj4iQJwbNPU.jpg", job:"Director"},
                  {name: "Francis Ford Coppola", img:"/3Pblihd6KjXliie9vj4iQJwbNPU.jpg", job:"Producer"}]

    const cast = [{name:"Marlon Brando" , img:"/fuTEPMsBtV1zE98ujPONbKiYDc2.jpg" , role:"Don Vito Corleone"},
                  {name:"Al Pacino" , img:"/2dGBb1fOcNdZjtQToVPFxXjm4ke.jpg" , role:"Michael Corleone"},
                  {name:"James Caan" , img:"/bGyOCCOIgcIyKjOGLoXoyp0XWHf.jpg" , role:"Sonny Corleone"},
                  {name:"Robert Duvall" , img:"/3tcKxC5Sc3DJ6XPDKKC2EAomEWn.jpg" , role:"Tom Hagen"},
                  {name:"Richard S. Castellano" , img:"/1vr75BdHWret81vuSJ3ugiCBkxw.jpg" , role:"Clemenza"},
                  {name:"Diane Keaton" , img:"/siSWRRFN9uO6iCN7y9OrHU5IaJ.jpg" , role:"Kay Adams"},
                  {name:"Talia Shire" , img:"/RkFJejmEKM80ly6fPSN7octO5c.jpg" , role:"Connie Corleone Rizzi"}]

    return (
        <div className='moviepage'>
            <div className='movieInfo'>
                <div className='NavbarTransparent'>
                    <NavbarTransparent/>
                </div>
                <div className='backdrop'>
                    <img src={url+data.backdroppath}  className='img'/>
                </div>
                <div className='poster'>
                    <img src={url+data.posterpath} />
                    <button>Add to List</button>
                </div>
            <h1 className='movietitle'>{data.name}</h1>
            <p className='movieoverview'>{data.overview}</p>
        </div>
        <div className='moviedetailedinfo'>
            <div className='moviespecifics'>
               <h3>Rating</h3>
               <h4>{data.rating}</h4>
               <h3>Votes</h3>
               <h4>{data.votes}</h4>
               <h3>TMDB Rating</h3>
               <h4>{data.tmdb_rating}</h4>
               <h3>Release Date</h3>
               <h4>{data.release_date}</h4>
               <h3>Runtime</h3>
               <h4>{data.runtime} mins</h4>
               <h3>Genres</h3>
               <h4>{data.genres[0]}, {data.genres[1]}</h4>
               <h3>Production</h3>
               <h4>{data.production_company}</h4>
            </div>
    
            <div className='castcrew'>
            <h1 className='casttitle'>Cast</h1>
            <div className='cacrframe'>
            {data.cast.map(card => (
          <Castcrewcard image={url+card[3]} title={card[2]} description={card[0]}/>
        ))}
        
        </div>
        <div className='trailercast'>
        <div className='cast'>
            <h1 className='casttitle'>Crew</h1>
            <div className='cacrframe'>
                {data.crew.map(card => (
            <Castcrewcard image={url+card[3]} title={card[2]} description={card[0]}/>
            ))}
            </div>
            </div>
            <div className='trailer'>
            <h1 className='casttitle'>Trailer</h1>
            <iframe src={youtubeurl+data.trailer} frameborder="0" className='movietrailer' allowfullscreen></iframe>
            </div>
            
        </div>
            </div>
        </div>
        <Footer/>
    </div>
    );
}

export default MoviePage;