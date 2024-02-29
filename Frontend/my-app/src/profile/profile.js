import React from 'react';
import Navbar from '../defaults/navbar';
import Footer from '../defaults/footer';
import Sidebar from './sidebar';
import Statics from './statics';
import GenreOverview from './genreoverview'
import "../css/profile.css";

function Profile () {


const ppl_img="https://image.tmdb.org/t/p/w500/WCSZzWdtPmdRxH9LUCVi2JPCSJ.jpg"
const movie_img="https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"

	return (
    <div className='appp'>
      <Navbar/>
      <div className='topcontainer'>
        <div className="profile-section"><Sidebar/></div>
          <Statics/>
        <GenreOverview/>
      </div>
      <div className='favandfollow'>
        <div className='section'>
          <h3>Favorites</h3>
          <div className='outerbox'>
            <div className='gridbox'>
              <div>
                <img src={movie_img} />
              </div>
              <div>
                <img src={movie_img} />
              </div>
              <div>
                <img src={movie_img} />
              </div>
              <div>
                <img src={movie_img} />
              </div>
              <div>
                <img src={movie_img} />
              </div>
              <div>
                <img src={movie_img} />
              </div>
              <div>
                <img src={movie_img} />
              </div>
              <div>
                <img src={movie_img} />
              </div>
              <div>
                <img src={movie_img} />
              </div>
              <div>
                <img src={movie_img} />
              </div>
              <div>
                <img src={movie_img} />
              </div>
              <div>
                <img src={movie_img} />
              </div>
              <div>
                <img src={movie_img} />
              </div>
              <div>
                <img src={movie_img} />
              </div>
              <div>
                <img src={movie_img} />
              </div>
              <div>
                <img src={movie_img} />
              </div>
              <div>
                <img src={movie_img} />
              </div>
              <div>
                <img src={movie_img} />
              </div>
              <div>
                <img src={movie_img} />
              </div>
              <div>
                <img src={movie_img} />
              </div>
            </div>
          </div>

        </div>
        <div className='section'>
          <h3>Following</h3>
          <div className='outerbox'>
            <div className='gridbox'>
              <div className='pplbox'>
                <img src={ppl_img} className='pplposter'/>
              </div>
              <div className='pplbox'>
                <img src={ppl_img} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
	);
}

export default Profile;



