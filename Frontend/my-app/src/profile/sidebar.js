// components/Sidebar.js
import React from 'react';
import { CgProfile } from "react-icons/cg";
import "../css/profile.css";

function Sidebar() {

 
  return (
    <div className="sidebar">
      <CgProfile  size={120}/>
      <h2>Abhishek</h2>
      <h3>abhishekv&109@gmail.com</h3>
      <button className='Change_pass'>Edit profile</button>
    </div>
  );
}

export default Sidebar;








