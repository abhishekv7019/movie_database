import React,{useState,useEffect} from 'react';
import "../css/navbarTransparentcss.css"
import {  Link,useNavigate } from "react-router-dom";
import { getUsername } from '../Auth/Login';


function NavbarTransparent() {


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  function handleclick(){
    localStorage.setItem('username', '');
    console.log('logged_out');
    navigate('/login'); 
  }

  useEffect(() => {
    const username = getUsername();
    setIsLoggedIn(!!username);
  }, []);


    const divStyle = {
        color: 'red',
      };
	return (
		<div>
         <div className="header2">
  <h1><a href="#default" className="logo">Movie <span style={divStyle}>Tracker</span></a></h1>
  <div className="header-center">
    <Link className='link' to="/home">
    <a  href="#">Home</a>
    </Link>
    <Link className='link' to="/">
    <a href="#">Search</a>
    </Link>
    <Link className='link' to="/lists">
    <a href="#">List</a>
    </Link>
    <Link className='link' to="/profile">
    <a href='#'>Profile</a>
    </Link>
    
  </div>
  {isLoggedIn  ? 
  <div className="header-right1" onClick={handleclick}>
    
   <Link className='link ' >
   <a class="active logout" href="#">Logout</a>
   </Link> 
   </div>
  :
  <>
  <div className="header-right">
    <Link className='link' to='/login'>
    <a href="#">Login</a>
    </Link>
    <Link className='link' to='/signup'>
    <a class="active" href="#">Sign up</a>
    </Link> 
  </div>
  </>}
</div>
        </div>
	);
}

export default NavbarTransparent;
