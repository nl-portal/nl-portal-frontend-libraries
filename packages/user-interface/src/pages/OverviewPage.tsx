import { Link } from "@gemeente-denhaag/link";
import { Alert } from "@gemeente-denhaag/alert";
import { FormattedMessage, useIntl } from "react-intl";
import { FC, useContext } from "react";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { useUserInfo } from "../hooks/useUserInfo";
import CasesList from "../components/CasesList";
import PortalLink from "../components/PortalLink";
import PageHeader from "../components/PageHeader";
import { useGetTakenQuery, useGetZakenQuery } from "@nl-portal/nl-portal-api";
import TasksList from "../components/TasksList";
import { GetZakenQuery } from "@nl-portal/nl-portal-api";

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
  casesPreviewLength = 4,
}) => {
  const intl = useIntl();
  const { hrefLang } = useContext(LocaleContext);
  const { userName, volmachtgever, isVolmachtLogin } = useUserInfo();
  const {
    data: taskData,
    loading: taskLoading,
    error: taskError,
  } = useGetTakenQuery();
  const {
    data: caseData,
    loading: caseLoading,
    error: caseError,
  } = useGetZakenQuery();
  const loading = taskLoading || caseLoading;

  const casesDummy: GetZakenQuery["getZaken"][0] = [
    {
      uuid: "1",
      title: "Zaak 1",
      omschrijving: "Omschrijving zaak 1",
      startdatum: new Date(),
      zaaktype: {
        identificatie: "ZAAKTYPE1",
      },
    },
    {
      uuid: "2",
      title: "Zaak 2",
      omschrijving: "Omschrijving zaak 2",
      startdatum: new Date(),
      zaaktype: {
        identificatie: "ZAAKTYPE2",
      },
    },
    {
      uuid: "3",
      title: "Zaak 3",
      omschrijving: "Omschrijving zaak 3",
      startdatum: new Date(),
      zaaktype: {
        identificatie: "ZAAKTYPE3",
      },
    },
  ];

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
          error={Boolean(taskError)}
          title={intl.formatMessage({ id: "overview.tasksTitle" })}
          tasks={taskData?.getTaken.content}
        />
      )}
      {showCasesPreview && (
        <CasesList
          loading={loading}
          error={Boolean(caseError)}
          title={intl.formatMessage({ id: "overview.casesTitle" })}
          cases={casesDummy}
        />
      )}
    </>
  );
};

export default OverviewPage;
