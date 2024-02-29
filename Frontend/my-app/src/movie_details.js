// UserProfile.js
import React from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  let { movieid } = useParams();

  return (
    <div>
      <h2>Movie Details</h2>
      <p>Movie ID: {movieid}</p>
    </div>
  );
};

export default MovieDetails ;
