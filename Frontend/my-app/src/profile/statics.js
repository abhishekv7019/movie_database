// components/SolvedProblems.js
import React from 'react';
import HeatMap from '@uiw/react-heat-map';
import "../css/profile.css";

function Statics() {

  const value = [
    { date: '2016/01/11', count: 2 },
    { date: '2016/01/12', count: 2 },
    { date: '2016/01/13', count: 10 },
    ...[...Array(17)].map((_, idx) => ({ date: `2016/02/${idx + 10}`, count: idx, content: '' })),
    { date: '2016/04/11', count: 2 },
    { date: '2016/05/01', count: 5 },
    { date: '2016/05/02', count: 5 },
    { date: '2016/02/04', count: 11 },
    { date: '2016/07/04', count: 11 },
    { date: '2016/09/04', count: 11 }
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
        <h2>100</h2>
        <p>Total Movies</p>
      </div>
      <div className='stat'>
        <h2>10</h2>
        <p>People Following</p>
      </div>
      <div className='stat'>
        <h2>9</h2>
        <p>Mean Score</p>
      </div>
    </div>
  </div>
  );
}

export default Statics;
