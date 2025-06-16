import { ReactNode, use, useEffect, useMemo } from "react";
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
import { OidcContext } from "@nl-portal/nl-portal-authentication";
import AppContext from "../contexts/AppContext";
import { stringToSlug } from "../utils/string-to-slug";

interface LayoutComponentProps {
  navigationItems: NavigationItem[][];
  paths: Paths;
  customHeader?: ReactNode;
  customFooter?: ReactNode;
  footerData?: FooterProps;
}

const Layout = ({
  navigationItems,
  paths,
  customHeader,
  customFooter,
  footerData,
}: LayoutComponentProps) => {
  const { themes } = use(AppContext);
  const { oidcToken } = use(OidcContext);

  useEffect(() => {
    FormIoUploader.register();
  }, []);

  useEffect(() => {
    FormIoUploader.setOidcToken(oidcToken);
  }, [oidcToken]);

  const menuItems = useMemo(() => {
    const activeThemes = themes.map((theme) => stringToSlug(theme.naam)) || [];
    return navigationItems.map((group) =>
      group.filter(
        (item) => !item.themeSlug || activeThemes.includes(item.themeSlug),
      ),
    );
  }, [themes]);

  return (
    <StylesProvider>
      <HelmetProvider>
        <PageWrapper>
          <PageHeader>
            {customHeader || <Header menuItems={navigationItems} />}
          </PageHeader>
          <ResponsiveContent className="denhaag-page-content denhaag-responsive-content--sidebar">
            <Menu items={menuItems} />
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
      </HelmetProvider>
    </StylesProvider>
  );
};

export default Layout;
