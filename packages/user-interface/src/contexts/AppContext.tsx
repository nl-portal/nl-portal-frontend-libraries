import {
  ApiContext,
  GetOpenProductHoofdThemasByProductenDocument,
  GetOpenProductHoofdThemasByProductenQuery,
  GetUnopenedBerichtenCountDocument,
} from "@nl-portal/nl-portal-api";
import { useQuery } from "@apollo/client/react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
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
  const { restUri } = useContext(ApiContext);
  const [logoUrl, setLogoUrl] = useState<string | undefined>(undefined);
  const [loadingConfig, startTransition] = useTransition();
  const { initNavigationItems, updateNavigationItems } =
    useContext(RouterContext);
  const { isLoading: loadingUser } = useContext(UserContext);

  const history = useMemo<string[]>(() => {
    const stored = JSON.parse(
      localStorage.getItem("history") || "[]",
    ) as string[];

    if (navType === "POP" || location.key === "default") return stored;

    const newHistory = stored
      .filter((item) => item !== location.pathname)
      .slice(0, 1);
    newHistory.unshift(location.pathname);

    return newHistory;
  }, [location.pathname, location.key, navType]);

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
  }, [restUri, startTransition]);

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

  const {
    loading: loadingThemes,
    refetch: refetchThemes,
    data: themesData,
  } = useQuery(GetOpenProductHoofdThemasByProductenDocument, {
    skip: window.OPEN_PRODUCTEN !== "true",
  });

  const themes: Themes = useMemo(
    () => themesData?.getOpenProductHoofdThemasByProducten ?? [],
    [themesData],
  );

  useEffect(() => {
    if (!themesData) return;

    const activeThemes = themes.map((theme) => stringToSlug(theme.naam)) || [];

    const newNavigationItems = initNavigationItems.map((group) =>
      group.filter(
        (item) => !item.themeSlug || activeThemes.includes(item.themeSlug),
      ),
    );

    updateNavigationItems(newNavigationItems);
  }, [themesData, initNavigationItems, themes]);

  const {
    loading: loadingMessages,
    refetch: refetchMessages,
    data: messagesData,
  } = useQuery(GetUnopenedBerichtenCountDocument, {
    pollInterval: window.MESSAGE_COUNT_POLLING_INTERVAL || 30000,
    fetchPolicy: "cache-and-network",
    skip: window.MESSAGE_COUNT_ENABLE === "false",
    skipPollAttempt: () => {
      return !document.hasFocus();
    },
  });

  const messagesCount = useMemo(
    () => messagesData?.getUnopenedBerichtenCount || 0,
    [messagesData],
  );

  const loading =
    loadingConfig || loadingThemes || loadingMessages || loadingUser;

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  const firstLoad = useMemo(() => {
    if (loading) return true;
    return false;
  }, [loading]);

  if (loading && firstLoad) return <FullscreenSkeleton />;

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
