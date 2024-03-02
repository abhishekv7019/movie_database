import React, { useState } from 'react';
import './css/SearchBar.css'; 
import {useNavigate} from 'react-router-dom';



function SearchBar({ onSearch }) {

  const filterresult1=[['The Specialist', '/9CVAjtkSaFs9FyddGfThj11ZuQq.jpg'], ['The Flintstones', '/ocsb0qiGlcn6UlcDRHa3xxSCc8Y.jpg']]

  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [yeardate,setDate]= useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption1,setSelectedOption1] = useState('');
  const [filterresult,setFilterresult]=useState([])

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuery('')
    setDate('')
    setSelectedOption('')
    setSelectedOption1('')
    insertArticle()
   
  };


  const handleChange = (event) => {
    setQuery(event.target.value);
  };
  
 
  
  //data insertion
  function InsertArticle(body){
    return fetch(`http://127.0.0.1:5000/searchbar`,{
          'method':'POST',
           headers : {
          'Content-Type':'application/json'
      },
      body:JSON.stringify(body)
    })
  .then(response => response.json())
  .then(jsonData => {
    setFilterresult(jsonData)
    console.log("data recived "+jsonData)
    navigate('/filterresult', { state: { jsonData } });
    })
  .catch(error => console.log(error))
  }


  const insertArticle = () =>{
        InsertArticle({query,yeardate,selectedOption,selectedOption1})
        .then((response) => InsertArticle(response))
        .catch(error => console.log('error',error))
      }

  


  const handledateChange  =(event) =>{
    setDate(event.target.value);
  }

  const handleSelectChange1 = (event) => {
    setSelectedOption1(event.target.value);
};

const url="https://image.tmdb.org/t/p/w500"
  const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };
  
 

  return (
    <div>
      <div className='filtertitles'>
      <h2 className='filter-title a'>Search</h2>
      <h2 className='filter-title b'> Genres</h2>
      <h2 className='filter-title c'>Year</h2>
      <h2 className='filter-title d'>Language</h2>
      </div>
    
 

    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder= 'Any'
      />
      <select value={selectedOption} onChange={handleSelectChange}  className='genresselect'  >
        <option value="">none</option>
                <option value="12" >Adventure</option>
                <option value="10749">Romance</option>
                <option value="53">Thriller</option>
                <option value="28">Action</option>
                <option value="27">Horror</option>
                <option value="16">Animation</option>
                <option value="35">Comedy</option>
                <option value="80">Crime</option>
                <option value="18">Drama</option>
                <option value="10751">Family</option>
                <option value="14">Fantasy</option>
                <option value="36">History</option>
                <option value="10402">Music</option>
                <option value="10752">War</option>
            </select>
      <input
       type='number'
       value={yeardate}
        onChange={handledateChange}
       placeholder= 'Any'
      />
      <select className='genresselect'  value={selectedOption1} onChange={handleSelectChange1}>
      <option value="">none</option>
                <option value="en">English</option>
                <option value="ja">japanease</option>
                <option value="ko">Korean</option>
                <option value="hi">Hindi</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
        </select>
      <button type="submit" className='button1'>Search</button>
    </form>
    </div>
  );
}

export default SearchBar;
