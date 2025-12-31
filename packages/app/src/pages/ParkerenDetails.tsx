import { FormattedDate, FormattedMessage, FormattedNumber } from "react-intl";
import {
  capitalizeFirstLetter,
  currencyFormat,
  PortalLink,
  TableList,
  ThemeDetailsPage,
} from "@nl-portal/nl-portal-user-interface";
import { useDateFormatter } from "@nl-portal/nl-portal-localization";
import { OpenProductProduct } from "@nl-portal/nl-portal-api";
import { Link } from "@gemeente-denhaag/link";
import { paths } from "../constants/paths";
import StatusBadge from "@gemeente-denhaag/status-badge";

const ParkerenDetails = () => {
  const { formatDate } = useDateFormatter();

  return (
    <ThemeDetailsPage
      productSettings={{
        headerTranslationIds: [
          "Naam",
          "Startdatum",
          "Einddatum",
          "Status",
          "Prijs",
        ],
        dataMapping: [
          "naam",
          (product) => <FormattedDate value={product?.startDatum} />,
          (product) => <FormattedDate value={product?.eindDatum} />,
          (product) =>
            capitalizeFirstLetter(product?.status.toLowerCase() ?? ""),
          (product) => {
            return (
              <FormattedNumber
                value={product?.prijs ?? 0}
                {...currencyFormat}
              />
            );
          },
        ],
      }}
    >
      {({ loading, data }) => {
        const product = data?.getOpenProduct as OpenProductProduct | undefined;

        return (
          <>
            {Boolean(product?.verbruiksobject) && (
              <TableList
                loading={loading}
                titleTranslationId={"Voertuigen"}
                headers={[
                  <FormattedMessage key="kenteken" id={`Kenteken`} />,
                  "",
                ]}
                rows={product?.verbruiksobject?.data?.kentekens?.map(
                  (kenteken: string) => [
                    { children: kenteken },
                    {
                      children: (
                        <Link
                          href={`${paths.themeMutate(
                            "parkeren",
                            product?.uuid,
                          )}?kenteken=${kenteken}`}
                          Link={PortalLink}
                        >
                          <FormattedMessage id={`Aanmelden`} />
                        </Link>
                      ),
                    },
                  ],
                )}
              />
            )}
            {Boolean(product?.verbruiksobject) && (
              <TableList
                loading={loading}
                titleTranslationId={"Periodes"}
                totalAmount={product?.verbruiksobject?.data?.periodes?.length}
                readMoreTranslationId={"Bekijk alles"}
                readMoreLink={paths.themeHistory("parkeren", product?.uuid)}
                headers={[
                  <FormattedMessage key="datum" id={`Datum`} />,
                  <FormattedMessage key="kenteken" id={`Kenteken`} />,
                  <FormattedMessage key="status" id={`Status`} />,
                ]}
                rows={product?.verbruiksobject?.data?.periodes?.map(
                  //eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (periode: any) => [
                    {
                      children: formatDate({
                        date: periode?.datetimeStart,
                        namedDays: false,
                      }),
                    },
                    { children: periode?.kenteken },
                    {
                      children: <StatusBadge>{periode?.status}</StatusBadge>,
                    },
                  ],
                )}
              />
            )}
          </>
        );
      }}
    </ThemeDetailsPage>
  );
};

export default ParkerenDetails;
