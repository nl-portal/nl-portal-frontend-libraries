import { Alert } from "@gemeente-denhaag/alert";
import { FormattedMessage, useIntl } from "react-intl";
import { useUserInfo } from "../hooks/useUserInfo";
import CasesList from "../components/CasesList";
import PageHeader from "../components/PageHeader";
import {
  Taak,
  Zaak,
  useGetTakenQuery,
  useGetZakenQuery,
} from "@nl-portal/nl-portal-api";
import TasksList from "../components/TasksList";
import PageGrid from "../components/PageGrid";
import { Paragraph } from "@gemeente-denhaag/typography";

interface OverviewPageProps {
  showAlert?: boolean;
  alertType?: "error" | "info" | "success" | "warning";
  showIntro?: boolean;
  tasksPreviewLength?: number;
  casesPreviewLength?: number;
}

const OverviewPage = ({
  showAlert = false,
  alertType = "warning",
  showIntro = false,
  tasksPreviewLength = 5,
  casesPreviewLength = 4,
}: OverviewPageProps) => {
  const intl = useIntl();
  const { userName, volmachtgever, isVolmachtLogin } = useUserInfo();
  const {
    data: tasksData,
    loading: tasksLoading,
    error: tasksError,
  } = useGetTakenQuery({ variables: { pageSize: tasksPreviewLength } });
  const {
    data: casesData,
    loading: casesLoading,
    error: casesError,
  } = useGetZakenQuery();
  const loading = tasksLoading || casesLoading;
  const tasks = tasksData?.getTaken.content as Taak[] | undefined;
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
          <Paragraph>
            <FormattedMessage id="overviewpage.paragraph" />
          </Paragraph>
        </PageHeader>
      )}
      {tasksPreviewLength && (
        <TasksList
          loading={loading}
          error={Boolean(tasksError)}
          tasks={tasks}
          totalAmount={
            tasksData?.getTaken.totalElements &&
            tasksData?.getTaken.totalElements > tasksPreviewLength
              ? tasksData?.getTaken.totalElements
              : undefined
          }
        />
      )}
      {casesPreviewLength && (
        <CasesList
          loading={loading}
          error={Boolean(casesError)}
          listView={false}
          cases={cases
            ?.filter((c) => !c.status?.statustype.isEindstatus)
            .slice(0, casesPreviewLength)}
          totalAmount={
            casesData?.getZaken.totalElements &&
            casesData?.getZaken.totalElements > casesPreviewLength
              ? casesData?.getZaken.totalElements
              : undefined
          }
        />
      )}
    </PageGrid>
  );
};

export default OverviewPage;
