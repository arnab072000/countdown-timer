import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [initialTime, setInitialTime] = useState(100); // Initial time in seconds (5 minutes)
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning && currentTime > 0) {
      timer = setInterval(() => {
        setCurrentTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, currentTime]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setCurrentTime(initialTime);
    setIsRunning(false);
  };

  const handleTimeChange = (event) => {
    const newTime = parseInt(event.target.value, 10);
    if (!isNaN(newTime) && newTime >= 0) {
      setInitialTime(newTime);
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      <h1>Countdown Timer</h1>
      <div>
        <label>
          Set Time (seconds):
          <input
            type="number"
            value={initialTime}
            onChange={handleTimeChange}
            disabled={isRunning}
          />
        </label>
      </div>
      <div>
        <p>Current Time: {formatTime(currentTime)}</p>
      </div>
      <div>
        <button onClick={startTimer} disabled={isRunning}>
          Start
        </button>
        <button onClick={stopTimer} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={resetTimer} disabled={isRunning}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default CountdownTimer;
