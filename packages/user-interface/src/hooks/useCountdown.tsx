import { useEffect, useState } from "react";

export type Status = "idle" | "running" | "paused" | "finished";

interface UseCountdownReturn {
  timeLeft: number;
  isActive: boolean;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: (initialTime?: number) => void;
}

const useCountdown = (initialTime: number): UseCountdownReturn => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive]);

  const start = () => {
    if (timeLeft > 0) {
      setIsActive(true);
    }
  };

  const pause = () => {
    setIsActive(false);
  };

  const resume = () => {
    if (timeLeft > 0) {
      setIsActive(true);
    }
  };

  const reset = (newTime: number = initialTime) => {
    setIsActive(false);
    setTimeLeft(newTime);
  };

  return {
    timeLeft,
    isActive,
    start,
    pause,
    resume,
    reset,
  };
};

export default useCountdown;
