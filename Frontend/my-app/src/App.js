import React, {  useEffect,useState } from 'react'
import "./css/searchpage.css"
import Navbar from './defaults/navbar';
import Card from './card';
import SearchBar from './searchbar';
import {useNavigate} from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Footer from './defaults/footer';


function App() {
  const [username, setState] = useState('')
  const [topmovies, setData] = useState([]);
  const [actionmovies, setaction] = useState([]);
  const [lists, setLists] = useState({
    action_movies: [],
    comedy_movies: [],
    romance_movies: [],
    thriller_movies: [],
    top_movies: []
    
});
	
  const handleSubmit=(event)=>{ 
    insertArticle()
    event.preventDefault()
	  }

    //data insertion
    function InsertArticle(body){
      return fetch(`http://127.0.0.1:5000/`,{
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
          InsertArticle({username})
          .then((response) => InsertArticle(response))
          .catch(error => console.log('error',error))
        }
  


  // data fetching

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async ()=>{
    try{
      const response=await fetch('http://127.0.0.1:5000/search')
      const jsonData=await response.json();
      setLists(jsonData)
    }catch(error){
      console.log("Error",error)
    }
    
  }
  const navigate = useNavigate();

  const [clickedDivision, setClickedDivision] = useState(null);


  const handleDivisionClick = (divisionName) => {
    setClickedDivision(divisionName);
    navigate(`/movie/${divisionName}`); 

  };

  
   const consturl="https://image.tmdb.org/t/p/w500"

  return (
    
    <div>
    <Navbar/>
    <br>
    </br>
    <div className='homepageposter'>
      </div>
    <SearchBar/>
    <div className="App">
    <h1 className='Top-rated'>Top Rated</h1>
    <br>
    </br>
    <div className='card-container'>
    {lists["top_movies"].map(card => (
          <Card image={consturl+card[2]} title={card[1]} id={card[0]} description={card[3]} handleClick={handleDivisionClick}/>
        ))}
      </div>
     
    <br></br> 
    <br></br>
    <h1 className='Genres'>Genres</h1>
    <h1 className='title- ac'>Action</h1>
    <div className='gener-'>
    {lists["action_movies"].map(card => (
          <Card image={consturl+card[2]} title={card[1]} id={card[0]} description={card[3]} handleClick={handleDivisionClick}/>
        ))}
      </div>

      <br></br> 
    <br></br>
    <h1 className='title- co'>Comedy</h1>
    <div className='gener-'>
    {lists["comedy_movies"].map(card => (
          <Card image={consturl+card[2]} title={card[1]} id={card[0]} description={card[3]} handleClick={handleDivisionClick}/>
        ))}
      </div>
      <br></br> 
    <br></br>
    <h1 className='title- ro'>Romance</h1>
    <div className='gener-'>
    {lists["romance_movies"].map(card => (
          <Card image={consturl+card[2]} title={card[1]} id={card[0]} description={card[3]} handleClick={handleDivisionClick}/>
        ))}
      </div>
      <br></br> 
    <br></br>
    <h1 className='title- th'>Thriller</h1>
    <div className='gener-'>
    {lists["thriller_movies"].map(card => (
          <Card image={consturl+card[2]} title={card[1]} id={card[0]} description={card[3]} handleClick={handleDivisionClick}/>
        ))}
      </div>
    <div>
    </div>
    </div>
    <Footer/>
    </div>
   
  );
}

export default App;
