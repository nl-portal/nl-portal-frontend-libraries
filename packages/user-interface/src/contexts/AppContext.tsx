import {
  GetOpenProductHoofdThemasQuery,
  GetUnopenedBerichtenCountQuery,
  useGetOpenProductHoofdThemasQuery,
  useGetUnopenedBerichtenCountQuery,
} from "@nl-portal/nl-portal-api";
import { createContext, ReactNode, useState } from "react";

type Themas = GetOpenProductHoofdThemasQuery["getOpenProductHoofdThemas"];

interface AppContextType {
  themas: Themas;
  messagesCount: number;
  refetchThemas: () => void;
  refetchMessages: () => void;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

interface MessagesProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: MessagesProviderProps) => {
  const [themas, setThemas] = useState<Themas>([]);
  const [messagesCount, setMessagesCount] = useState(0);

  const { loading: loadingThemas, refetch: refetchThemas } =
    useGetOpenProductHoofdThemasQuery({
      onCompleted: (data: GetOpenProductHoofdThemasQuery) => {
        setThemas(data.getOpenProductHoofdThemas);
      },
    });

  const { loading: loadingMessages, refetch: refetchMessages } =
    useGetUnopenedBerichtenCountQuery({
      onCompleted: (data: GetUnopenedBerichtenCountQuery) => {
        setMessagesCount(data?.getUnopenedBerichtenCount || 0);
      },
      pollInterval: window.MESSAGE_COUNT_POLLING_INTERVAL || 30000,
      fetchPolicy: "cache-and-network",
      skip: window.MESSAGE_COUNT_ENABLE === "false",
      skipPollAttempt: () => {
        return !document.hasFocus();
      },
    });

  if (loadingThemas || loadingMessages) {
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        themas,
        messagesCount,
        refetchThemas,
        refetchMessages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
