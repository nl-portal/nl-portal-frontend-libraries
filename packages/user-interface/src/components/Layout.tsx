import { ReactNode, use, useEffect } from "react";
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
import { OidcContext } from "@nl-portal/nl-portal-authentication";

interface LayoutComponentProps {
  paths: Paths;
  customHeader?: ReactNode;
  customFooter?: ReactNode;
  footerData?: FooterProps;
}

const Layout = ({
  paths,
  customHeader,
  customFooter,
  footerData,
}: LayoutComponentProps) => {
  const { oidcToken } = use(OidcContext);

  useEffect(() => {
    FormIoUploader.register();
  }, []);

  useEffect(() => {
    FormIoUploader.setOidcToken(oidcToken);
  }, [oidcToken]);

  return (
    <StylesProvider>
      <HelmetProvider>
        <PageWrapper>
          <PageHeader>{customHeader || <Header />}</PageHeader>
          <ResponsiveContent className="denhaag-page-content denhaag-responsive-content--sidebar">
            <Menu />
            <main className="denhaag-page-content__main">
              <PageMetaData />
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
