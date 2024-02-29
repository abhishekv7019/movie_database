import React from 'react';
import '../css/Footer.css'; 

function Footer() {
  
    const styles1 = {
          color:'red',
        }
    
  return (
    <footer className="footer">
      <div className="container21">
        <div className="footer-content">
          <div className="footer-logo">
            <h1>Movie<span style={styles1}>Tracker</span></h1>
            <p className=''>Your ultimate destination for tracking and discovering movies!</p>
          </div>
          <div className="footer-links">
           
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
