import { Alert } from "@gemeente-denhaag/alert";
import { FormattedMessage, useIntl } from "react-intl";
import { useUserInfo } from "../hooks/useUserInfo";
import CasesList from "../components/CasesList";
import PageHeader from "../components/PageHeader";
import {
  TaakV2,
  Zaak,
  useGetTakenV2Query,
  useGetZakenQuery,
} from "@nl-portal/nl-portal-api";
import TasksList from "../components/TasksList";
import PageGrid from "../components/PageGrid";
import { Paragraph } from "@gemeente-denhaag/typography";
import { ReactNode } from "react";

interface OverviewPageProps {
  showAlert?: boolean;
  alertType?: "error" | "info" | "success" | "warning";
  showIntro?: boolean;
  fetchTasksLength?: number;
  fetchCasesLength?: number;
  children?: ReactNode;
}

const OverviewPage = ({
  showAlert = false,
  alertType = "warning",
  showIntro = false,
  fetchTasksLength = 5,
  fetchCasesLength = 4,
  children,
}: OverviewPageProps) => {
  const intl = useIntl();
  const { userName, volmachtgever, isVolmachtLogin } = useUserInfo();
  const {
    data: tasksData,
    loading: tasksLoading,
    error: tasksError,
  } = useGetTakenV2Query({
    variables: { pageSize: fetchTasksLength },
    skip: !fetchTasksLength,
  });
  const {
    data: casesData,
    loading: casesLoading,
    error: casesError,
  } = useGetZakenQuery({
    variables: { isOpen: true, pageSize: fetchCasesLength },
    skip: !fetchCasesLength,
  });
  const loading = tasksLoading || casesLoading;
  const tasks = tasksData?.getTakenV2.content as TaakV2[] | undefined;
  const cases = casesData?.getZaken.content as Zaak[] | undefined;

  return (
    <PageGrid>
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
            <>
              <FormattedMessage id="overviewpage.title" />{" "}
              <span translate="no">{userName}</span>
            </>
          }
          subTitle={
            isVolmachtLogin && (
              <>
                <FormattedMessage id="overview.subTitle" />{" "}
                <span translate="no">{volmachtgever}</span>
              </>
            )
          }
        >
          <Paragraph>
            <FormattedMessage id="overviewpage.paragraph" />
          </Paragraph>
        </PageHeader>
      )}
      {children}
      {Boolean(fetchTasksLength) && (
        <TasksList
          loading={loading}
          error={Boolean(tasksError)}
          tasks={tasks}
          openInContext={true}
          totalAmount={
            tasksData?.getTakenV2.totalElements &&
            tasksData?.getTakenV2.totalElements > fetchTasksLength
              ? tasksData?.getTakenV2.totalElements
              : undefined
          }
        />
      )}
      {Boolean(fetchCasesLength) && (
        <CasesList
          loading={loading}
          error={Boolean(casesError)}
          titleTranslationId="overviewpage.casesTitle"
          listView={false}
          cases={cases}
          totalAmount={
            casesData?.getZaken.totalElements &&
            casesData?.getZaken.totalElements > fetchCasesLength
              ? casesData?.getZaken.totalElements
              : undefined
          }
        />
      )}
    </PageGrid>
  );
};

export default OverviewPage;
