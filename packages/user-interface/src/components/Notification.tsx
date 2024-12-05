import Alert, { AlertProps } from "@gemeente-denhaag/alert";
import styles from "./Notification.module.scss";
import { useEffect, useState } from "react";
import classNames from "classnames";

interface Props extends AlertProps {
  closable?: boolean;
}

const Notification = ({
  closable = true,
  title,
  text,
  variant,
  className,
  ...props
}: Props) => {
  const [hideNotification, setHideNotification] = useState(false);
  const alertClassName = classNames(
    styles["nl-portal-notification"],
    className,
  );

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  const close = () => setHideNotification(true);

  if (hideNotification) return;

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
