import { useContext, useEffect } from "react";
import { FormattedDate, FormattedMessage, FormattedNumber } from "react-intl";
import { themes } from "../constants/themes";
import {
  capitalizeFirstLetter,
  currencyFormat,
  NotificationContext,
  ThemeOverviewPage,
} from "@nl-portal/nl-portal-user-interface";

const ParkerenOverview = () => {
  const { dispatch } = useContext(NotificationContext);

  useEffect(() => {
    dispatch({
      type: "CREATE",
      id: "parkingOverview",
      notification: {
        variant: "info",
        title: <FormattedMessage id="theme.sample.infoTitle" />,
        text: <FormattedMessage id="theme.sample.infoTitle" />,
      },
    });
  }, [dispatch]);

  return (
    <ThemeOverviewPage
      slug={themes.parkeren.slug}
      productenSettings={[
        {
          productTypeSlug: themes.parkeren.productTypes.vergunningen?.slug,
          productTypeCodes: [themes.parkeren.productTypes.vergunningen?.code],
          titleTranslationId: "Vergunningen",
          headerTranslationIds: [
            "Naam",
            "Startdatum",
            "Einddatum",
            "Status",
            "Prijs",
            "Test",
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
            "dataobject.test",
          ],
        },
        {
          productTypeSlug:
            themes.parkeren.productTypes.bezoekersvergunningen?.slug,
          productTypeCodes: [
            themes.parkeren.productTypes.bezoekersvergunningen?.code,
          ],
          titleTranslationId: "Bezoekersvergunningen",
          headerTranslationIds: ["Naam", "Startdatum", "Status", "Prijs"],
          dataMapping: [
            "naam",
            "startDatum",
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
        },
      ]}
    />
  );
};

export default ParkerenOverview;
