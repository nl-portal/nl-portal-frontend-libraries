import { useIntl } from "react-intl";
import CasesList from "../components/CasesList";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import {
  OpenProductThema,
  useGetOpenProductThemaTakenQuery,
  useGetOpenProductThemaZakenQuery,
} from "@nl-portal/nl-portal-api";
import TasksList from "../components/TasksList";
import { TaakV2, Zaak } from "@nl-portal/nl-portal-api";
import AppContext from "../contexts/AppContext";
import { use } from "react";
import { stringToSlug } from "../utils/string-to-slug";
import { ProductList } from "../components/ProductList";
import { ProductSettings } from "../interfaces/product-types";

interface Props {
  slug: string;
  fetchTasksLength?: number;
  fetchCasesLength?: number;
  productenSettings: ProductSettings[];
  children?: ((theme: OpenProductThema) => React.ReactNode) | React.ReactNode;
}

const ThemeOverviewPage = ({
  slug,
  fetchTasksLength = 5,
  fetchCasesLength = 4,
  productenSettings,
  children,
}: Props) => {
  const intl = useIntl();
  const { themes } = use(AppContext);
  const theme = themes.find(
    (theme) => stringToSlug(theme.naam) === stringToSlug(slug),
  ) as OpenProductThema;

  const { data: takenData, loading: takenLoading } =
    useGetOpenProductThemaTakenQuery({
      variables: {
        id: theme?.uuid,
        pageSize: fetchTasksLength,
      },
    });
  const { data: zakenData, loading: zakenLoading } =
    useGetOpenProductThemaZakenQuery({
      variables: {
        id: theme?.uuid,
        pageSize: fetchCasesLength,
      },
    });

  const loading = takenLoading || zakenLoading;
  const taken = (takenData?.getOpenProductThemaTaken as TaakV2[]) ?? [];
  const zaken = (zakenData?.getOpenProductThemaZaken as Zaak[]) ?? [];

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
      {productenSettings.map((productSettings) => (
        <ProductList
          key={productSettings.titleTranslationId}
          slug={slug}
          productTypeSlug={productSettings.productTypeSlug}
          productLength={5}
          pagination={false}
          {...productSettings}
        />
      ))}
      {children instanceof Function ? children(theme) : children}
    </PageGrid>
  );
};

export default ThemeOverviewPage;
