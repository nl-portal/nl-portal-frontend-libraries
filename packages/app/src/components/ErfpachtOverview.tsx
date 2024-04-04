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

const ErfpachtOverview = () => {
  const type = "erfpacht";
  const { data, loading, error } = useGetErfpachtContractenQuery();
  const contracts = data?.getErfpachtContracten.content as
    | ContractBeperkt[]
    | undefined;

  return (
    <ThemeOverviewPage type={type}>
      <TableList
        loading={loading}
        error={Boolean(error)}
        titleTranslationId={`theme.${type}.listTitle`}
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

export default ErfpachtOverview;
