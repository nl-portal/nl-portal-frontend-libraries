import * as React from 'react';
import {FC, Fragment, ReactElement, useContext, useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {LocaleContext} from '@nl-portal/nl-portal-localization';
import {Link, useHistory} from 'react-router-dom';
import classNames from 'classnames';
import useSize from '@react-hook/size';
import useScrollPosition from '@react-hook/window-scroll';
import {Heading3, Heading4, IconButton} from '@gemeente-denhaag/components-react';
import {CloseIcon} from '@gemeente-denhaag/icons';
import Skeleton from 'react-loading-skeleton';
import styles from './header.module.scss';
import {LanguageSwitcher} from '../language-switcher';
import {Logout} from '../logout';
import {UserName} from '../user-name';
import {PortalPage} from '../../interfaces';
import {LayoutContext} from '../../contexts';
import {useMediaQuery} from '../../hooks';
import {BREAKPOINTS} from '../../constants';
import {CurrentPageIndicator} from '../current-page-indicator';
import {MenuToggleButton} from '../menu-toggle-button';

interface HeaderProps {
  logo: ReactElement;
  logoSmall: ReactElement;
  homePage?: PortalPage;
  facet?: ReactElement;
  offline?: boolean;
}

const Header: FC<HeaderProps> = ({logo, facet, homePage, offline, logoSmall}) => {
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
  const {hrefLang} = useContext(LocaleContext);
  const isTablet = useMediaQuery(BREAKPOINTS.TABLET);
  const intl = useIntl();
  const history = useHistory();
  const [previousScrollY, setPreviousScrollY] = useState(0);
  const [headerFixed, setHeaderFixed] = useState(false);
  const [headerMarginTop, setHeaderMarginTop] = useState(0);
  const headerContainerRef = React.useRef(null);
  const [, height] = useSize(headerContainerRef);
  const scrollY = useScrollPosition(15);
  const MOBILE_HEADER_HEIGHT = facet ? 86 : 72;
  const headerLogoElement = React.cloneElement(logo, {
    className: styles['header__logo-image'],
    alt: intl.formatMessage({id: 'app.appName'}),
  });
  const headerLogoSmallElement = React.cloneElement(logoSmall, {
    className: styles['header__logo-image'],
    alt: intl.formatMessage({id: 'app.appName'}),
  });
  const headerLogoElementToUse =
    !isTablet && fullscreenForm ? headerLogoSmallElement : headerLogoElement;
  const online = !offline;

  useEffect(() => {
    if (height !== headerHeight) {
      setHeaderHeight(height);
    }
  }, [height]);

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
      (scrollY <= MOBILE_HEADER_HEIGHT && headerFixed && headerMarginTop === MOBILE_HEADER_HEIGHT)
    ) {
      setHeaderFixed(false);
    }

    setPreviousScrollY(scrollY);
  }, [scrollY]);

  useEffect(() => {
    if (menuOpened || mobileMenuOpened) {
      hideMenu();
      hideMobileMenu();
    }

    if (headerFixed) {
      setHeaderMarginTop(MOBILE_HEADER_HEIGHT);
    }
  }, [isTablet]);

  return (
    <div
      className={classNames(styles['header-container'], {
        [styles['header-container--fixed']]: !isTablet && headerFixed,
      })}
      ref={headerContainerRef}
      style={{marginBlockStart: !isTablet ? -headerMarginTop : 0}}
    >
      {fullscreenForm && <div className={styles['header-bar']} />}
      <div
        className={classNames(styles['header-wrapper'], {
          [styles['header-wrapper--fullscreen']]: fullscreenForm,
        })}
      >
        <header
          className={classNames(styles.header, {[styles['header--fullscreen']]: fullscreenForm})}
        >
          <div className={styles.header__inner}>
            <div
              className={classNames(styles['header__logo-container'], {
                [styles['header__logo-container--fullscreen']]: fullscreenForm,
              })}
            >
              {homePage ? (
                <Link
                  to={homePage.path}
                  hrefLang={hrefLang}
                  title={intl.formatMessage({id: `pageTitles.${homePage.titleTranslationKey}`})}
                  className={styles['header__logo-link']}
                >
                  {headerLogoElementToUse}
                </Link>
              ) : (
                headerLogoElementToUse
              )}
            </div>
            {!fullscreenForm && (
              <div className={styles['header__elements-mobile']}>
                <MenuToggleButton />
              </div>
            )}
            {!fullscreenForm && (
              <div className={styles['header__elements-desktop']}>
                {online && (
                  <Fragment>
                    <div className={styles['header__element--large-spacing']}>
                      <UserName />
                    </div>
                    <div className={styles['header__element--medium-spacing']}>
                      <Logout />
                    </div>
                  </Fragment>
                )}
                <LanguageSwitcher />
              </div>
            )}
            {fullscreenForm && (
              <div className={styles['header__elements-fullscreen-form']}>
                {isTablet ? (
                  <Heading3>{currentFormTitle || <Skeleton width={250} />}</Heading3>
                ) : (
                  <Heading4>{currentFormTitle || <Skeleton width={150} />}</Heading4>
                )}
                {React.cloneElement(
                  <IconButton
                    className={styles['header__close-button']}
                    onClick={() => history.push(homePage?.path || '/')}
                  >
                    <CloseIcon />
                  </IconButton>,
                  {title: intl.formatMessage({id: 'menu.close'})}
                )}
              </div>
            )}
          </div>
        </header>
        {!fullscreenForm && (
          <div
            className={classNames(styles['header__mobile-menu'], {
              [styles['header__mobile-menu--hidden']]: !mobileMenuOpened,
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
          <div className={styles['header__facet-container']}>
            {React.cloneElement(facet, {
              className: styles['header__facet-image'],
            })}
          </div>
        )}
      </div>
      {online && !fullscreenForm && <CurrentPageIndicator />}
    </div>
  );
};

export {Header};
