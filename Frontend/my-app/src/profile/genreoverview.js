// components/SubmissionHistory.js
import React from 'react';
import "../css/profile.css";

function GenreOverview(props) {
  return (
    <div className='overview'>
      <h4>Genres Overview</h4>
      <div className='genres'>
        <div>
          <h3>Action</h3>
          <p>{props.Action}</p>                           
        </div>
        <div>
          <h3>Adventure</h3>
          <p>{props.Adventure}</p>
        </div>
        <div>
          <h3>Animation</h3>
          <p>{props.Animation}</p>
        </div>
        <div>
          <h3>Comedy</h3>
          <p>{props.Comedy}</p>
        </div>
        <div>
          <h3>Crime</h3>
          <p>{props.Crime}</p>
        </div>
        <div>
          <h3>Drama</h3>
          <p>{props.Drama}</p>
        </div>
        <div>
          <h3>Family</h3>
          <p>{props.Family}</p>
        </div>
        <div>
          <h3>Fantasy</h3>
          <p>{props.Fantasy}</p>
        </div>
        <div>
          <h3>History</h3>
          <p>{props.History}</p>
        </div>
        <div>
          <h3>Horror</h3>
          <p>{props.Horror}</p>
        </div>
        <div>
          <h3>Music</h3>
          <p>{props.Music}</p>
        </div>
        <div>
          <h3>Mystery</h3>
          <p>{props.Mystery}</p>
        </div>
        <div>
          <h3>Romance</h3>
          <p>{props.Romance}</p>
        </div>
        <div>
          <h3>Sci-Fi</h3>
          <p>{props.Science_Fiction}</p>
        </div>
        <div>
          <h3>Thriller</h3>
          <p>{props.Thriller}</p>
        </div>
        <div className='empty'>&nbsp;</div>
        <div>
          <h3>TV Movie</h3>
          <p>{props.TV_Movie}</p>
        </div>
        <div>
          <h3>War</h3>
          <p>{props.War}</p>
        </div>
        <div>
          <h3>Western</h3>
          <p>{props.Western}</p>
        </div>
        
      </div>
    </div>
  );
}

export default GenreOverview;
