import { useGetUnopenedBerichtenCountQuery } from "@nl-portal/nl-portal-api";
import { createContext, ReactNode, useState } from "react";

interface MessagesContextType {
  messagesCount: number;
  setMessagesCount: (value: number) => void;
  refetchMessages: () => void;
}

const MessagesContext = createContext<MessagesContextType>(
  {} as MessagesContextType,
);

interface MessagesProviderProps {
  children: ReactNode;
  enableMessagesCount?: boolean;
}

export const MessagesProvider = ({
  children,
  enableMessagesCount = false,
}: MessagesProviderProps) => {
  const [messagesCount, setMessagesCount] = useState(0);

  const { refetch } = useGetUnopenedBerichtenCountQuery({
    onCompleted: (data: { getUnopenedBerichtenCount: number }) => {
      setMessagesCount(data?.getUnopenedBerichtenCount || 0);
    },
    pollInterval: window.MESSAGE_COUNT_POLLING_INTERVAL || 30000,
    fetchPolicy: "cache-and-network",
    skip: !enableMessagesCount,
    skipPollAttempt: () => {
      return !document.hasFocus();
    },
  });

  return (
    <MessagesContext.Provider
      value={{
        messagesCount,
        setMessagesCount,
        refetchMessages: () => refetch(),
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesContext;
