import * as React from "react";
import { Fragment, ReactElement, useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import useSize from "@react-hook/size";
import useScrollPosition from "@react-hook/window-scroll";
import { IconButton } from "@gemeente-denhaag/iconbutton";
import { CloseIcon } from "@gemeente-denhaag/icons";
import ResponsiveContent from "@gemeente-denhaag/responsive-content";
import Skeleton from "react-loading-skeleton";
import styles from "./Header.module.scss";
import LanguageSwitcher from "./LanguageSwitcher";
import Logout from "./Logout";
import UserName from "./UserName";
import LayoutContext from "../contexts/LayoutContext";
import useMediaQuery from "../hooks/useMediaQuery";
import { BREAKPOINTS } from "../constants/breakpoints";
import CurrentPageIndicator from "./CurrentPageIndicator";
import MenuToggleButton from "./MenuToggleButton";
import { NavigationItem } from "../interfaces/navigation-item";
import Heading from "./Heading";

interface HeaderProps {
  logo: ReactElement;
  logoSmall: ReactElement;
  navigationItems: NavigationItem[][];
  facet?: ReactElement;
  offline?: boolean;
}

const Header = ({
  logo,
  facet,
  navigationItems,
  offline,
  logoSmall,
}: HeaderProps) => {
  const {
    mobileMenuOpened,
    menuOpened,
    hideMobileMenu,
    hideMenu,
    headerHeight,
    setHeaderHeight,
    fullscreenForm,
    currentFormTitle,
  } = useContext(LayoutContext);
  const { hrefLang } = useContext(LocaleContext);
  const isTablet = useMediaQuery(BREAKPOINTS.TABLET);
  const intl = useIntl();
  const navigate = useNavigate();
  const [previousScrollY, setPreviousScrollY] = useState(0);
  const [headerFixed, setHeaderFixed] = useState(false);
  const [headerMarginTop, setHeaderMarginTop] = useState(0);
  const headerContainerRef = React.useRef<HTMLDivElement>(null!);
  const [, height] = useSize(headerContainerRef);
  const scrollY = useScrollPosition(15);
  const MOBILE_HEADER_HEIGHT = facet ? 86 : 72;
  const headerLogoElement = React.cloneElement(
    logo as ReactElement<HTMLImageElement>,
    {
      className: styles["header__logo-image"],
      alt: intl.formatMessage({ id: "app.appName" }),
    },
  );
  const headerLogoSmallElement = React.cloneElement(
    logoSmall as ReactElement<HTMLImageElement>,
    {
      className: styles["header__logo-image"],
      alt: intl.formatMessage({ id: "app.appName" }),
    },
  );
  const headerLogoElementToUse =
    !isTablet && fullscreenForm ? headerLogoSmallElement : headerLogoElement;
  const online = !offline;
  const homeNavigation = navigationItems[0][0];

  useEffect(() => {
    if (height !== headerHeight) {
      setHeaderHeight(height);
    }
  }, [height, headerHeight]);

  useEffect(() => {
    const scrollDown = previousScrollY < scrollY;
    const scrollUp = previousScrollY > scrollY;
    const pastPositionCutoff = scrollY > MOBILE_HEADER_HEIGHT;

    if (scrollDown) {
      hideMobileMenu();
    }

    if (scrollUp) {
      setHeaderMarginTop(0);
    } else if (pastPositionCutoff) {
      setHeaderMarginTop(MOBILE_HEADER_HEIGHT);
    }

    if (pastPositionCutoff && !headerFixed) {
      setHeaderFixed(true);
      setHeaderMarginTop(MOBILE_HEADER_HEIGHT);
    } else if (
      scrollY === 0 ||
      (scrollY <= MOBILE_HEADER_HEIGHT &&
        headerFixed &&
        headerMarginTop === MOBILE_HEADER_HEIGHT)
    ) {
      setHeaderFixed(false);
    }

    setPreviousScrollY(scrollY);
  }, [scrollY, headerFixed, headerMarginTop]);

  useEffect(() => {
    if (menuOpened || mobileMenuOpened) {
      hideMenu();
      hideMobileMenu();
    }

    if (headerFixed) {
      setHeaderMarginTop(MOBILE_HEADER_HEIGHT);
    }
  }, [isTablet, headerFixed]);

  return (
    <div
      ref={headerContainerRef}
      className={classNames(styles["header-container"], {
        [styles["header-container--fixed"]]: !isTablet && headerFixed,
      })}
      style={{ marginBlockStart: !isTablet ? -headerMarginTop : 0 }}
    >
      {fullscreenForm && <div className={styles["header-bar"]} />}
      <div
        className={classNames(styles["header-wrapper"], {
          [styles["header-wrapper--fullscreen"]]: fullscreenForm,
        })}
      >
        <header
          className={classNames(styles.header, {
            [styles["header--fullscreen"]]: fullscreenForm,
          })}
        >
          <ResponsiveContent className={styles.header__inner}>
            <div
              className={classNames(styles["header__logo-container"], {
                [styles["header__logo-container--fullscreen"]]: fullscreenForm,
              })}
            >
              {homeNavigation ? (
                <Link
                  to={homeNavigation.path}
                  hrefLang={hrefLang}
                  title={intl.formatMessage({
                    id: `pageTitles.${homeNavigation.titleTranslationKey}`,
                  })}
                  className={styles["header__logo-link"]}
                >
                  {headerLogoElementToUse}
                </Link>
              ) : (
                headerLogoElementToUse
              )}
            </div>
            {!fullscreenForm && (
              <div className={styles["header__elements-mobile"]}>
                <MenuToggleButton />
              </div>
            )}
            {!fullscreenForm && (
              <div className={styles["header__elements-desktop"]}>
                {online && (
                  <Fragment>
                    <div className={styles["header__element--large-spacing"]}>
                      <UserName />
                    </div>
                    <div className={styles["header__element--medium-spacing"]}>
                      <Logout />
                    </div>
                  </Fragment>
                )}
                <LanguageSwitcher />
              </div>
            )}
            {fullscreenForm && (
              <div className={styles["header__elements-fullscreen-form"]}>
                {isTablet ? (
                  <Heading as="h3">
                    {currentFormTitle || <Skeleton width={250} />}
                  </Heading>
                ) : (
                  <Heading as="h4">
                    {currentFormTitle || <Skeleton width={150} />}
                  </Heading>
                )}
                {React.cloneElement(
                  <IconButton
                    className={styles["header__close-button"]}
                    onClick={() => navigate(homeNavigation?.path || "/")}
                  >
                    <CloseIcon />
                  </IconButton>,
                  { title: intl.formatMessage({ id: "menu.close" }) },
                )}
              </div>
            )}
          </ResponsiveContent>
        </header>
        {!fullscreenForm && (
          <div
            className={classNames(styles["header__mobile-menu"], {
              [styles["header__mobile-menu--hidden"]]: !mobileMenuOpened,
            })}
          >
            {online && (
              <Fragment>
                <UserName mobileMenu />
                <Logout mobileMenu />
              </Fragment>
            )}
            <LanguageSwitcher mobileMenu />
          </div>
        )}
        {facet && !fullscreenForm && (
          <div className={styles["header__facet-container"]}>
            {React.cloneElement(facet as ReactElement<HTMLDivElement>, {
              className: styles["header__facet-image"],
            })}
          </div>
        )}
      </div>
      {online && !fullscreenForm && (
        <CurrentPageIndicator navigationItems={navigationItems} />
      )}
    </div>
  );
};

export default Header;
