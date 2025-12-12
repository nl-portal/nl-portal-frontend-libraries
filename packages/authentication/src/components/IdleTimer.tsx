import { useEffect, useRef } from "react";

export interface IdleTimerProps {
  idleTimeoutMinutes: number;
  onTimeOut: () => void;
}

const BASIC_ACTIVITY_EVENTS: string[] = [
  "mousedown",
  "keydown",
  "pointerdown",
  "touchstart",
  "scroll",
  "wheel",
  "audiostart",
];

const calculateTimeoutMilliseconds = (minutes: number) => 1000 * 60 * minutes;

const IdleTimer = ({ idleTimeoutMinutes, onTimeOut }: IdleTimerProps) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(
      onTimeOut,
      calculateTimeoutMilliseconds(idleTimeoutMinutes),
    ); // Should be 15 minutes to comply with DigiD requirements
  };

  useEffect(() => {
    // initiate timeout
    resetTimer();

    // listen for activity events
    BASIC_ACTIVITY_EVENTS.forEach((eventType) => {
      window.addEventListener(eventType, resetTimer);
    });

    // cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        BASIC_ACTIVITY_EVENTS.forEach((eventType) => {
          window.removeEventListener(eventType, resetTimer);
        });
      }
    };
  }, []);

  return null;
};

export default IdleTimer;
