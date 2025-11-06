import {
  ApiContext,
  GetOpenProductHoofdThemasByProductenQuery,
  GetUnopenedBerichtenCountQuery,
  useGetOpenProductHoofdThemasByProductenQuery,
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
import FullscreenSkeleton from "../components/FullscreenSkeleton";

type Themes =
  GetOpenProductHoofdThemasByProductenQuery["getOpenProductHoofdThemasByProducten"];

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
    if (window.USE_THEME_API !== "true") return;
    startTransition(async () => {
      try {
        const response = await fetch(`${restUri}/public/theme/logo`);
        if (!response.ok) {
          console.warn("Theme logo API failed:", response.status);
          return;
        }

        const logoUrl = await response.text();
        setLogoUrl(logoUrl);
      } catch (err) {
        console.error("Failed to load logo:", err);
      }
    });
  }, []);

  useEffect(() => {
    if (window.USE_THEME_API !== "true") return;
    startTransition(async () => {
      try {
        const styleResponse = await fetch(`${restUri}/public/theme/style`);
        if (!styleResponse.ok) {
          console.warn("Theme style API failed:", styleResponse.status);
          return;
        }

        const styleValue = await styleResponse.text();
        const styleNode = document.createElement("style");
        styleNode.nonce =
          document.querySelector<HTMLMetaElement>("meta[name='csp-nonce']")
            ?.content || "";
        styleNode.textContent = styleValue;
        document.head.appendChild(styleNode);
      } catch (err) {
        console.error("Failed to load theme styling:", err);
      }
    });
  }, []);

  const { loading: loadingThemes, refetch: refetchThemes } =
    useGetOpenProductHoofdThemasByProductenQuery({
      skip: window.OPEN_PRODUCTEN !== "true",
      onCompleted: (data: GetOpenProductHoofdThemasByProductenQuery) => {
        setThemes(data.getOpenProductHoofdThemasByProducten);
        const activeThemes =
          data.getOpenProductHoofdThemasByProducten.map((theme) =>
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

  if (firstLoad && loading) return <FullscreenSkeleton />;

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
