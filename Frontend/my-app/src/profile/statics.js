// components/SolvedProblems.js
import React, { useEffect, useState } from 'react';
import HeatMap from '@uiw/react-heat-map';
import "../css/profile.css";
import { getUsername } from '../Auth/Login';

function Statics(props) {

  


  const value = [
    { date: '2016/01/11' },
    { date: '2016/01/12' },
    { date: '2016/01/13' },
    { date: '2016/04/11' },
    { date: '2016/05/01' },
    { date: '2016/05/02' },
    { date: '2016/02/04' },
    { date: '2016/07/04' },
    { date: '2016/09/04'}
  ];


  return (
    <div className='mapandstats'>
      <h4>Activity History</h4>
      <div className='map'>
        <HeatMap
          value={value}
          width={530}
          startDate={new Date('2016/01/01')}
          panelColors={{
            0: '#ffffff',
            1: '#f26161',
            3: '#f03939',
            5: '#ea0909',
            10: '#9a0707',
          }}
        />
    </div>
    <div className='stats'>
      <div className='stat'>
        <h2>{props.totalmovies}</h2>
        <p>Total Movies</p>
      </div>
      <div className='stat'>
        <h2>{props.peoplefollowing}</h2>
        <p>People Following</p>
      </div>
      <div className='stat'>
        <h2>{props.average_score}</h2>
        <p>Mean Score</p>
      </div>
    </div>
  </div>
  );
}

export default Statics;
