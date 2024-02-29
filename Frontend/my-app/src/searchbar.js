import React, { useState } from 'react';
import './css/SearchBar.css'; 



function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [yeardate,setDate]= useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption1,setSelectedOption1] = useState('');


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

   
  const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };
  
 

  return (
    <div>
      <div className='filtertitles'>
      <h2 className='filter-title a'>Search</h2>
      <h2 className='filter-title b'> Genres</h2>
      <h2 className='filter-title c'>Date</h2>
      <h2 className='filter-title d'>Language</h2>
      </div>
      
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder= 'Any'
      />
      <select value={selectedOption} onChange={handleSelectChange}  className='genresselect'>
        <option value="null">none</option>
                <option value="Adventure">Adventure</option>
                <option value="Romance">Romance</option>
                <option value="Thriller">Thriller</option>
                <option value="Action">Action</option>
                <option value="Horror">Horror</option>
            </select>
      <input
       type='date'
       value={yeardate}
        onChange={handledateChange}
       placeholder= 'set your date'
      />
      <select className='genresselect'  value={selectedOption1} onChange={handleSelectChange1}>
      <option value="null">none</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="Korean">Korean</option>
                <option value="Hindi">Hindi</option>
        </select>
      <button type="submit" className='button1'>Search</button>
    </form>
    </div>
  );
}

export default SearchBar;
