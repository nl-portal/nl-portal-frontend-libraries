import {
  ContractBeperkt,
  useGetErfpachtContractenQuery,
} from "@nl-portal/nl-portal-api";
import { FormattedMessage } from "react-intl";
import { paths } from "../constants/paths";
import {
  PageGrid,
  PageHeader,
  BackLink,
  TableList,
} from "@nl-portal/nl-portal-user-interface";

const ErfpachtListPage = () => {
  const type = "erfpacht";
  const contractsLength = 10;
  const { data, loading, error } = useGetErfpachtContractenQuery({
    variables: { pageSize: contractsLength },
  });
  const contracts = data?.getErfpachtContracten.content as
    | ContractBeperkt[]
    | undefined;

  return (
    <PageGrid>
      <div>
        <BackLink routePath={paths.themeOverview(type)} />
        <PageHeader
          title={<FormattedMessage id={`theme.${type}.listPageHeader`} />}
        />
      </div>
      <TableList
        loading={loading}
        error={Boolean(error)}
        titleTranslationId={false}
        headers={[
          <FormattedMessage id={`theme.${type}.listAdres`} />,
          <FormattedMessage id={`theme.${type}.listContractnummer`} />,
        ]}
        rows={contracts?.map((contract) => {
          const href = paths.themeDetails(type, contract.id);
          const { straatnaam, huisnummer, woonplaats } = contract.adressen[0];

          return [
            { children: `${straatnaam} ${huisnummer} ${woonplaats}`, href },
            { children: contract.id, href },
          ];
        })}
      />
    </PageGrid>
  );
};

export default ErfpachtListPage;
