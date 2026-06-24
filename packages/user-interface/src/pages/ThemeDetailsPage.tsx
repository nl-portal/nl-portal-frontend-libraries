import { useIntl } from "react-intl";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import BackLink from "../components/BackLink";
import {
  OpenProductProduct,
  TaakV2,
  GetOpenProductDocument,
  Zaak,
  GetOpenProductQueryVariables,
  GetOpenProductQuery,
} from "@nl-portal/nl-portal-api";
import { useQuery } from "@apollo/client/react";
import TasksList from "../components/TasksList";
import CasesList from "../components/CasesList";
import { useParams } from "react-router";
import DescriptionList from "../components/DescriptionList";
import DecisionsList from "../components/DecisionsList";
import React from "react";
import { DataMappingItem } from "../interfaces/product-types";
import { getProductValue } from "../utils/get-product-value";

interface ThemeDetailsPageProps {
  children?:
    | ((
        openProduct: ReturnType<
          typeof useQuery<GetOpenProductQuery, GetOpenProductQueryVariables>
        >,
      ) => React.ReactNode)
    | React.ReactNode;
  productSettings?: {
    headerTranslationIds: string[];
    dataMapping: DataMappingItem[];
  };
}

const ThemeDetailsPage = ({
  children,
  productSettings,
}: ThemeDetailsPageProps) => {
  const intl = useIntl();
  const { id } = useParams<{ id: string }>();
  const openProduct = useQuery(GetOpenProductDocument, {
    variables: { id },
  });

  const { data, loading, error } = openProduct;
  const product = data?.getOpenProduct as OpenProductProduct | undefined;
  const zaken = product?.zaken as Zaak[] | undefined;
  const taken = product?.taken as TaakV2[] | undefined;
  const details =
    product && productSettings
      ? productSettings?.headerTranslationIds
          ?.map((header, index) => ({
            title: intl.formatMessage({ id: header }),
            detail: getProductValue(
              product,
              productSettings.dataMapping[index],
            ),
          }))
          .filter(({ detail }) => detail)
      : [];

  return (
    <PageGrid>
      <div>
        <BackLink />
        <PageHeader loading={loading} title={product?.naam} />
      </div>
      <TasksList
        loading={loading}
        error={Boolean(error)}
        showEmpty={false}
        titleTranslationId={null}
        tasks={taken}
      />
      <DecisionsList loading={loading} decisions={product?.decisions} />
      <CasesList
        loading={loading}
        error={Boolean(error)}
        showEmpty={false}
        listView={false}
        cases={zaken}
      />
      <DescriptionList loading={loading} showEmpty={false} items={details} />
      {children instanceof Function ? children(openProduct) : children}
      <TasksList
        loading={loading}
        showEmpty={false}
        error={Boolean(error)}
        titleTranslationId={null}
        tasks={taken}
      />
    </PageGrid>
  );
};

export default ThemeDetailsPage;
