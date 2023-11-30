import React, { useState, useEffect, useRef } from "react";
import "./Timer.css";
import { formatTime } from "./utils";

enum TimerMode {
  POMODORO = "POMODORO",
  SHORT_BREAK = "SHORT_BREAK",
  LONG_BREAK = "LONG_BREAK",
}

enum DefaultTimeByMode {
  POMODORO = 1500,
  SHORT_BREAK = 300,
  LONG_BREAK = 900,
}

const getDefaultTimeByMode = (mode: TimerMode): DefaultTimeByMode => {
  if (mode === TimerMode.POMODORO) {
    return DefaultTimeByMode.POMODORO;
  }

  if (mode === TimerMode.SHORT_BREAK) {
    return DefaultTimeByMode.SHORT_BREAK;
  }

  if (mode === TimerMode.LONG_BREAK) {
    return DefaultTimeByMode.LONG_BREAK;
  }

  throw new Error("Error getting default time.");
};

const selectedTime = DefaultTimeByMode.POMODORO;

export const Timer: React.FC = () => {
  const interval = useRef<any>();

  const [mode, setMode] = useState<TimerMode>(TimerMode.POMODORO);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(selectedTime);

  const handlePomodoro = () => {
    setIsRunning(false);
    setMode(TimerMode.POMODORO);
    setTimeLeft(DefaultTimeByMode.POMODORO);
  };

  const handleShortBreak = () => {
    setIsRunning(false);
    setMode(TimerMode.SHORT_BREAK);
    setTimeLeft(DefaultTimeByMode.SHORT_BREAK);
  };

  const handleLongBreak = () => {
    setIsRunning(false);
    setMode(TimerMode.LONG_BREAK);
    setTimeLeft(DefaultTimeByMode.LONG_BREAK);
  };

  const handleStart = () => {
    console.log("handleStart");
    setIsRunning(true);
  };

  const handleStop = () => {
    console.log("handleStop");
    setIsRunning(false);
  };

  useEffect(() => {
    console.log({ interval: interval.current, isRunning, timeLeft, mode });
    if (timeLeft === getDefaultTimeByMode(mode) && isRunning === true && !interval.current) {
      interval.current = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
        console.log("interval", timeLeft);
      }, 1000);
    }

    if (timeLeft < getDefaultTimeByMode(mode) && isRunning === false && interval.current) {
      clearInterval(interval.current);
      // release our intervalID from the variable
      interval.current = null;

      setTimeLeft(getDefaultTimeByMode(mode));
    }

    if (timeLeft === 0) {
      clearInterval(interval.current);
    }
  }, [interval, isRunning, timeLeft, mode]);

  console.log("timeLeft: " + timeLeft);

  // Render the timer with buttons to change modes
  return (
    <div className="pomodoro-app">
      <header className="app-header">Pomofocus</header>
      <main className="timer-main">
        <div className="timer-modes">
          <button onClick={handlePomodoro} className={`mode-button ${mode === TimerMode.POMODORO ? "active" : ""}`}>
            Pomodoro
          </button>
          <button onClick={handleShortBreak} className={`mode-button ${mode === TimerMode.SHORT_BREAK ? "active" : ""}`}>
            Short Break
          </button>
          <button onClick={handleLongBreak} className={`mode-button ${mode === TimerMode.LONG_BREAK ? "active" : ""}`}>
            Long Break
          </button>
        </div>
        <div className="timer-display">{formatTime(timeLeft)}</div>
        <button onClick={isRunning ? handleStop : handleStart} className="start-button">
          {isRunning ? "STOP" : "START"}
        </button>
      </main>
    </div>
  );
};
