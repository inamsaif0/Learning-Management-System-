import React, { useState, useRef,useEffect } from 'react';
import { View, Text, Button } from 'react-native';

const Stopwatch = ({start}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);

useEffect(()=>{
    if(start){
        startStopwatch()
    }
    else{
        resetStopwatch()

    }
},start)

  const startStopwatch = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    } else {
      const startTime = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const updatedElapsedTime = now - startTime;
        setElapsedTime(updatedElapsedTime);
      }, 10);
      setIsRunning(true);
    }
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setElapsedTime(0);
    setIsRunning(false);
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const millisecondsFormatted = Math.floor(milliseconds % 1000 / 10)
      .toString()
      .padStart(2, '0');

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${millisecondsFormatted}`;
  };

  return (
    <View>
      <Text style={{
            fontSize:70,
            paddingVertical:30
        }}>{formatTime(elapsedTime)}</Text>
     
    </View>
  );
};

export default Stopwatch;
