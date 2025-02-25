import { useEffect } from "react";

export interface IdleTimerProps {
  idleTimeoutMinutes: number;
  onTimeOut: () => void;
  onWarning?: () => void;
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

const IdleTimer = ({
  idleTimeoutMinutes,
  onTimeOut,
  onWarning,
}: IdleTimerProps) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let warningTimeout: ReturnType<typeof setTimeout> | null = null;

  const resetTimer = () => {
    if (timeout) {
      clearTimeout(timeout);
    }

    // Option to show a warning one minute before automatic logout
    if (onWarning) {
      if (warningTimeout) {
        clearTimeout(warningTimeout);
      }

      warningTimeout = setTimeout(
        onWarning,
        calculateTimeoutMilliseconds(idleTimeoutMinutes - 5),
      );
    }

    timeout = setTimeout(
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
      if (timeout) {
        clearTimeout(timeout);
        BASIC_ACTIVITY_EVENTS.forEach((eventType) => {
          window.removeEventListener(eventType, resetTimer);
        });
      }
    };
  }, []);

  return null;
};

export default IdleTimer;
