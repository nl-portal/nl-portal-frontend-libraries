import { useIntl } from "react-intl";
import CasesList from "../components/CasesList";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import {
  useGetOpenProductenByThemaQuery,
  useGetOpenProductThemaTakenQuery,
  useGetOpenProductThemaZakenQuery,
} from "@nl-portal/nl-portal-api";
import TasksList from "../components/TasksList";
import { TaakV2, Zaak } from "@nl-portal/nl-portal-api";
import AppContext from "../contexts/AppContext";
import { use } from "react";
import { stringToSlug } from "../utils/string-to-slug";
import TableList from "../components/TableList";
// import { useOutletContext } from "react-router";
// import { RouterOutletContext } from "../interfaces/router-outlet-context";

interface Props {
  slug: string;
  fetchTasksLength?: number;
  fetchCasesLength?: number;
  productSettings: {
    titleTranslationId: string;
    headerTranslationIds: string[];
    dataMapping: { key: string; value: string }[];
  };
}

const ThemeOverviewPage = ({
  slug,
  fetchTasksLength = 5,
  fetchCasesLength = 4,
  productSettings,
}: Props) => {
  const intl = useIntl();
  const { themes } = use(AppContext);
  // const { paths } = useOutletContext<RouterOutletContext>();
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
  const { data } = useGetOpenProductenByThemaQuery({
    variables: {
      themaId: id,
    },
  });

  console.log(data);

  const loading = takenLoading || zakenLoading;
  const taken = (takenData?.getOpenProductThemaTaken as TaakV2[]) || [];
  const zaken = (zakenData?.getOpenProductThemaZaken as Zaak[]) || [];
  // const href = paths.themeDetails(slug, id);

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
      <TableList
        loading={loading}
        titleTranslationId={productSettings.titleTranslationId}
        headers={productSettings.headerTranslationIds.map((id) =>
          intl.formatMessage({ id }),
        )}
        // rows={productSettings.dataMapping.map(([key, value]) => ({
        //   href: paths.themeSub(key, slug),
        //   children: intl.formatMessage({ id: value }),
        // }))}
      />
    </PageGrid>
  );
};

export default ThemeOverviewPage;
