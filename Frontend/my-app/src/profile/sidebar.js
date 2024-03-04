// components/Sidebar.js
import React, { useEffect, useState } from 'react';
import { CgProfile } from "react-icons/cg";
import {  useNavigate } from "react-router-dom";
import "../css/profile.css";
import { getUsername } from '../Auth/Login';

function Sidebar(props) {
  

 
  return (
    <div className="sidebar">
      <CgProfile  size={120}/>
      <h2>{props.username}</h2>
      <h3>{props.email}</h3>
      <button className='Change_pass' >Edit profile</button>
    </div>
  );
}

export default Sidebar;








