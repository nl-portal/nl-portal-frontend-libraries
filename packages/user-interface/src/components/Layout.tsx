import { AnchorHTMLAttributes, ReactNode, use, useEffect } from "react";
import { StylesProvider } from "@gemeente-denhaag/stylesprovider";
import {
  Page as PageWrapper,
  PageHeader,
  PageFooter,
} from "@gemeente-denhaag/page";
import { ResponsiveContent } from "@gemeente-denhaag/responsive-content";
import Header from "./Header";
import Menu from "./Menu";
import { Footer, FooterProps } from "@gemeente-denhaag/footer";
import { HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router";
import PageMetaData from "./PageMetaData";
import { Paths } from "../interfaces/paths";
import FormIoButtonWrapper from "./formio/FormIoButton";
import FormIoMultipleCheckboxWrapper from "./formio/FormIoMultipleCheckbox";
import FormIoNumberInputWrapper from "./formio/FormIoNumberInput";
import FormIoPasswordInputWrapper from "./formio/FormIoPasswordInput";
import FormIoRadioWrapper from "./formio/FormIoRadioButton";
import FormIoSelectWrapper from "./formio/FormIoSelect";
import FormIoSingleCheckboxWrapper from "./formio/FormIoSingleCheckbox";
import FormIoTextAreaWrapper from "./formio/FormIoTextArea";
import FormIoTextInputWrapper from "./formio/FormIoTextInput";
import FormIoUploader from "./formio/FormIoUploader";
import { OidcContext } from "@nl-portal/nl-portal-authentication";
import "@utrecht/document-css";

interface LayoutComponentProps {
  paths: Paths;
  headerLogo?: AnchorHTMLAttributes<HTMLAnchorElement>;
  customHeader?: ReactNode;
  customFooter?: ReactNode;
  footerData?: FooterProps;
}

const Layout = ({
  paths,
  headerLogo,
  customHeader,
  customFooter,
  footerData,
}: LayoutComponentProps) => {
  const { oidcToken } = use(OidcContext);

  useEffect(() => {
    FormIoUploader.register();
    FormIoTextInputWrapper.register();
    FormIoNumberInputWrapper.register();
    FormIoPasswordInputWrapper.register();
    FormIoSingleCheckboxWrapper.register();
    FormIoMultipleCheckboxWrapper.register();
    FormIoTextAreaWrapper.register();
    FormIoButtonWrapper.register();
    FormIoRadioWrapper.register();
    FormIoSelectWrapper.register();
  }, []);

  useEffect(() => {
    FormIoUploader.setOidcToken(oidcToken);
  }, [oidcToken]);

  return (
    <StylesProvider>
      <HelmetProvider>
        <PageWrapper>
          <PageHeader>
            {customHeader || <Header logo={headerLogo} />}
          </PageHeader>
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
