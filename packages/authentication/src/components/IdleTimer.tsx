import { useEffect } from "react";

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

const IdleTimer = ({ idleTimeoutMinutes, onTimeOut }: IdleTimerProps) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const resetTimer = () => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(onTimeOut, 1000 * 60 * idleTimeoutMinutes); // Should be 15 minutes to comply with DigiD requirements: SSO session idle + 2 minute (internal Keycloak buffer time).
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
