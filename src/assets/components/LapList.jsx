import React from 'react';

const LapList = ({ laps, removeLap }) => {

  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
  
    let formattedTime = '';
  
    if (hours > 0) {
      formattedTime += `${hours} hr `;
    }
  
    if (minutes > 0 || hours > 0) {
      formattedTime += `${minutes} min `;
    }
  
    formattedTime += `${seconds} sec`;
  
    return formattedTime.trim();
  };
  

  return (
    <div>
      <h2>Lap Times</h2>
      <ol>
        {laps.map((lap, idx) => (
          <li key={idx}>
            <strong>{formatTime(lap)}</strong>
            <button onClick={() => removeLap(idx)}>Remove</button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default LapList;
