import { createContext, ReactNode, useLayoutEffect, useReducer } from "react";
import { NotificationProps } from "../components/Notification";
import { useLocation } from "react-router";
import { isEqual } from "lodash-es";

type State = Record<string, NotificationProps>;
export type Action =
  | { type: "CREATE"; id: string; notification: NotificationProps }
  | { type: "REMOVE"; id: string }
  | { type: "CLEAR_ROUTE" };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "CREATE": {
      const prevNotification = state[action.id];
      if (prevNotification && isEqual(action.notification, prevNotification)) {
        return state;
      }
      return { ...state, [action.id]: action.notification };
    }
    case "REMOVE": {
      if (!state[action.id]) return state;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [action.id]: _, ...rest } = state;
      return rest;
    }
    case "CLEAR_ROUTE":
      return {};
    default:
      return state;
  }
};

interface NotificationContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const NotificationContext = createContext<NotificationContextType>(
  {} as NotificationContextType,
);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [state, dispatch] = useReducer(reducer, {});
  const location = useLocation();

  useLayoutEffect(() => {
    dispatch({ type: "CLEAR_ROUTE" });
  }, [location.pathname]);

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
