import React, { useState } from 'react';
import '../css/Login.css'; 
import {  Link } from "react-router-dom";

function LoginPage() {

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [status,setstatus]=useState('');


    //data insertion
    function InsertArticle(body){
      return fetch(`http://127.0.0.1:5000/login`,{
            'method':'POST',
             headers : {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
      })
    .then(response => response.json())
    .then(jsonData => {
      setstatus(jsonData)
      })
    .catch(error => console.log(error))
    }
  
    const insertArticle = () =>{
          InsertArticle({email,password})
          .then((response) => InsertArticle(response))
          .catch(error => console.log('error',error))
        }
  


  function handlesubmit(event){
    event.preventDefault()
    setemail('')
    setpassword('')
    insertArticle()
  }

  const handleChangeemail = (event) => {
    setemail(event.target.value);
  }

  const handleChangepassword = (event) => {
    setpassword(event.target.value);
  }

  return (
    <div className="back1">
      <div className="container44">
        <form className="signup-form" onSubmit={handlesubmit}>
          <h2>LOGIN</h2>
          <div className="form-group1">
            <label htmlFor="email">Email</label>
            <input type="email" value={email}  
            onChange={handleChangeemail}
             required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" value={password}  
            onChange={handleChangepassword} required />
          </div>
          <div className="form-group">
            <button type="submit">Login</button>
          </div>
        </form>
        <p>Dont have an account? <a href="#"><Link to="/signup">Sign Up</Link></a></p>
      </div>
    </div>
  );
}

export default LoginPage;
