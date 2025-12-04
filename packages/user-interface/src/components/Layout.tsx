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
import { Templates } from "@formio/react";
import { nlPortalInput } from "./formio/FormIoInputTemplate";
import { nlPortalSelect } from "./formio/FormIoSelectTemplate";
import { nlPortalSingleCheckbox } from "./formio/FormIoSingleCheckboxTemplate";
import { nlPortalButton } from "./formio/FormIoButtonTemplate";
import { nlPortalDataGrid } from "./formio/FormIoDataGridTemplate";
import { nlPortalRadioSelectBoxesWrapper } from "./formio/FormIoRadioSelectBoxesWrapper";
import "./formio/FormIoTemplates.scss";
import { nlPortalAddress } from "./formio/FormIoAddressTemplate";
import { nlPortalWell } from "./formio/FormioWellTemplate";
import { SkipLink } from "@gemeente-denhaag/skip-link";
import styles from "./Layout.module.scss";
import { FormattedMessage } from "react-intl";

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

    const base = Templates.templates.bootstrap || Templates.current || {};
    Templates.templates["nl-portal"] = {
      ...base,
      address: nlPortalAddress,
      input: nlPortalInput,
      well: nlPortalWell,
      select: nlPortalSelect,
      radio: nlPortalRadioSelectBoxesWrapper,
      checkbox: nlPortalSingleCheckbox,
      button: nlPortalButton,
      datagrid: nlPortalDataGrid,
    };
  }, []);

  useEffect(() => {
    FormIoUploader.setOidcToken(oidcToken);
  }, [oidcToken]);

  return (
    <StylesProvider className={styles.layout}>
      <SkipLink className={styles.skiplink} href="#main-content">
        <FormattedMessage id="layout.skip" />
      </SkipLink>
      <HelmetProvider>
        <PageWrapper>
          <PageHeader>
            {customHeader || <Header logo={headerLogo} />}
          </PageHeader>
          <ResponsiveContent className="denhaag-page-content denhaag-responsive-content--sidebar">
            <Menu />
            <main id="main-content" className="denhaag-page-content__main">
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
