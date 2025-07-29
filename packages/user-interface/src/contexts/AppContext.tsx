import {
  GetOpenProductHoofdThemasQuery,
  GetUnopenedBerichtenCountQuery,
  useGetOpenProductHoofdThemasQuery,
  useGetUnopenedBerichtenCountQuery,
} from "@nl-portal/nl-portal-api";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigationType } from "react-router";
import { stringToSlug } from "../utils/string-to-slug";
import RouterContext from "./RouterContext";
import UserContext from "./UserContext";

type Themes = GetOpenProductHoofdThemasQuery["getOpenProductHoofdThemas"];

interface AppContextType {
  history: string[];
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
  const location = useLocation();
  const navType = useNavigationType();
  const [themes, setThemes] = useState<Themes>([]);
  const [messagesCount, setMessagesCount] = useState(0);
  const { navigationItems, updateNavigationItems } = useContext(RouterContext);
  const { isLoading: loadingUser } = useContext(UserContext);
  const [history, setHistory] = useState<string[]>(
    JSON.parse(localStorage.getItem("history") || "[]"),
  );

  const { loading: loadingThemes, refetch: refetchThemes } =
    useGetOpenProductHoofdThemasQuery({
      onCompleted: (data: GetOpenProductHoofdThemasQuery) => {
        setThemes(data.getOpenProductHoofdThemas);
        const activeThemes =
          data.getOpenProductHoofdThemas.map((theme) =>
            stringToSlug(theme.naam),
          ) || [];
        const newNavigationItems = navigationItems.map((group) =>
          group.filter(
            (item) => !item.themeSlug || activeThemes.includes(item.themeSlug),
          ),
        );
        updateNavigationItems(newNavigationItems);
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

  useEffect(() => {
    if (navType === "POP" || location.key === "default") return;
    const newHistory = [...history]
      .filter((item) => item !== location.pathname)
      .splice(0, 1);
    newHistory.unshift(location.pathname);
    localStorage.setItem("history", JSON.stringify(newHistory));
    setHistory(newHistory);
  }, [location]);

  if (loadingThemes || loadingMessages || loadingUser) {
    // TODO: Add fullscreen loading component
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        history,
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
