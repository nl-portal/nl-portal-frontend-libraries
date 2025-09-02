import {
  ApiContext,
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
  useTransition,
} from "react";
import { useLocation, useNavigationType } from "react-router";
import { stringToSlug } from "../utils/string-to-slug";
import RouterContext from "./RouterContext";
import UserContext from "./UserContext";

type Themes = GetOpenProductHoofdThemasQuery["getOpenProductHoofdThemas"];

interface AppContextType {
  history: string[];
  logoUrl: string | undefined;
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
  const [firstLoad, setFirstLoad] = useState(true);
  const { restUri } = useContext(ApiContext);
  const [logoUrl, setLogoUrl] = useState<string | undefined>(undefined);
  const [themes, setThemes] = useState<Themes>([]);
  const [messagesCount, setMessagesCount] = useState(0);
  const [loadingConfig, startTransition] = useTransition();
  const { initNavigationItems, updateNavigationItems } =
    useContext(RouterContext);
  const { isLoading: loadingUser } = useContext(UserContext);
  const [history, setHistory] = useState<string[]>(
    JSON.parse(localStorage.getItem("history") || "[]"),
  );

  useEffect(() => {
    startTransition(async () => {
      const response = await fetch(`${restUri}/public/theme/logo`);
      const base64 = await response.text();
      const logoUrl = `data:image;base64,${base64}`;
      setLogoUrl(logoUrl);
    });
  }, []);

  useEffect(() => {
    startTransition(async () => {
      const styleResponse = await fetch(`${restUri}/public/theme/style`);
      const style = await styleResponse.json();

      Object.entries(style).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value as string | null);
      });
    });
  }, []);

  const { loading: loadingThemes, refetch: refetchThemes } =
    useGetOpenProductHoofdThemasQuery({
      skip: window.OPEN_PRODUCTEN !== "true",
      onCompleted: (data: GetOpenProductHoofdThemasQuery) => {
        setThemes(data.getOpenProductHoofdThemas);
        const activeThemes =
          data.getOpenProductHoofdThemas.map((theme) =>
            stringToSlug(theme.naam),
          ) || [];
        const newNavigationItems = initNavigationItems.map((group) =>
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

  const loading =
    loadingConfig || loadingThemes || loadingMessages || loadingUser;

  useEffect(() => {
    if (!firstLoad) return;
    if (loading) return;
    setFirstLoad(false);
  }, [loading]);

  useEffect(() => {
    if (navType === "POP" || location.key === "default") return;
    const newHistory = [...history]
      .filter((item) => item !== location.pathname)
      .splice(0, 1);
    newHistory.unshift(location.pathname);
    localStorage.setItem("history", JSON.stringify(newHistory));
    setHistory(newHistory);
  }, [location]);

  if (firstLoad && loading) {
    // TODO: Add fullscreen loading component
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        history,
        logoUrl,
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
