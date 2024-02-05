import * as React from "react";
import {
  Alert,
  Heading2,
  Heading3,
  Link,
  Paragraph,
} from "@gemeente-denhaag/components-react";
import { FormattedMessage, useIntl } from "react-intl";
import { FC, useContext } from "react";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { useUserInfo } from "../hooks/useUserInfo";
import CasesList from "../components/CasesList";
import PortalLink from "../components/PortalLink";


interface OverviewPageProps {
  openFormsFormId?: string;
  showFormsLink?: string;
  showIntro?: string;
  personalizeIntro?: string;
  showAlert?: string;
  alertType?: "error" | "info" | "success" | "warning";
  showCasesPreview?: boolean;
  casesPreviewLength?: number;
}

const OverviewPage: FC<OverviewPageProps> = ({
  openFormsFormId,
  showFormsLink = "true",
  showIntro = "false",
  personalizeIntro = "false",
  showAlert = "false",
  alertType = "warning",
  showCasesPreview = false,
  casesPreviewLength = 6,
}) => {
  const { hrefLang } = useContext(LocaleContext);
  const intl = useIntl();

  const { userName, volmachtgever, isVolmachtLogin } = useUserInfo();

  return (
    <section>
      {showAlert === "true" && (
        <Alert
          variant={alertType}
          title={intl.formatMessage({ id: "overview.alertTitle" })}
          text={intl.formatMessage({ id: "overview.alertText" })}
        />
      )}
      {showIntro === "true" && (
        <React.Fragment>
          {personalizeIntro ? (
            <React.Fragment>
              <Heading2>
                <FormattedMessage
                  id="overviewpage.title"
                  values={{ userName }}
                />
              </Heading2>
              {isVolmachtLogin && (
                <div>
                  <Heading3>
                    <FormattedMessage
                      id="overviewpage.subtitle"
                      values={{ volmachtgever }}
                    />
                  </Heading3>
                </div>
              )}
              <Paragraph>
                <FormattedMessage id="overviewpage.paragraph" />
              </Paragraph>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Heading2 className="utrecht-heading-2">
                <FormattedMessage id="overviewpage.title" />
              </Heading2>
              <Paragraph>
                <FormattedMessage id="overviewpage.paragraph" />
              </Paragraph>
            </React.Fragment>
          )}
        </React.Fragment>
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
    </section>
  );
};

export default OverviewPage;
