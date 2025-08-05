import { useIntl } from "react-intl";
import CasesList from "../components/CasesList";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import { useGetOpenProductenByThemaQuery } from "@nl-portal/nl-portal-api";
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
    data: productenData,
    loading: productenLoading,
    error: productenError,
  } = useGetOpenProductenByThemaQuery({
    variables: {
      themaId: id,
    },
    skip: !id,
  });

  const loading = productenLoading;
  const producten = productenData?.getOpenProductenByThema || [];
  const taken = producten?.flatMap(
    (product) => (product.taken as TaakV2[]) ?? [],
  );
  const zaken = producten?.flatMap(
    (product) => (product.zaken as Zaak[]) ?? [],
  );

  return (
    <PageGrid>
      <PageHeader title={intl.formatMessage({ id: `pageTitles.${slug}` })} />
      {Boolean(fetchTasksLength) && (
        <TasksList
          loading={loading}
          showEmpty={false}
          tasks={taken}
          openInContext={true}
        />
      )}
      {Boolean(fetchCasesLength) && (
        <CasesList
          loading={loading}
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
              id: (product as unknown as Record<string, string>)[map] || "-",
            }),
          })),
        )}
      />
    </PageGrid>
  );
};

export default ThemeOverviewPage;
