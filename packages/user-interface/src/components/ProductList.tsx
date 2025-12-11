import {
  GetOpenProductenDocument,
  OpenProductProduct,
  useQuery,
} from "@nl-portal/nl-portal-api";
import TableList from "./TableList";
import { useIntl } from "react-intl";
import { useOutletContext } from "react-router";
import { RouterOutletContext } from "../interfaces/router-outlet-context";
import { ProductSettings } from "../interfaces/product-types";
import { getProductValue } from "../utils/get-product-value";

type ProductListProps = ProductSettings & {
  slug: string;
  productLength: number;
  pagination?: boolean;
};

export const ProductList = ({
  slug,
  productTypeSlug,
  productTypeCodes,
  titleTranslationId,
  headerTranslationIds,
  dataMapping,
  productLength,
  pagination,
}: ProductListProps) => {
  const intl = useIntl();
  const { paths } = useOutletContext<RouterOutletContext>();
  const { data, loading, error, refetch } = useQuery(GetOpenProductenDocument, {
    variables: { productTypeCodes: productTypeCodes, pageSize: productLength },
  });

  const onPageChange = (index: number) => {
    try {
      refetch({ pageNumber: index + 1 });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const producten = data?.getOpenProducten.content as
    | OpenProductProduct[]
    | undefined;

  if (!producten) return null;

  return (
    <TableList
      loading={loading}
      error={Boolean(error)}
      titleTranslationId={titleTranslationId}
      indexLimit={
        pagination
          ? data?.getOpenProducten.totalPages &&
            data.getOpenProducten.totalPages - 1
          : undefined
      }
      totalAmount={
        !pagination &&
        data?.getOpenProducten.totalElements &&
        data?.getOpenProducten.totalElements > productLength
          ? data?.getOpenProducten.totalElements
          : undefined
      }
      readMoreLink={paths.themeList(slug, productTypeSlug)}
      headers={headerTranslationIds.map((id) => intl.formatMessage({ id }))}
      rows={producten.map((product) =>
        dataMapping.map((map) => ({
          href: paths.themeDetails(slug, product.uuid),
          children: getProductValue(product, map),
        })),
      )}
      onChange={onPageChange}
    />
  );
};
