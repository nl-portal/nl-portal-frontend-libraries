import Alert, { AlertProps } from "@gemeente-denhaag/alert";
import styles from "./Notification.module.scss";
import { useEffect, useState } from "react";
import classNames from "classnames";

export interface NotificationProps extends AlertProps {
  closable?: boolean;
}

const Notification = ({
  closable = true,
  title,
  text,
  variant,
  className,
  ...props
}: NotificationProps) => {
  const [showNotification, setShowNotification] = useState(true);
  const alertClassName = classNames(
    styles["nl-portal-notification"],
    className,
  );

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  const close = () => setShowNotification(false);

  if (!showNotification) return;

  return (
    <Alert
      {...props}
      variant={variant}
      className={alertClassName}
      title={title}
      text={text}
      close={closable ? close : undefined}
    />
  );
};

export default Notification;
