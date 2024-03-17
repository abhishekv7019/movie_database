import React, {  useEffect,useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import "./css/moviepagecss.css"
import NavbarTransparent from './defaults/navbarTransparent'
import Footer from './defaults/footer';
import Castcrewcard from './cast&crewframe';

function MoviePage() {

    let { movieid } = useParams();
    const username = localStorage.getItem('username')

    const [addbutton, setaddbutton] = useState(false)
    const [status, setStatus] = useState('');
    const [scoreEnabled, setScoreEnabled] = useState(false);
    const [watchDateEnabled, setWatchDateEnabled] = useState(false);
    const [score, setScore] = useState('');
    const [watchDate, setWatchDate] = useState('');
    const [isFavorite, setFavorite] = useState(false)

    const navigate = useNavigate();

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
        votes:'0',
        production_company:'',
        genres:[],
        cast:[],
        crew:[],
        lists:[],
        score: 0,
        watch: '',
        similar: []
    });

    const url="https://image.tmdb.org/t/p/original"
    const youtubeurl="https://www.youtube.com/embed/"

   useEffect(() => {
    InsertArticle()
    window.scrollTo(0, 0)
    if (data.lists.includes('Completed')) {
        setStatus('Completed');
        setScoreEnabled(true);
        setWatchDateEnabled(true);
        setScore(data.score);
        setWatchDate(data.watch);
    } else if (data.lists.includes('Planning')) {
        setStatus('Planning');
        setScoreEnabled(false);
        setWatchDateEnabled(false);
    } else {
        setStatus('');
        setScoreEnabled(false);
        setWatchDateEnabled(false);
    }
    if (data.lists.includes('Favorites'))
        setFavorite(true);
        const url="https://image.tmdb.org/t/p/w500"
        const youtubeurl="https://www.youtube.com/embed/"
    
  }, []);
   


   function InsertArticle(){
    return fetch(`http://127.0.0.1:5000/get_movie_details`,{
          'method':'POST',
           headers : {
          'Content-Type':'application/json'
      },
      body:JSON.stringify({movieid, username})
    })
  .then(response => response.json())
  .then(jsonData => {
    setData(jsonData)
    })
  .catch(error => console.log(error))
  }

    const handleDivisionClick = (divisionName) => {
      navigate(`/people/${divisionName}`); 
    };

    const handlePosterClick = (divisionN1ame) => {
        navigate(`/movie/${divisionN1ame}`); 
        window.location.reload();
        window.scrollTo(0, 0);
    };
  

    const handleAddClick = () => {
        if(!!username){
            console.log("passed")
          }
          else{
            navigate('/login');
          }
        setaddbutton(true)
        window.scrollTo(0, 0);
        
    };

    const handleClose = () => {
        setaddbutton(false)
        
    };

    const handleStatusChange = (e) => {
        const selectedStatus = e.target.value;
        setStatus(selectedStatus);
        if (selectedStatus === "Completed") {
            setScoreEnabled(true);
            setWatchDateEnabled(true);
        } else {
            setScoreEnabled(false);
            setWatchDateEnabled(false);
        }
    };

    const handleFav = () => {
        setFavorite(!isFavorite)
    }

    const handleSave = () => {
        if (status === 'Completed' && (!score || !watchDate)) {
            alert('Please fill all required fields');
            return;
        }

        if (
            status !== initialState.status ||
            isFavorite !== initialState.isFavorite ||
            score !== initialState.score ||
            watchDate !== initialState.watchDate
        ) {
            fetch('http://127.0.0.1:5000/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ movieid, username, status, isFavorite, score, watchDate })
            })
            .then(response => {
                if (response.ok)
                    return response.json();
                else
                    return Promise.reject('Failed to delete');
            })
            .then(data => {
                if (data.success) {
                    
                    setStatus('');
                    setScore('');
                    setWatchDate('');
                    setaddbutton(false);
                    window.location.reload();
                }
                else
                    alert('Update failed');
            })
            .catch(error => {
                alert('Network error:'+ error);
            });
        } else {
            console.log('No changes made');
        }
    };

    const handleDelete = () => {
        fetch('http://127.0.0.1:5000/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ movieid, username })
        })
        .then(response => {
            if (response.ok)
                return response.json();
            else
                return Promise.reject('Failed to delete');
        })
        .then(data => {
            if (data.success) {
                setStatus('');
                setFavorite(false);
                setScore('');
                setWatchDate('');
                setaddbutton(false);
                window.location.reload();
            }
            else
                alert('Deletion failed');
        })
        .catch(error => {
            alert('Network error:' +error);
        });
    };    
    
    const [initialState] = useState({ status, isFavorite, score, watchDate });


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
                    <button onClick={handleAddClick}>{data.lists.length !== 0 ? 'Edit Entry' : 'Add to List'}</button>
                </div>
                {addbutton && (
                    <>
                    <div className='popup'>
                        <button className='close' onClick={handleClose}>X</button>
                        <div className='options'>
                            <div>
                                <select value={status} onChange={handleStatusChange}>
                                    {status ? '' : <option value='' disabled hidden>Select Status</option>}
                                    <option value="Completed">Completed</option>
                                    <option value="Planning">Planning</option>
                                </select>
                                <button className={isFavorite ? 'favorite' : 'fav'} onClick={handleFav}>Favorite</button>
                            </div>
                            <div>
                                <input placeholder='Score' value={score} onChange={(e) => setScore(e.target.value)} 
                                disabled={!scoreEnabled}></input>
                                <input type='date' placeholder='Watch Date' value={watchDate} onChange={(e) => setWatchDate(e.target.value)} 
                                disabled={!watchDateEnabled}></input>
                                <button className='save' onClick={handleSave}>Save</button>
                            </div>
                        </div>
                        <button className='delete' onClick={handleDelete}>Delete</button>
                    </div>
                    </>
                )}
            <h1 className='movietitle'>{data.name}</h1>
            <p className='movieoverview'>{data.overview}</p>
        </div>
        <div className='moviedetailedinfo'>
            <div className='moviespecifics'>
               <h3>Rating</h3>
               {data.rating == undefined ? <h4>Not rated</h4> :  <h4>{data.rating}</h4> }
               <h3>Votes</h3>
               {data.rating == undefined ? <h4>0</h4> :  <h4>{data.votes}</h4> }
               <h3>TMDB Rating</h3>
               <h4>{data.tmdb_rating}</h4>
               <h3>Release Date</h3>
               <h4>{data.released_date}</h4>
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
                 <Castcrewcard image={url+card[3]} title={card[2]}  description={card[0]} id={card[1]} handleClick={handleDivisionClick} />
        ))}
        
        </div>
        <div className='trailercast'>
        <div className='cast'>
            <h1 className='casttitle'>Crew</h1>
            <div className='cacrframe'>
                {data.crew.map(card => (
            <Castcrewcard image={url+card[3]} title={card[2]} description={card[0]} id={card[1]}  handleClick={handleDivisionClick}/>
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
        {data.similar && data.similar.length > 0 && (
              <>
                <h1 className='similartitle'>Similar Movies</h1>
                <div className='similarlist'>
                {data["similar"].map(card => (
                    <div onClick={() => handlePosterClick(card[0])}>
                        <img src={url + card[2]} />
                        <p>{card[1]}</p>
                    </div>
                ))}
                </div>
              </>
            )} 
        <Footer/>
    </div>
    );
}

export default MoviePage;