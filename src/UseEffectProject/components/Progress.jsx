import { useState, useEffect } from "react";
function Progress({ TIMER }) {
  const [remainingTime, setRemainingTime] = useState(TIMER);
  useEffect(() => {
    console.log("INTERVAL");
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1);
    return () => {
      console.log("cleaning up timer");
      clearTimeout(timer);
    };
  }, []);
  return <progress value={remainingTime} max={TIMER} />;
}

export default Progress;
