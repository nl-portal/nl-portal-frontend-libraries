import { useEffect } from "react";
import { FormattedMessage, FormattedTime } from "react-intl";
import useCountdown from "../hooks/useCountdown";

interface ValidationFormCountdownProps {
  onComplete: () => void;
}

const ValidationFormCountdown = ({
  onComplete,
}: ValidationFormCountdownProps) => {
  const { timeLeft, start } = useCountdown((10 * 60 - 1) * 1000);

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) return;
    onComplete();
  }, [timeLeft]);

  if (timeLeft === 0) return null;

  return (
    <FormattedMessage
      id={`validationForm.labelDescription`}
      values={{
        time: (
          <FormattedTime value={timeLeft} minute="2-digit" second="2-digit" />
        ),
      }}
    />
  );
};

export default ValidationFormCountdown;
