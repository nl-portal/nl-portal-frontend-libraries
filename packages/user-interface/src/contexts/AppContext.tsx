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

interface Features {
  properties: {
    custom: Record<string, string | number>;
    messageCountPollingInterval: number;
    myAddressChangeUrl: string;
    myAddressResearchMoreInfoUrl: string;
    myAddressResearchUrl: string;
    myBrpChangeUrl: string;
    myBrpConfidentiallyChangeUrl: string;
    myGenderChangeUrl: string;
    myNameChangeUrl: string;
    overviewMaintenanceAlertTextEn: string;
    overviewMaintenanceAlertTextNl: string;
    overviewMaintenanceAlertTitleEn: string;
    overviewMaintenanceAlertTitleNl: string;
  };
  toggles: {
    custom: Record<string, boolean>;
    casesPartialSearchEnabled: boolean;
    casesResultExplanationEnabled: boolean;
    legacyPaymentEnabled: boolean;
    messageCountEnabled: boolean;
    myInhabitantCountEnabled: boolean;
    openProductEnabled: boolean;
    overviewIntroEnabled: boolean;
    overviewMaintenanceAlertEnabled: boolean;
    themeApiEnabled: boolean;
  };
}

// Deprecated: remove window variables below in next major version
const deprecatedFeatures: Features = {
  properties: {
    custom: {},
    messageCountPollingInterval: window.MESSAGE_COUNT_POLLING_INTERVAL || 30000,
    myAddressChangeUrl: window.REPORT_CHANGE_OF_ADDRESS_URL || "",
    myAddressResearchMoreInfoUrl: window.ADDRESS_RESEARCH_MORE_INFO_URL || "",
    myAddressResearchUrl: window.ADDRESS_RESEARCH_URL || "",
    myBrpChangeUrl: window.REQUEST_FOR_CHANGE_BRP_INFO_URL || "",
    myBrpConfidentiallyChangeUrl:
      window.REQUEST_CONFIDENTIALITY_OF_DATA_URL || "",
    myGenderChangeUrl: window.CHANGE_REGISTERED_GENDER_URL || "",
    myNameChangeUrl: window.CHANGE_IN_USE_OF_SURNAME_URL || "",
    overviewMaintenanceAlertTextEn:
      window.OVERVIEW_MAINTENANCE_ALERT_TEXT_EN || "",
    overviewMaintenanceAlertTextNl:
      window.OVERVIEW_MAINTENANCE_ALERT_TEXT_NL || "",
    overviewMaintenanceAlertTitleEn:
      window.OVERVIEW_MAINTENANCE_ALERT_TITLE_EN || "",
    overviewMaintenanceAlertTitleNl:
      window.OVERVIEW_MAINTENANCE_ALERT_TITLE_NL || "",
  },
  toggles: {
    custom: {},
    casesPartialSearchEnabled: window.CASES_PARTIAL_SEARCH === "true",
    casesResultExplanationEnabled:
      window.SHOW_CASE_RESULT_EXPLANATION === "true",
    legacyPaymentEnabled: window.USE_LEGACY_OGONE_PAYMENT === "true",
    messageCountEnabled: window.MESSAGE_COUNT_ENABLE === "true",
    myInhabitantCountEnabled: window.SHOW_INHABITANT_AMOUNT === "true",
    openProductEnabled: window.OPEN_PRODUCTEN === "true",
    overviewIntroEnabled: window.OVERVIEW_INTRO_ENABLED === "true",
    overviewMaintenanceAlertEnabled:
      window.OVERVIEW_MAINTENANCE_ALERT_ENABLED === "true",
    themeApiEnabled: window.USE_THEME_API === "true",
  },
};

type Themes =
  GetOpenProductHoofdThemasByProductenQuery["getOpenProductHoofdThemasByProducten"];

interface AppContextType {
  history: string[];
  features: Features | undefined;
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
  const [features, setFeatures] = useState<Features | undefined>(undefined);
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
    if (features) return;
    startTransition(async () => {
      try {
        const response = await fetch(`${restUri}/public/features`);

        if (!response.ok) {
          console.warn("Theme features API failed:", response.status);
          return;
        }

        const json = (await response.json()) as Features & {
          properties: {
            custom: string;
          };
          toggles: {
            custom: string;
          };
        };
        json.properties.custom = JSON.parse(json.properties.custom || "{}");
        json.toggles.custom = JSON.parse(json.toggles.custom || "{}");

        setFeatures({ ...deprecatedFeatures, ...json });
      } catch (err) {
        console.error("Failed to load features:", err);
      }
    });
  }, [restUri, startTransition]);

  useEffect(() => {
    if (!features?.toggles.themeApiEnabled) return;
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
  }, [restUri, startTransition, features]);

  useEffect(() => {
    if (!features?.toggles.themeApiEnabled) return;
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
  }, [restUri, startTransition, features]);

  const {
    loading: loadingThemes,
    refetch: refetchThemes,
    data: themesData,
  } = useQuery(GetOpenProductHoofdThemasByProductenDocument, {
    skip: !features?.toggles.openProductEnabled,
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

  const { refetch: refetchMessages, data: messagesData } = useQuery(
    GetUnopenedBerichtenCountDocument,
    {
      pollInterval: features?.properties?.messageCountPollingInterval || 30000,
      fetchPolicy: "cache-and-network",
      skip: !features?.toggles.messageCountEnabled,
      skipPollAttempt: () => {
        return !document.hasFocus();
      },
    },
  );

  const messagesCount = useMemo(
    () => messagesData?.getUnopenedBerichtenCount || 0,
    [messagesData],
  );

  const loading = loadingConfig || loadingThemes || loadingUser;

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    if (loading || !firstLoad) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFirstLoad(false);
  }, [loading]);

  if (loading || firstLoad) return <FullscreenSkeleton />;

  return (
    <AppContext.Provider
      value={{
        history,
        features,
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
