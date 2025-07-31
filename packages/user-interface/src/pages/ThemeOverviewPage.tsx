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
import { useOutletContext } from "react-router";
import { RouterOutletContext } from "../interfaces/router-outlet-context";

interface Props {
  slug: string;
  fetchTasksLength?: number;
  fetchCasesLength?: number;
  productSettings: {
    titleTranslationId: string;
    headerTranslationIds: string[];
    dataMapping: string[];
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
  const { paths } = useOutletContext<RouterOutletContext>();
  const id = themes.find(
    (theme) => stringToSlug(theme.naam) === stringToSlug(slug),
  )?.uuid;
  const {
    data: takenData,
    loading: takenLoading,
    error: takenError,
  } = useGetOpenProductThemaTakenQuery({
    variables: {
      id,
    },
    skip: !id || !fetchTasksLength,
  });
  const {
    data: zakenData,
    loading: zakenLoading,
    error: zakenError,
  } = useGetOpenProductThemaZakenQuery({
    variables: {
      id,
    },
    skip: !id || !fetchCasesLength,
  });
  const {
    data: productenData,
    loading: productenLoading,
    error: productenError,
  } = useGetOpenProductenByThemaQuery({
    variables: {
      themaId: id,
    },
    skip: !id,
  });

  const loading = takenLoading || zakenLoading || productenLoading;
  const taken = (takenData?.getOpenProductThemaTaken as TaakV2[]) || [];
  const zaken = (zakenData?.getOpenProductThemaZaken as Zaak[]) || [];
  const producten = productenData?.getOpenProductenByThema || [];

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
        error={Boolean(productenError)}
        titleTranslationId={productSettings.titleTranslationId}
        headers={productSettings.headerTranslationIds.map((id) =>
          intl.formatMessage({ id }),
        )}
        rows={producten.map((product) =>
          productSettings.dataMapping.map((map) => ({
            href: paths.themeDetails(slug, product.uuid),
            children: intl.formatMessage({
              id: (product as Record<string, string>)[map] || "-",
            }),
          })),
        )}
      />
    </PageGrid>
  );
};

export default ThemeOverviewPage;
