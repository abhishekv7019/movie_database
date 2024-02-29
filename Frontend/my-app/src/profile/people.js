// components/SubmissionHistory.js
import React from 'react';
import "../css/profile.css";

function Favmovies() {
  return (
    <div className="submission-history">
     <div className='stats'>
      <h3 className='stat'>Total movies</h3>
      <h3 className='stat'>Poeple Following</h3>
      <h3 className='stat'>Mean Score</h3>
     </div>
     <div className='value'>
      <h3 className='statv'>100</h3>
      <h3 className='statv'>10</h3>
      <h3 className='statv'>8.5</h3>
     </div>
     <div className='statsg'>
      <h3 className='stat'>Thriller</h3>
      <h3 className='stat'>Thriller</h3>
      <h3 className='stat'>Thriller</h3>
      <h3 className='stat'>Thriller</h3>
     </div>
     <div className='valueg'>
      <h3 className='statvv'>100</h3>
      <h3 className='statvv'>10</h3>
      <h3 className='statvv'>8.5</h3>
      <h3 className='statvv'>8.5</h3>
     </div>
 
    </div>
  );
}

export default Favmovies;
