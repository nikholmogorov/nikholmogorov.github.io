import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Button from "@/components/Button/Button";
import styles from "./Stopwatch.module.scss";

export default function Stopwatch() {
  const [isAutostart, setAutostart] = useState(localStorage.getItem(`isAutostart`) === `true`);
  const [isMemory, setMemory] = useState(localStorage.getItem(`isMemory`) === `true`);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(getTimeFromLocaleStorage);

  const intervalRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef(0);
  const accumulatedTimeRef = useRef(0);
  const timeRef = useRef(time);

  function getTimeFromLocaleStorage() {
    return localStorage.getItem(`isMemory`) === `true` ? Number(localStorage.getItem(`time`) || 0) : 0;
  }

  const formattedTime = useMemo(() => {
    let millisecondsTenths = time % 10;
    let secondsTotal = Math.floor(time / 10);
    let seconds = secondsTotal % 60;
    let minutes = Math.floor((secondsTotal % (60 * 60)) / 60);
    let hours = Math.floor(secondsTotal / (60 * 60));

    return {
      hours: hours < 10 ? `0${hours}` : hours,
      minutes: minutes < 10 ? `0${minutes}` : minutes,
      seconds: seconds < 10 ? `0${seconds}` : seconds,
      millisecondsTenths: millisecondsTenths,
    };
  }, [time]);

  const handleStart = useCallback(() => {
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      const timeNow = Date.now();
      const elapsedSinceStart = Math.floor((timeNow - startTimeRef.current) / 100);
      const totalTenths = accumulatedTimeRef.current + elapsedSinceStart;
      setTime(totalTenths);
    }, 100);
    setIsRunning(true);
  }, []);

  const handlePause = useCallback(() => {
    const timeNow = Date.now();
    const elapsedSinceStart = Math.floor((timeNow - startTimeRef.current) / 100);
    accumulatedTimeRef.current += elapsedSinceStart;
    const nextTime = accumulatedTimeRef.current;
    setTime(nextTime);
    if (isMemory) {
      localStorage.setItem("time", String(nextTime));
    }
    if (intervalRef.current !== undefined) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
    setIsRunning(false);
  }, [isMemory]);

  const handleStartPause = useCallback(() => {
    if (isRunning) {
      handlePause();
    } else {
      handleStart();
    }
  }, [isRunning, handlePause, handleStart]);

  const handleClear = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
    setTime(0);
    accumulatedTimeRef.current = 0;
    localStorage.setItem("time", "0");
    setIsRunning(false);
  }, []);

  const handleAutostart = useCallback(() => {
    setAutostart(!isAutostart);
    localStorage.setItem(`isAutostart`, String(!isAutostart));
  }, [isAutostart]);

  const handleMemory = useCallback(() => {
    setMemory(!isMemory);
    localStorage.setItem(`isMemory`, String(!isMemory));
  }, [isMemory]);

  useEffect(() => {
    if (isAutostart) {
      handleStart();
    }
    if (isMemory) {
      accumulatedTimeRef.current = time;
    }
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.code) {
        case `Space`:
          e.preventDefault();
          handleStartPause();
          break;
        case `KeyC`:
          handleClear();
          break;
        case `KeyA`:
          handleAutostart();
          break;
        case `KeyM`:
          handleMemory();
          break;
      }
    }
    window.addEventListener(`keydown`, handleKeyDown);
    return () => window.removeEventListener(`keydown`, handleKeyDown);
  }, [handleStartPause, handleClear, handleAutostart, handleMemory]);

  useEffect(() => {
    document.title = time !== 0 ? `${formattedTime.hours}:${formattedTime.minutes}:${formattedTime.seconds}` : `seku`;
  }, [formattedTime]);

  useEffect(() => {
    if (!isMemory) {
      localStorage.setItem("time", "0");
      return;
    }
    function saveTime() {
      localStorage.setItem("time", String(timeRef.current));
    }
    saveTime();
    const intervalId = window.setInterval(saveTime, 1000);
    function handleVisibilityChange() {
      if (document.visibilityState === "hidden") {
        saveTime();
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isMemory]);

  useEffect(() => {
    timeRef.current = time;
  }, [time]);

  return (
    <div className={styles.stopwatch}>
      <p className={styles.time}>
        <span className={styles.hours}>{formattedTime.hours}</span>:
        <span className={styles.minutes}>{formattedTime.minutes}</span>:
        <span className={styles.seconds}>{formattedTime.seconds}</span>.
        <span className={styles.millisecondsTenths}>{formattedTime.millisecondsTenths}</span>
        <span
          className={styles.millisecondsHundredths}
          data-state={isRunning ? "running" : "paused"}
        >
          <span className={styles.digit0}>0</span>
          <span className={styles.digit5}>5</span>
        </span>
        <span
          className={styles.millisecondsThousandths}
          data-state={isRunning ? "running" : "paused"}
        >
          <span className={styles.digit0}>0</span>
          <span className={styles.digit3}>3</span>
          <span className={styles.digit6}>6</span>
          <span className={styles.digit8}>8</span>
        </span>
      </p>
      <div className={styles.controls}>
        <Button onClick={handleStartPause}>{isRunning ? `pause` : `start`}</Button>
        <Button onClick={handleClear}>clear</Button>
        <Button
          className={isAutostart ? `` : styles.disabled}
          onClick={handleAutostart}
        >
          autostart
        </Button>
        <Button
          className={isMemory ? `` : styles.disabled}
          onClick={handleMemory}
        >
          memory
        </Button>
      </div>
    </div>
  );
}
