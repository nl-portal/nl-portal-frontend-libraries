import { useContext, useEffect } from "react";
import { NotificationProps } from "./Notification";
import NotificationContext from "../contexts/NotificationContext";

export const NotifyOnMount = ({
  id,
  ...props
}: NotificationProps & { id: string }) => {
  const { dispatch } = useContext(NotificationContext);
  useEffect(() => {
    dispatch({ type: "CREATE", id: id, notification: props });
  }, [dispatch, id, props]);
  return null;
};
