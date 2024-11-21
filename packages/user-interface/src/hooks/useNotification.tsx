import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContext";

const useNotification = () => {
  return useContext(NotificationContext);
};

export default useNotification;
