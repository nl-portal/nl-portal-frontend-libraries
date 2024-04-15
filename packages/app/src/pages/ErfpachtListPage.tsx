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
  const { data, loading, error, refetch } = useGetErfpachtContractenQuery({
    variables: { pageSize: contractsLength },
  });
  const contracts = data?.getErfpachtContracten.content as
    | ContractBeperkt[]
    | undefined;

  const onPageChange = (index: number) => {
    refetch({ pageNumber: index + 1 });
    return index;
  };

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
        titleTranslationId={null}
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
        onChange={onPageChange}
        indexLimit={
          data?.getErfpachtContracten.totalPages &&
          data?.getErfpachtContracten.totalPages - 1
        }
      />
    </PageGrid>
  );
};

export default ErfpachtListPage;
