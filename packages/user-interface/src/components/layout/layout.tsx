import React, {FC, Fragment, ReactElement, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {StylesProvider} from '@gemeente-denhaag/components-react';
import {Page as PageWrapper, PageHeader, PageFooter} from '@gemeente-denhaag/page';
import ResponsiveContent from '@gemeente-denhaag/responsive-content';
import classNames from 'classnames';
import {Header} from '../header';
import {Menu} from '../menu';
import {PortalFooter, PortalPage} from '../../interfaces';
import {Page} from '../page';
import {Footer} from '../footer';
import {LayoutProvider, UserInformationProvider} from '../../providers';
import {LinkToParent} from '../link-to-parent';
import {OfflinePage} from '../../pages';
import {FormIoUploader} from '../form-io-uploader';
import styles from './layout.module.scss';
import {HelmetProvider} from 'react-helmet-async';

interface LayoutComponentProps {
  pages: Array<PortalPage>;
  customHeader?: ReactElement;
  customFooter?: ReactElement;
  headerLogo?: ReactElement;
  headerLogoSmall?: ReactElement;
  facet?: ReactElement;
  footer?: PortalFooter;
  offline?: boolean;
}

const LayoutComponent: FC<LayoutComponentProps> = ({
  customHeader,
  customFooter,
  headerLogo,
  facet,
  pages,
  footer,
  offline,
  headerLogoSmall,
}) => {
  const online = !offline;
  const offlinePage = {
    path: '/',
    titleTranslationKey: 'offline',
    pageComponent: <OfflinePage />,
    isHome: true,
  };

  const legacy = customHeader === undefined && customFooter === undefined;
  let pageHeaderClassnames = '';
  if (legacy) {
    pageHeaderClassnames = classNames(styles['header-wrapper--legacy']);
  }

  useEffect(() => {
    FormIoUploader.register();
  }, []);

  return (
    <Router>
      <PageWrapper>
        <PageHeader className={pageHeaderClassnames}>
          {customHeader ? (
            customHeader
          ) : headerLogo && headerLogoSmall ? (
            <Header
              logo={headerLogo}
              logoSmall={headerLogoSmall}
              facet={facet}
              homePage={pages.find(page => page.isHome)}
              offline={offline}
            />
          ) : (
            ''
          )}
        </PageHeader>
        <ResponsiveContent className="denhaag-page-content denhaag-responsive-content--sidebar">
          <Menu items={pages} legacy={legacy} />
          <div className="denhaag-page-content__main">
            {online && (
              <Switch>
                {pages.reduce(
                  (accumulator, page) => [
                    ...accumulator,
                    <Route exact key={page.path} path={page.path}>
                      <Page page={page}>{page.pageComponent}</Page>
                    </Route>,
                    ...(page.children
                      ? page.children.map(childPage => (
                          <Route key={childPage.path} path={`${page.path}${childPage.path}`}>
                            <Page page={childPage}>
                              <Fragment>
                                {childPage.showLinkToParent && <LinkToParent parentPage={page} />}
                                {childPage.pageComponent}
                              </Fragment>
                            </Page>
                          </Route>
                        ))
                      : []),
                  ],
                  []
                )}
                <Route render={() => <Redirect to={sessionStorage.getItem('entryUrl') || '/'} />} />
              </Switch>
            )}
            {offline && (
              <Switch>
                <Route exact key={0} path={offlinePage.path}>
                  <Page page={offlinePage}>{offlinePage.pageComponent}</Page>
                </Route>
                <Route key={1} render={() => <Redirect to={offlinePage.path} />} />
              </Switch>
            )}
          </div>
        </ResponsiveContent>
        {online && (
          <PageFooter>
            {customFooter ? customFooter : footer && <Footer footer={footer} facet={facet} />}
          </PageFooter>
        )}
      </PageWrapper>
    </Router>
  );
};

const Layout: FC<LayoutComponentProps> = ({
  customHeader,
  customFooter,
  headerLogo,
  facet,
  pages,
  footer,
  offline,
  headerLogoSmall,
}) => (
  <StylesProvider>
    <LayoutProvider initialPage={pages[0]}>
      <UserInformationProvider>
        <HelmetProvider>
          <LayoutComponent
            pages={pages}
            customHeader={customHeader}
            headerLogo={headerLogo}
            headerLogoSmall={headerLogoSmall}
            footer={footer}
            customFooter={customFooter}
            facet={facet}
            offline={offline}
          />
        </HelmetProvider>
      </UserInformationProvider>
    </LayoutProvider>
  </StylesProvider>
);

export {Layout};
