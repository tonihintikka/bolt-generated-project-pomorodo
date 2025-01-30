import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@radix-ui/react-dialog';
import { Clock, Play, Stop, Reset, Info } from '@radix-ui/react-icons';
import * as MP3 from '@ffmpeg/audio-mp3';

const sound = new MP3.Sound('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isWorking, setIsWorking] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer completed
            sound.play();
            setIsActive(false);
            if (isWorking && sessionCount < 4) {
              setSessionCount(sessionCount + 1);
              setIsWorking(!isWorking);
            } else if (!isWorking) {
              setIsWorking(true);
              setSessionCount(0);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isWorking, sessionCount]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    sound.play();
    setMinutes(isWorking ? 25 : 5);
    setSeconds(0);
    setIsWorking(true);
    setIsActive(false);
    setSessionCount(0);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">Pomodoro Timer</h1>
        
        <div className="flex justify-between items-center">
          <div className="text-xl font-medium text-gray-700">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <Button
            variant="outline"
            onClick={toggleTimer}
            className="gap-2"
          >
            {isActive ? (
              <Stop size={18} />
            ) : (
              <Play size={18} />
            )}
            {isActive ? 'Stop' : 'Start'}
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={resetTimer}
            className="gap-2 flex items-center"
          >
            <Reset size={18} />
            Reset
          </Button>
          <div className={`text-lg font-medium ${isWorking ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {isWorking ? 'Work Time' : 'Break Time'}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setIsWorking(!isWorking)}
            className="gap-2 flex items-center"
          >
            <Info size={18} />
            {isWorking ? 'Switch to Break' : 'Switch to Work'}
          </Button>
        </div>
      </div>
    </div>
  );
}
