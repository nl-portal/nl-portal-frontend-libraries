import { FC, Fragment, ReactElement, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { StylesProvider } from "@gemeente-denhaag/components-react";
import {
  Page as PageWrapper,
  PageHeader,
  PageFooter,
} from "@gemeente-denhaag/page";
import ResponsiveContent from "@gemeente-denhaag/responsive-content";
import classNames from "classnames";
import Header from "./Header";
import Menu from "./Menu";
import { PortalPage } from "../interfaces/portal-page";
import { PortalFooter } from "../interfaces/portal-footer";
import Page from "./Page";
import Footer from "./Footer";
import LayoutProvider from "../providers/LayoutProvider";
import UserInformationProvider from "../providers/UserInformationProvider";
import LinkToParent from "./LinkToParent";
import OfflinePage from "../pages/OfflinePage";
import FormIoUploader from "./FormIoUploader";
import styles from "./Layout.module.scss";
import { HelmetProvider } from "react-helmet-async";

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
    path: "/",
    titleTranslationKey: "offline",
    pageComponent: <OfflinePage />,
    isHome: true,
  };

  const legacy = customHeader === undefined && customFooter === undefined;
  let pageHeaderClassnames = "";
  if (legacy) {
    pageHeaderClassnames = classNames(styles["header-wrapper--legacy"]);
  }

  useEffect(() => {
    FormIoUploader.register();
  }, []);

  return (
    <Router>
      <PageWrapper>
        <PageHeader className={pageHeaderClassnames}>
          {customHeader ||
            (headerLogo && headerLogoSmall ? (
              <Header
                logo={headerLogo}
                logoSmall={headerLogoSmall}
                facet={facet}
                homePage={pages.find((page) => page.isHome)}
                offline={offline}
              />
            ) : (
              ""
            ))}
        </PageHeader>
        <ResponsiveContent className="denhaag-page-content denhaag-responsive-content--sidebar">
          <Menu items={pages} legacy={legacy} />
          <main className="denhaag-page-content__main">
            {online && (
              <Routes>
                {pages.map((page) => (
                  <Fragment key={page.path}>
                    <Route
                      path={page.path}
                      element={<Page page={page}>{page.pageComponent}</Page>}
                    />
                    {page.children?.map((childPage) => (
                      <Route
                        key={childPage.path}
                        path={`${page.path}${childPage.path}`}
                        element={
                          <Page page={childPage}>
                            <Fragment>
                              {childPage.showLinkToParent && (
                                <LinkToParent parentPage={page} />
                              )}
                              {childPage.pageComponent}
                            </Fragment>
                          </Page>
                        }
                      />
                    ))}
                  </Fragment>
                ))}
                <Route
                  path="*"
                  element={
                    <Navigate to={sessionStorage.getItem("entryUrl") || "/"} />
                  }
                />
              </Routes>
            )}
            {offline && (
              <Routes>
                <Route
                  key={0}
                  path={offlinePage.path}
                  element={
                    <Page page={offlinePage}>{offlinePage.pageComponent}</Page>
                  }
                />
                <Route key={1} element={<Navigate to={offlinePage.path} />} />
              </Routes>
            )}
          </main>
        </ResponsiveContent>
        {online && (
          <PageFooter>
            {customFooter ||
              (footer && <Footer footer={footer} facet={facet} />)}
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

export default Layout;
