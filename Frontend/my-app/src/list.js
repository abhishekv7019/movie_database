import React, {useState, useEffect} from 'react'
import "./css/listcss.css"
import Navbar from './defaults/navbar.js'
import { useLocation,useNavigate } from 'react-router-dom';
import Footer from './defaults/footer';
import { getUsername } from './Auth/Login';

function ListPage() {



    const navigate = useNavigate();

    const handleDivisionClick = (divisionName) => {
    
      navigate(`/movie/${divisionName}`); 
  
    };

    const url="https://image.tmdb.org/t/p/w500"
    const username = localStorage.getItem('username')
    const [selectedTab, setSelectedTab] = useState('completed');
    const [data, setData] = useState({
        completed: [{
          movie_id: '',
          title: '',
          img: '',
          score: '',
          date: ''
        }],
        planning: [{
            movie_id: '',
            title: '',
            img: ''
        }]
      });
      
    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    useEffect(() => {
        const username = getUsername();
    if(!!username){
      console.log("passed")
    }
    else{
      navigate('/login');
    }
        fetchData();
        console.log("Completed: ", data.completed);
        console.log("Planning: ", data.planning);
    }, []);

    function fetchData(){
        return fetch(`http://127.0.0.1:5000/lists`,{
              'method':'POST',
               headers : {
              'Content-Type':'application/json'
          },
          body:JSON.stringify({username})
        })
      .then(response => response.json())
      .then(data => {
        setData(data)
        })
      .catch(error => console.log(error))
    }


    
    
    return(
        <div>
            <Navbar/>
            <div className='list'>
                <div className='lists'>
                    <button onClick={() => handleTabChange('completed')}>Completed</button>
                    <button onClick={() => handleTabChange('planning')}>Planning</button>
                </div>
                
                <div className='listcontent'>
                    <div className='listname'>
                    </div>
                    <div className='posters'>
                    
                        {selectedTab === 'completed' &&  data.completed.map(card => (
                            <div key={card.id} onClick={() => handleDivisionClick(card.movie_id)}>
                                <img src={url + card.img} className='listimg' alt='poster'/>
                                <div className='watchinfo'>
                                    <p>{card.date}</p>
                                    <p>{card.score}</p>
                                </div>
                                <p className='postertitle'>{card.title}</p>
                            </div>
                        ))}
                    
                        
                        {selectedTab === 'planning' && data.planning.map(card => (
                            
                            <div key={card.id} onClick={() => handleDivisionClick(card.movie_id)}>
                                <img src={url + card.img} className='listimg' alt='poster'/>
                                <p className='postertitle1'>{card.title}</p>
                            </div>
                             
                             
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ListPage;