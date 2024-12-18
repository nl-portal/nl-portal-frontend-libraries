import { createContext, ReactNode, useLayoutEffect, useState } from "react";
import Notification, { NotificationProps } from "../components/Notification";
import { useLocation } from "react-router-dom";
import { FormattedMessage } from "react-intl";

interface NotificationContextType {
  getNotifications: () => ReactNode[];
  pushNotification: (key: string, alert: NotificationProps) => void;
}

const NotificationContext = createContext<NotificationContextType>(
  {} as NotificationContextType,
);

interface NotificationProviderProps {
  children: ReactNode;
}

const INITIAL_MAP = new Map<string, ReactNode>();

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [notifications, setNotifications] =
    useState<Map<string, ReactNode>>(INITIAL_MAP);
  const location = useLocation();

  useLayoutEffect(() => {
    setNotifications(INITIAL_MAP);

    // Check if there is an notification passed via state
    const notificationState = location.state?.notification;
    if (notificationState) {
      const { key, titleMessage, textMessage, variant } = notificationState;
      pushNotification(key, {
        title: <FormattedMessage {...titleMessage} />,
        text: <FormattedMessage {...textMessage} />,
        variant: variant,
      });
    }
  }, [location.pathname]);

  const pushNotification = (key: string, alert: NotificationProps) => {
    setNotifications((prevNotifications) => {
      return new Map<string, ReactNode>([...prevNotifications]).set(
        key,
        <Notification key={key} {...alert} />,
      );
    });
  };

  const getNotifications = () => {
    return Array.from(notifications.values());
  };

  return (
    <NotificationContext.Provider
      value={{
        getNotifications,
        pushNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
