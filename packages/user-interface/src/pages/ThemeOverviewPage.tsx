import { useIntl } from "react-intl";
import CasesList from "../components/CasesList";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import {
  useGetOpenProductThemaTakenQuery,
  useGetOpenProductThemaZakenQuery,
} from "@nl-portal/nl-portal-api";
import TasksList from "../components/TasksList";
import { TaakV2, Zaak } from "@nl-portal/nl-portal-api";
import AppContext from "../contexts/AppContext";
import { use } from "react";
import { stringToSlug } from "../utils/string-to-slug";

interface Props {
  slug: string;
  fetchTasksLength?: number;
  fetchCasesLength?: number;
}

const ThemeOverviewPage = ({
  slug,
  fetchTasksLength = 5,
  fetchCasesLength = 4,
}: Props) => {
  const intl = useIntl();
  const { themes } = use(AppContext);
  const id = themes.find((theme) => stringToSlug(theme.naam) === slug)?.uuid;
  const {
    data: takenData,
    loading: takenLoading,
    error: takenError,
  } = useGetOpenProductThemaTakenQuery({
    variables: {
      id,
      language: intl.locale,
      pageSize: fetchTasksLength,
    },
  });
  const {
    data: zakenData,
    loading: zakenLoading,
    error: zakenError,
  } = useGetOpenProductThemaZakenQuery({
    variables: {
      id,
      language: intl.locale,
      pageSize: fetchCasesLength,
    },
  });

  const loading = takenLoading || zakenLoading;
  const taken = (takenData?.getOpenProductThemaTaken as TaakV2[]) || [];
  const zaken = (zakenData?.getOpenProductThemaZaken as Zaak[]) || [];

  return (
    <PageGrid>
      <PageHeader title={intl.formatMessage({ id: `pageTitles.${slug}` })} />
      {Boolean(fetchTasksLength) && (
        <TasksList
          loading={loading}
          error={Boolean(takenError)}
          showEmpty={false}
          tasks={taken}
          openInContext={true}
        />
      )}
      {Boolean(fetchCasesLength) && (
        <CasesList
          loading={loading}
          error={Boolean(zakenError)}
          showEmpty={false}
          listView={false}
          cases={zaken}
        />
      )}
    </PageGrid>
  );
};

export default ThemeOverviewPage;
