import React, {  useEffect,useState } from 'react'
import "./css/searchpage.css"
import Navbar from './defaults/navbar';
import Card from './card';
import SearchBar from './searchbar';
import {useNavigate} from 'react-router-dom';
import Footer from './defaults/footer';


function Home() {
  const [username, setState] = useState('')
  const [data, setData] = useState([]);
	
  const handleSubmit=(event)=>{ 
    insertArticle()
		setState('')
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



  const fetchData = async ()=>{
    try{
      const response=await fetch('http://127.0.0.1:5000/home')
      const jsonData=await response.json();
      setData(jsonData)
    }catch(error){
      console.log("Error",error)
    }
    
  }
  

  //card
  const cardsa= [
    { img: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg", title: 'The Dark Knight', text: "9.5" },
    { img: "/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg", title: "The Lord of the Rings:The Return of the King", text: "9.5" },
    { img: "/8OKmBV5BUFzmozIC3pPWKHy17kx.jpg", title: "Seven Samurai", text: "9.5"  },
    { img: "/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg", title: 'The Lord of the Rings: The Fellowship of the Ring', text: "9.5" },
    { img: "/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg", title: 'Spider-Man: Into the Spider-Verse', text: "9.5" },
    
 
  ];
  

  const navigate = useNavigate();

  const [clickedDivision, setClickedDivision] = useState(null);


  const handleDivisionClick = (divisionName) => {
    setClickedDivision(divisionName);
    navigate(`/movie/${divisionName}`); 

  };

  const cards= [
    { img: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", title: 'Interstellar', text: "9.5" },
    { img: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", title: "The Shawshank Redemption", text: "9.5" },
    { img: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg", title: "Forrest Gump", text: "9.5" },
    { img: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", title: 'The Godfather', text: "9.5" },
    { img: "/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg", title: 'The Godfather part 2', text: "9.5" }
  ];
  
   const consturl="https://image.tmdb.org/t/p/w500"

  return (
    <div>
      
    <Navbar />
   
    <br>
    </br>
    <div className='homepageposter'>
      </div>
    <div className="App">
    <h1 className='Top-rated'>Recommended</h1>
    <br>
    </br>
    <div className='card-container'>
    {cardsa.map(card => (
          <Card image={consturl+card.img} title={card.title} id={card[0]} description={card.text} handleClick={handleDivisionClick}/>
        ))}
      </div>
     
    <br></br> 
    <br></br>
    <h1 className='title- '>Recently Watched</h1>
    <div className='gener-'>
        {cards.map(card => (
          <Card image={consturl+card.img} title={card.title} id={card[0]} description={card.text} handleClick={handleDivisionClick}/>
        ))}
      </div>

      <br></br> 
    <br></br>
    <h1 className='title- co'>Planning</h1>
    <div className='gener-'>
        {cards.map(card => (
          <Card image={consturl+card.img} title={card.title} id={card[0]} description={card.text} handleClick={handleDivisionClick}/>
        ))}
      </div>
      <br></br> 
    <br></br>
    <h1 className='title- ro'>Romance</h1>
    <div className='gener-'>
        {cards.map(card => (
          <Card image={consturl+card.img} title={card.title} id={card[0]} description={card.text} handleClick={handleDivisionClick}/>
        ))}
      </div>
      <br></br> 
    <br></br>
    <h1 className='title- th'>Thriller</h1>
    <div className='gener-'>
        {cards.map(card => (
          <Card image={consturl+card.img} title={card.title} id={card[0]} description={card.text} handleClick={handleDivisionClick}/>
        ))}
      </div>
    <div>
    </div>
    </div>
    <Footer/>
    </div>
  );
}

export default Home;
