import { Link } from "@gemeente-denhaag/link";
import { Alert } from "@gemeente-denhaag/alert";
import { FormattedMessage, useIntl } from "react-intl";
import { FC, useContext } from "react";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { useUserInfo } from "../hooks/useUserInfo";
import CasesList from "../components/CasesList";
import PortalLink from "../components/PortalLink";
import PageHeader from "../components/PageHeader";
import { useGetTakenQuery } from "@nl-portal/nl-portal-api";
import TasksList from "../components/TasksList";

interface OverviewPageProps {
  openFormsFormId?: string;
  showFormsLink?: boolean;
  showIntro?: boolean;
  showAlert?: boolean;
  alertType?: "error" | "info" | "success" | "warning";
  showTasksPreview?: boolean;
  showCasesPreview?: boolean;
  casesPreviewLength?: number;
}

const OverviewPage: FC<OverviewPageProps> = ({
  openFormsFormId,
  showFormsLink = false,
  showIntro = false,
  showAlert = false,
  alertType = "warning",
  showTasksPreview = false,
  showCasesPreview = false,
  casesPreviewLength = 6,
}) => {
  const intl = useIntl();
  const { hrefLang } = useContext(LocaleContext);
  const { userName, volmachtgever, isVolmachtLogin } = useUserInfo();
  const { data, loading, error } = useGetTakenQuery();

  return (
    <>
      {showAlert && (
        <Alert
          variant={alertType}
          title={intl.formatMessage({ id: "overview.alertTitle" })}
          text={intl.formatMessage({ id: "overview.alertText" })}
        />
      )}
      {showIntro && (
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
      {showFormsLink && (
        <Link
          Link={PortalLink}
          href={`/formulier/${openFormsFormId}`}
          hrefLang={hrefLang}
        >
          <FormattedMessage id="overview.defaultFormTitle" />
        </Link>
      )}
      {showTasksPreview && (
        <TasksList
          loading={loading}
          error={Boolean(error)}
          title={intl.formatMessage({ id: "overview.tasksTitle" })}
          total={64}
          tasks={data?.getTaken.content}
        />
      )}
      {showCasesPreview && (
        <CasesList showHeader numElements={casesPreviewLength} />
      )}
    </>
  );
};

export default OverviewPage;
