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
import FormIoUploader from "./formio/FormIoUploader";
import { OidcContext } from "@nl-portal/nl-portal-authentication";
import "@utrecht/document-css";
import { Templates } from "@formio/js";
import { nlPortalInput } from "./formio/FormIoInputTemplate";
import { nlPortalSelect } from "./formio/FormIoSelectTemplate";
import { nlPortalRadioButton } from "./formio/FormIoRadioButtonTemplate";
import { nlPortalSingleCheckbox } from "./formio/FormIoSingleCheckboxTemplate";
import { nlPortalMultipleCheckboxes } from "./formio/FormIoMultipleCheckboxesTemplate";
import { nlPortalButton } from "./formio/FormIoButtonTemplate";
import { nlPortalDataGrid } from "./formio/FormIoDataGridTemplate";
import "./formio/FormIoTemplates.scss";

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
    const t = (Templates.templates["nl-portal"] ||= {});
    t.input = nlPortalInput;
    t.select = nlPortalSelect;
    t.radio = nlPortalRadioButton;
    t.checkbox = nlPortalSingleCheckbox;
    t.checkboxes = nlPortalMultipleCheckboxes;
    t.button = nlPortalButton;
    t.datagrid = nlPortalDataGrid;
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
