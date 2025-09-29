import { useIntl } from "react-intl";
import CasesList from "../components/CasesList";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import {
  OpenProductProduct,
  useGetOpenProductThemaTakenQuery,
  useGetOpenProductThemaZakenQuery,
} from "@nl-portal/nl-portal-api";
import TasksList from "../components/TasksList";
import { TaakV2, Zaak } from "@nl-portal/nl-portal-api";
import AppContext from "../contexts/AppContext";
import { use } from "react";
import { stringToSlug } from "../utils/string-to-slug";
import { ProductList } from "../components/ProductList";

export interface ProductSettings {
  productTypeCodes: string[];
  titleTranslationId: string;
  headerTranslationIds: string[];
  dataMapping: (
    | ((product: OpenProductProduct) => React.ReactNode)
    | keyof OpenProductProduct
  )[];
}

interface Props {
  slug: string;
  fetchTasksLength?: number;
  fetchCasesLength?: number;
  productsSettings: ProductSettings[];
}

const ThemeOverviewPage = ({
  slug,
  fetchTasksLength = 5,
  fetchCasesLength = 4,
  productsSettings,
}: Props) => {
  const intl = useIntl();
  const { themes } = use(AppContext);
  const theme = themes.find(
    (theme) => stringToSlug(theme.naam) === stringToSlug(slug),
  );

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

  const taken = (takenData?.getOpenProductThemaTaken as TaakV2[]) ?? [];
  const zaken = (zakenData?.getOpenProductThemaZaken as Zaak[]) ?? [];

  return (
    <PageGrid>
      <PageHeader title={intl.formatMessage({ id: `pageTitles.${slug}` })} />
      {Boolean(fetchTasksLength) && (
        <TasksList
          loading={takenLoading}
          showEmpty={false}
          tasks={taken}
          openInContext={true}
        />
      )}
      {Boolean(fetchCasesLength) && (
        <CasesList
          loading={zakenLoading}
          showEmpty={false}
          listView={false}
          cases={zaken}
        />
      )}
      {productsSettings.map((productSettings) => (
        <ProductList
          key={productSettings.titleTranslationId}
          slug={slug}
          {...productSettings}
        />
      ))}
    </PageGrid>
  );
};

export default ThemeOverviewPage;
