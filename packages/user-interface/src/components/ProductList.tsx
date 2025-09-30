import {
  OpenProductProduct,
  useGetOpenProductenQuery,
} from "@nl-portal/nl-portal-api";
import { ProductSettings } from "../pages/ThemeOverviewPage";
import TableList from "./TableList";
import { useIntl } from "react-intl";
import { useOutletContext } from "react-router";
import { RouterOutletContext } from "../interfaces/router-outlet-context";

type ProductListProps = ProductSettings & {
  slug: string;
};

export const ProductList = ({
  slug,
  productTypeCodes,
  titleTranslationId,
  headerTranslationIds,
  dataMapping,
}: ProductListProps) => {
  const intl = useIntl();
  const { paths } = useOutletContext<RouterOutletContext>();
  const { data, loading, error } = useGetOpenProductenQuery({
    variables: { productTypeCodes: productTypeCodes },
  });

  const producten = data?.getOpenProducten.content as
    | OpenProductProduct[]
    | undefined;

  if (!producten) return null;

  return (
    <TableList
      loading={loading}
      error={Boolean(error)}
      titleTranslationId={titleTranslationId}
      headers={headerTranslationIds.map((id) => intl.formatMessage({ id }))}
      rows={producten.map((product) =>
        dataMapping.map((map) => ({
          href: paths.themeDetails(slug, product.uuid),
          children: map instanceof Function ? map(product) : product?.[map],
        })),
      )}
    />
  );
};
