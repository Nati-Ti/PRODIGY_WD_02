import React, { useState, useRef } from 'react';
import './Stopwatch.css';
import LapList from './LapList';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef();

  const startStopwatch = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000); // Always update every second
    }
    setIsRunning(!isRunning);
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
  };

  const addLap = () => {
    setLaps([...laps, elapsedTime]);
  };

  const removeLap = (index) => {
    const newLaps = [...laps];
    newLaps.splice(index, 1);
    setLaps(newLaps);
  };

  const formatTime = (time) => {
    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor((seconds / 60) % 60);
    const hours = Math.floor(seconds / 3600);

    return `${hours > 0 ? `${hours} hr ` : ''}${minutes > 0 || hours > 0 ? `${minutes} min ` : ''}${seconds % 60} sec`;
  };

  return (
    <div className="stopwatch">

      <div className='stopwatch_display_buttons'>

        <div className='stopwatch_img'>
          <h1>Stopwatch</h1>
          <img src='https://www.pngkey.com/png/full/514-5141110_100-speed-stopwatch-icon-4.png' />
        </div>

        <div className="display">
          <h2>{formatTime(elapsedTime)}</h2>
        </div>

        <div className='stopwatch_buttons'>
          <button onClick={startStopwatch}>{isRunning ? 'Pause' : 'Start'}</button>
          <button onClick={resetStopwatch}>Reset</button>
          <button onClick={addLap}>Lap</button>
        </div>

      </div>

      <div className='LapList'>
        <LapList laps={laps} removeLap={removeLap} />
      </div>

    </div>
  );
};

export default Stopwatch;
