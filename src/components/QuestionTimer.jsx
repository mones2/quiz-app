import { useState, useEffect } from "react";

export default function QuestionsTimer({ timeOut, onTimeOut }) {
  const [remainingTime, setRemainingTime] = useState(timeOut);

  useEffect(() => {
    // reset when timeOut changes (or when component remounts)
    setRemainingTime(timeOut);

    const timeout = setTimeout(onTimeOut, timeOut);

    const interval = setInterval(() => {
      setRemainingTime(prev => prev - 100);
    }, 100);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [timeOut, onTimeOut]);

  return (
    <progress id="question-progress" max={timeOut} value={remainingTime} />
  );
}
