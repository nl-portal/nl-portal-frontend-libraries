import {
  ContractBeperkt,
  useGetErfpachtContractenQuery,
} from "@nl-portal/nl-portal-api";
import {
  ThemeOverviewPage,
  TableList,
} from "@nl-portal/nl-portal-user-interface";
import { paths } from "../constants/paths";
import { FormattedMessage } from "react-intl";

const ErfpachtOverviewPage = () => {
  const type = "erfpacht";
  const contractsLength = 5;
  const { data, loading, error } = useGetErfpachtContractenQuery({
    variables: { pageSize: contractsLength },
  });
  const contracts = data?.getErfpachtContracten.content as
    | ContractBeperkt[]
    | undefined;

  return (
    <ThemeOverviewPage type={type}>
      <TableList
        loading={loading}
        error={Boolean(error)}
        titleTranslationId={`theme.${type}.listTitle`}
        readMoreTranslationId={`theme.${type}.listViewAll`}
        readMoreLink={paths.themeList(type)}
        readMoreAmount={
          data?.getErfpachtContracten.totalElements &&
          data?.getErfpachtContracten.totalElements > contractsLength
            ? data?.getErfpachtContracten.totalElements
            : undefined
        }
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
    </ThemeOverviewPage>
  );
};

export default ErfpachtOverviewPage;
