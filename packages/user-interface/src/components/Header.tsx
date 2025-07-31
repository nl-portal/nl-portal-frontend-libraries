import { useContext, useMemo } from "react";
import { HeaderLogic, HeaderLogicProps } from "@gemeente-denhaag/header";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { useMatches } from "react-router";
import { useIntl } from "react-intl";
import { useLogout } from "@nl-portal/nl-portal-authentication";
import AppContext from "../contexts/AppContext";
import PortalLink from "./PortalLink";
import RouterContext from "../contexts/RouterContext";
import UserContext from "../contexts/UserContext";

const Header = () => {
  const { logout } = useLogout();
  const { currentLocale, setCurrentLocale, supportedLocales } =
    useContext(LocaleContext);
  const { messagesCount } = useContext(AppContext);
  const { navigationItems } = useContext(RouterContext);
  const { username, usernameVolmacht } = useContext(UserContext);
  const intl = useIntl();

  type HandleObject = {
    label: string;
  };

  const matches = useMatches();
  const breadcrumbs = useMemo(() => {
    const list = matches
      .filter((item) => {
        const array = item.id?.split("-");
        return array?.length === 1 || array?.[array.length - 1] !== "0";
      })
      .map((item) => {
        return {
          href: item.pathname,
          label: intl.formatMessage({
            id: (item.handle as HandleObject).label,
          }),
        };
      });
    return { navigationPath: list, Link: PortalLink };
  }, [matches, intl]);

  const languages = useMemo(
    () =>
      supportedLocales.map((language) => {
        const labelKey = `language-switcher.fullname.${language}`;
        const label = intl.formatMessage({ id: labelKey });
        const active = language === currentLocale;

        return { id: language, label, active };
      }),
    [supportedLocales, currentLocale, intl],
  );

  const handleLanguageChange = (language: string) => {
    setCurrentLocale(language);
  };

  const languageSwitcherMenu = useMemo(
    () => ({
      currentLanguageLabel: intl.formatMessage({
        id: `language-switcher.shortname.${currentLocale}`,
      }),
      languageSwitcherProps: {
        variant: "button" as "button" | "link",
        label: intl.formatMessage({ id: "language-switcher.title" }),
        languages,
        onLanguageChange: handleLanguageChange,
      },
    }),
    [currentLocale, languages, intl, setCurrentLocale],
  );

  const mijnDenHaagMenu = useMemo(
    () => ({
      label: intl.formatMessage({ id: "app.appName" }),
      navigation: navigationItems.flat().map((item) => {
        const navItem = {
          label: intl.formatMessage({
            id: `pageTitles.${item.titleTranslationKey}`,
          }),
          href: item.path,
        };
        if (item.hasMessagesCount) {
          return { badgeCounter: messagesCount, ...navItem };
        }
        return navItem;
      }),
    }),
    [navigationItems, intl],
  );

  const mijnDenHaagMobileMenu = useMemo(
    () => ({
      defaultExpanded: true,
      navigation: navigationItems.flat().map((item) => {
        const navItem = {
          label: intl.formatMessage({
            id: `pageTitles.${item.titleTranslationKey}`,
          }),
          href: item.path,
        };
        if (item.hasMessagesCount) {
          return { badgeCounter: messagesCount, ...navItem };
        }
        return navItem;
      }),
    }),
    [navigationItems, intl],
  );

  const welcomeLabel = intl.formatMessage({ id: "menu.welcome" });
  const logoutLabel = intl.formatMessage({ id: "menu.logout" });
  const menuOpenLabel = intl.formatMessage({ id: "menu.menu-open-button" });
  const menuCloseLabel = intl.formatMessage({ id: "menu.menu-close-button" });
  const authorisedLoginLabel = intl.formatMessage({
    id: "menu.authorized-login-label",
  });

  const headerProps: HeaderLogicProps = {
    userprofileMenu: {
      label: (
        <>
          {welcomeLabel} <span translate="no">{username}</span>
        </>
      ),
      authorisedLoginLabel: usernameVolmacht ? (
        <>
          {authorisedLoginLabel} <span translate="no">{usernameVolmacht}</span>
        </>
      ) : null,
      CustomLink: PortalLink,
      navigationGroups: [mijnDenHaagMenu],
    },
    logoutButton: {
      label: logoutLabel,
      onLogoutClick: () => logout(),
    },
    mobileMenu: {
      openLabel: menuOpenLabel,
      closeLabel: menuCloseLabel,
      navigation: [mijnDenHaagMobileMenu],
      Link: PortalLink,
    },
  };

  return (
    <HeaderLogic
      {...headerProps}
      languageSwitcherMenu={languageSwitcherMenu}
      breadcrumbs={breadcrumbs}
    />
  );
};

export default Header;
