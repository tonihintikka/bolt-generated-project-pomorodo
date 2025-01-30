import React, { useState, useEffect, useRef } from 'react';
import { PlayIcon, StopIcon, ReloadIcon, InfoCircledIcon } from '@radix-ui/react-icons';

const Button = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default function PomodoroTimer() {
  const audioContext = useRef(null);
  
  const playBeep = () => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 800;
    gainNode.gain.value = 0.5;
    
    oscillator.start();
    oscillator.stop(audioContext.current.currentTime + 0.2);
  };
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
            playBeep();
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
    playBeep();
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
              <StopIcon className="w-4 h-4" />
            ) : (
              <PlayIcon className="w-4 h-4" />
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
            <ReloadIcon className="w-4 h-4" />
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
            <InfoCircledIcon className="w-4 h-4" />
            {isWorking ? 'Switch to Break' : 'Switch to Work'}
          </Button>
        </div>
      </div>
    </div>
  );
}
