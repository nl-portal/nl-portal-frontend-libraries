import { Link } from "@gemeente-denhaag/link";
import { Alert } from "@gemeente-denhaag/alert";
import { FormattedMessage, useIntl } from "react-intl";
import { FC, useContext } from "react";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { useUserInfo } from "../hooks/useUserInfo";
import CasesList from "../components/CasesList";
import PortalLink from "../components/PortalLink";
import PageHeader from "../components/PageHeader";

interface OverviewPageProps {
  openFormsFormId?: string;
  showFormsLink?: string;
  showIntro?: string;
  showAlert?: string;
  alertType?: "error" | "info" | "success" | "warning";
  showCasesPreview?: boolean;
  casesPreviewLength?: number;
}

const OverviewPage: FC<OverviewPageProps> = ({
  openFormsFormId,
  showFormsLink = "true",
  showIntro = "false",
  showAlert = "false",
  alertType = "warning",
  showCasesPreview = false,
  casesPreviewLength = 6,
}) => {
  const intl = useIntl();
  const { hrefLang } = useContext(LocaleContext);
  const { userName, volmachtgever, isVolmachtLogin } = useUserInfo();

  return (
    <>
      {showAlert === "true" && (
        <Alert
          variant={alertType}
          title={intl.formatMessage({ id: "overview.alertTitle" })}
          text={intl.formatMessage({ id: "overview.alertText" })}
        />
      )}
      {showIntro === "true" && (
        <PageHeader
          title={
            <FormattedMessage id="overviewpage.title" values={{ userName }} />
          }
          subTitle={
            isVolmachtLogin && (
              <FormattedMessage
                id="overview.subTitle"
                values={{ volmachtgever }}
              />
            )
          }
        >
          <FormattedMessage id="overviewpage.paragraph" />
        </PageHeader>
      )}
      {showFormsLink === "true" && (
        <Link
          Link={PortalLink}
          href={`/formulier/${openFormsFormId}`}
          hrefLang={hrefLang}
        >
          <FormattedMessage id="overview.defaultFormTitle" />
        </Link>
      )}
      {showCasesPreview && (
        <CasesList showHeader numElements={casesPreviewLength} />
      )}
    </>
  );
};

export default OverviewPage;
