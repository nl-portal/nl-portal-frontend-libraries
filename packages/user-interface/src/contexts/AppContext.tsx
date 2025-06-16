import { useGetUnopenedBerichtenCountQuery } from "@nl-portal/nl-portal-api";
import { createContext, ReactNode, useState } from "react";

interface AppContextType {
  messagesCount: number;
  refetchMessages: () => void;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

interface MessagesProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: MessagesProviderProps) => {
  const [messagesCount, setMessagesCount] = useState(0);

  const { refetch } = useGetUnopenedBerichtenCountQuery({
    onCompleted: (data: { getUnopenedBerichtenCount: number }) => {
      setMessagesCount(data?.getUnopenedBerichtenCount || 0);
    },
    pollInterval: window.MESSAGE_COUNT_POLLING_INTERVAL || 30000,
    fetchPolicy: "cache-and-network",
    skip: window.MESSAGE_COUNT_ENABLE === "false",
    skipPollAttempt: () => {
      return !document.hasFocus();
    },
  });

  return (
    <AppContext.Provider
      value={{
        messagesCount,
        refetchMessages: () => refetch(),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
