import { useIntl } from "react-intl";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import BackLink from "../components/BackLink";
import {
  OpenProductProduct,
  TaakV2,
  useGetOpenProductQuery,
  Zaak,
} from "@nl-portal/nl-portal-api";
import TasksList from "../components/TasksList";
import CasesList from "../components/CasesList";
import { useParams } from "react-router";
import { capitalizeFirstLetter } from "../utils/person-data";
import DescriptionList from "../components/DescriptionList";
import { currencyFormat } from "../constants/currency-format";

const ThemeDetailsPage = () => {
  const intl = useIntl();
  const { id } = useParams();
  const { data, loading, error } = useGetOpenProductQuery({
    variables: { id },
  });

  console.log("data", data);

  const openProduct = data?.getOpenProduct as OpenProductProduct | undefined;
  const zaken = openProduct?.zaken as Zaak[] | undefined;
  const taken = openProduct?.taken as TaakV2[] | undefined;

  return (
    <PageGrid>
      <div>
        <BackLink />
        <PageHeader loading={loading} title={openProduct?.naam} />
      </div>
      <TasksList
        loading={loading}
        error={Boolean(error)}
        showEmpty={false}
        titleTranslationId={null}
        tasks={taken}
      />
      {/* <ActionsList loading={loading} actions={openProduct?.acties.map((item) => item.mapping)} /> */}
      <CasesList
        loading={loading}
        error={Boolean(error)}
        showEmpty={false}
        listView={false}
        cases={zaken}
      />
      <DescriptionList
        titleTranslationId="Details"
        items={[
          { title: "Startdatum", detail: openProduct?.startDatum },
          { title: "Einddatum", detail: openProduct?.eindDatum },
          {
            title: "Status",
            detail: capitalizeFirstLetter(
              openProduct?.status.toLocaleLowerCase() || "-",
            ),
          },
          {
            title: "Prijs",
            detail: capitalizeFirstLetter(
              intl.formatNumber(openProduct?.prijs || 0, currencyFormat) || "-",
            ),
          },
        ]}
      />
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
