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



    
    const url="https://image.tmdb.org/t/p/original"
    const youtubeurl="https://www.youtube.com/embed/"
   

  

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
