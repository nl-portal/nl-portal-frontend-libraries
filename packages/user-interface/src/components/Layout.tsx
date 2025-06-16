import { ReactNode, use, useEffect, useMemo } from "react";
import { StylesProvider } from "@gemeente-denhaag/stylesprovider";
import { Page as PageWrapper, PageHeader } from "@gemeente-denhaag/page";
import ResponsiveContent from "@gemeente-denhaag/responsive-content";
import Header from "./Header";
import Menu from "./Menu";
import FormIoUploader from "./FormIoUploader";
import { HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router";
import PageMetaData from "./PageMetaData";
import { Paths } from "../interfaces/paths";
import { NavigationItem } from "../interfaces/navigation-item";
import { LayoutProvider } from "../contexts/LayoutContext";
import { OidcContext } from "@nl-portal/nl-portal-authentication";
import AppContext from "../contexts/AppContext";
import { stringToSlug } from "../utils/string-to-slug";

interface LayoutComponentProps {
  navigationItems: NavigationItem[][];
  paths: Paths;
  customHeader?: ReactNode;
}

const Layout = ({
  navigationItems,
  paths,
  customHeader,
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
      <LayoutProvider>
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
          </PageWrapper>
        </HelmetProvider>
      </LayoutProvider>
    </StylesProvider>
  );
};

export default Layout;
