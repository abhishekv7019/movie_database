import React from 'react';
import "../css/navbarTransparentcss.css"
import {  Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";


function NavbarTransparent() {

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
  <div className="header-right">
    <Link className='link' to='/login'>
    <a href="#">Login</a>
    </Link>
    <Link className='link' to='/signup'>
    <a className="active" href="#">Sign up</a>
    </Link>
    
  </div>
</div>
        </div>
	);
}

export default NavbarTransparent;
