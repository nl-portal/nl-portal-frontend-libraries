import { FC, ReactElement, ReactNode, useContext, useEffect } from "react";
import { StylesProvider } from "@gemeente-denhaag/stylesprovider";
import {
  Page as PageWrapper,
  PageHeader,
  PageFooter,
} from "@gemeente-denhaag/page";
import ResponsiveContent from "@gemeente-denhaag/responsive-content";
import Header from "./Header";
import Menu from "./Menu";
import Footer, { FooterProps } from "@gemeente-denhaag/footer";
import FormIoUploader from "./FormIoUploader";
import { HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router";
import PageMetaData from "./PageMetaData";
import { Paths } from "../interfaces/paths";
import { NavigationItem } from "../interfaces/navigation-item";
import { LayoutProvider } from "../contexts/LayoutContext";
import { OidcContext } from "@nl-portal/nl-portal-authentication";

interface LayoutComponentProps {
  navigationItems: NavigationItem[][];
  paths: Paths;
  customHeader?: ReactNode;
  customFooter?: ReactNode;
  footerData?: FooterProps;
  headerLogo?: ReactElement<HTMLImageElement>;
}

const LayoutComponent: FC<LayoutComponentProps> = ({
  customHeader,
  customFooter,
  footerData,
  navigationItems,
  paths,
}) => {
  const { oidcToken } = useContext(OidcContext);
  let pageHeaderClassnames = "";

  useEffect(() => {
    FormIoUploader.register();
  }, []);

  useEffect(() => {
    FormIoUploader.setOidcToken(oidcToken);
  }, [oidcToken]);

  return (
    <PageWrapper>
      <PageHeader className={pageHeaderClassnames}>
        {customHeader || <Header menuItems={navigationItems} />}
      </PageHeader>
      <ResponsiveContent className="denhaag-page-content denhaag-responsive-content--sidebar">
        <Menu items={navigationItems} />
        <main className="denhaag-page-content__main">
          <PageMetaData navigationItems={navigationItems} />
          {<Outlet context={{ paths }} />}
        </main>
      </ResponsiveContent>
      {(footerData || customFooter) && (
        <PageFooter>
          {footerData ? <Footer {...footerData} /> : customFooter}
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
  footerData,
}) => (
  <StylesProvider>
    <LayoutProvider>
      <HelmetProvider>
        <LayoutComponent
          navigationItems={navigationItems}
          paths={paths}
          customHeader={customHeader}
          headerLogo={headerLogo}
          footerData={footerData}
          customFooter={customFooter}
        />
      </HelmetProvider>
    </LayoutProvider>
  </StylesProvider>
);

export default Layout;
