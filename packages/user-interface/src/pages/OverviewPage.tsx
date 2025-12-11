import { Alert } from "@gemeente-denhaag/alert";
import { FormattedMessage, useIntl } from "react-intl";
import CasesList from "../components/CasesList";
import PageHeader from "../components/PageHeader";
import {
  TaakV2,
  Zaak,
  GetTakenV2Document,
  GetZakenDocument,
  useQuery,
} from "@nl-portal/nl-portal-api";
import TasksList from "../components/TasksList";
import PageGrid from "../components/PageGrid";
import { Paragraph } from "@gemeente-denhaag/typography";
import { ReactNode, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { RouterOutletContext } from "../interfaces/router-outlet-context";
import { useNavigate, useOutletContext } from "react-router";

interface OverviewPageProps {
  showAlert?: boolean;
  alertType?: "error" | "info" | "success" | "warning";
  showNoEmailAlert?: boolean;
  showIntro?: boolean;
  fetchTasksLength?: number;
  fetchCasesLength?: number;
  children?: ReactNode;
}

const OverviewPage = ({
  showAlert = false,
  showNoEmailAlert = false,
  alertType = "warning",
  showIntro = false,
  fetchTasksLength = 5,
  fetchCasesLength = 4,
  children,
}: OverviewPageProps) => {
  const intl = useIntl();
  const { username, usernameVolmacht, isVolmacht, contact } =
    useContext(UserContext);
  const {
    data: tasksData,
    loading: tasksLoading,
    error: tasksError,
  } = useQuery(GetTakenV2Document, {
    variables: { pageSize: fetchTasksLength },
    skip: !fetchTasksLength,
  });
  const {
    data: casesData,
    loading: casesLoading,
    error: casesError,
  } = useQuery(GetZakenDocument, {
    variables: { pageSize: fetchCasesLength },
    skip: !fetchCasesLength,
  });
  const { paths } = useOutletContext<RouterOutletContext>();
  const navigate = useNavigate();

  const loading = tasksLoading || casesLoading;
  const tasks = tasksData?.getTakenV2.content as TaakV2[] | undefined;
  const cases = casesData?.getZaken.content as Zaak[] | undefined;
  const emailadres = contact?.getUserDigitaleAdressen?.find(
    (a) => a.type === "EMAIL",
  );

  return (
    <PageGrid>
      {showAlert && (
        <Alert
          variant={alertType}
          title={intl.formatMessage({ id: "overview.alertTitle" })}
          text={
            <Paragraph>
              {intl.formatMessage({ id: "overview.alertText" })}
            </Paragraph>
          }
        />
      )}
      {showNoEmailAlert && !emailadres?.waarde && (
        <Alert
          title={<FormattedMessage id="overviewpage.noEmail.title" />}
          text={
            <Paragraph>
              <FormattedMessage id="overviewpage.noEmail.text" />
            </Paragraph>
          }
          variant="warning"
          action={{
            buttonText: intl.formatMessage({
              id: "overviewpage.noEmail.text.button",
            }),
            onClick: () => navigate(paths.changeContactInfo),
          }}
        />
      )}
      {showIntro && (
        <PageHeader
          title={
            <>
              <FormattedMessage id="overviewpage.title" />{" "}
              <span translate="no">{username}</span>
            </>
          }
          subTitle={
            isVolmacht && (
              <>
                <FormattedMessage id="overview.subTitle" />{" "}
                <span translate="no">{usernameVolmacht}</span>
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
