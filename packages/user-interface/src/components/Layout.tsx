import { FC, ReactElement, useEffect } from "react";
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
import { PortalFooter } from "../interfaces/portal-footer";
import Footer from "./Footer";
import LayoutProvider from "../providers/LayoutProvider";
import FormIoUploader from "./FormIoUploader";
import styles from "./Layout.module.scss";
import { HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import PageMetaData from "./PageMetaData";
import { Paths } from "../interfaces/paths";
import { NavigationItem } from "../interfaces/navigation-item";

interface LayoutComponentProps {
  navigationItems: NavigationItem[][];
  paths: Paths;
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
  navigationItems,
  paths,
  footer,
  offline,
  headerLogoSmall,
}) => {
  const online = !offline;
  const legacy = customHeader === undefined && customFooter === undefined;
  let pageHeaderClassnames = "";
  if (legacy) {
    pageHeaderClassnames = classNames(styles["header-wrapper--legacy"]);
  }

  useEffect(() => {
    FormIoUploader.register();
  }, []);

  return (
    <PageWrapper>
      <PageHeader className={pageHeaderClassnames}>
        {customHeader ||
          (headerLogo && headerLogoSmall ? (
            <Header
              logo={headerLogo}
              logoSmall={headerLogoSmall}
              facet={facet}
              navigationItems={navigationItems}
              offline={offline}
            />
          ) : (
            ""
          ))}
      </PageHeader>
      <ResponsiveContent className="denhaag-page-content denhaag-responsive-content--sidebar">
        <Menu items={navigationItems} legacy={legacy} />
        <main className="denhaag-page-content__main">
          <PageMetaData navigationItems={navigationItems}>
            {<Outlet context={{ paths }} />}
          </PageMetaData>
        </main>
      </ResponsiveContent>
      {online && (
        <PageFooter>
          {customFooter || (footer && <Footer footer={footer} facet={facet} />)}
        </PageFooter>
      )}
    </PageWrapper>
  );
};

const Layout: FC<LayoutComponentProps> = ({
  navigationItems,
  paths,
  customHeader,
  customFooter,
  headerLogo,
  facet,
  footer,
  offline,
  headerLogoSmall,
}) => (
  <StylesProvider>
    <LayoutProvider>
      <HelmetProvider>
        <LayoutComponent
          navigationItems={navigationItems}
          paths={paths}
          customHeader={customHeader}
          headerLogo={headerLogo}
          headerLogoSmall={headerLogoSmall}
          footer={footer}
          customFooter={customFooter}
          facet={facet}
          offline={offline}
        />
      </HelmetProvider>
    </LayoutProvider>
  </StylesProvider>
);

export default Layout;
