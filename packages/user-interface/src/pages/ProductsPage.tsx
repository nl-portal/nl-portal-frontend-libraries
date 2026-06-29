import { FormattedMessage } from "react-intl";
import {
  GetOpenProductenDocument,
  OpenProductProduct,
} from "@nl-portal/nl-portal-api";
import { useQuery } from "@apollo/client/react";
import PageHeader from "../components/PageHeader";
import PageGrid from "../components/PageGrid";
import ProductsList from "../components/ProductsList";

const ProductsPage = () => {
  const { data, loading, error, refetch } = useQuery(GetOpenProductenDocument, {
    variables: { pageSize: 10 },
  });
  const producten = data?.getOpenProducten?.content as
    | OpenProductProduct[]
    | undefined;

  const onPageChange = (index: number) => {
    try {
      refetch({ pageNumber: index + 1 });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  console.log("Producten:", producten);

  return (
    <PageGrid variant="medium">
      <PageHeader
        title={<FormattedMessage id="pageTitles.products" />}
      ></PageHeader>
      <ProductsList
        loading={loading}
        error={Boolean(error)}
        titleTranslationId={null}
        products={producten}
        onChange={onPageChange}
        index={(data?.getOpenProducten?.number || 1) - 1}
        indexLimit={(data?.getOpenProducten?.totalPages || 1) - 1}
      />
    </PageGrid>
  );
};

export default ProductsPage;
