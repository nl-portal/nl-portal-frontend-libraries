import {
  GetOpenProductHoofdThemasQuery,
  GetUnopenedBerichtenCountQuery,
  useGetOpenProductHoofdThemasQuery,
  useGetUnopenedBerichtenCountQuery,
} from "@nl-portal/nl-portal-api";
import { createContext, ReactNode, useState } from "react";

type Themes = GetOpenProductHoofdThemasQuery["getOpenProductHoofdThemas"];

interface AppContextType {
  themes: Themes;
  messagesCount: number;
  refetchThemes: () => void;
  refetchMessages: () => void;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

interface MessagesProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: MessagesProviderProps) => {
  const [themes, setThemes] = useState<Themes>([]);
  const [messagesCount, setMessagesCount] = useState(0);

  const { loading: loadingThemes, refetch: refetchThemes } =
    useGetOpenProductHoofdThemasQuery({
      onCompleted: (data: GetOpenProductHoofdThemasQuery) => {
        setThemes(data.getOpenProductHoofdThemas);
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

  if (loadingThemes || loadingMessages) {
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        themes,
        messagesCount,
        refetchThemes,
        refetchMessages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
