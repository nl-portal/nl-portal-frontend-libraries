import { FormattedMessage } from "react-intl";
import {
  TableList,
  ThemeHistoryPage,
} from "@nl-portal/nl-portal-user-interface";
import { useDateFormatter } from "@nl-portal/nl-portal-localization";
import { OpenProductProduct } from "@nl-portal/nl-portal-api";
import StatusBadge from "@gemeente-denhaag/status-badge";
import { useState } from "react";

const ParkerenHistory = () => {
  const { formatDate } = useDateFormatter();
  const [index, setIndex] = useState<number>(0);
  const pageSize = 4;

  return (
    <ThemeHistoryPage slug="parkeren">
      {({ loading, data }) => {
        const indexLimit = Math.floor(
          ((data?.getOpenProduct as OpenProductProduct | undefined)
            ?.verbruiksobject?.data?.periodes?.length ?? 0) / pageSize,
        );
        const product = data?.getOpenProduct as OpenProductProduct | undefined;

        return (
          <TableList
            loading={loading}
            titleTranslationId={null}
            index={index}
            indexLimit={indexLimit}
            onChange={setIndex}
            headers={[
              <FormattedMessage key="datum" id={`Datum`} />,
              <FormattedMessage key="kenteken" id={`Kenteken`} />,
              <FormattedMessage key="status" id={`Status`} />,
            ]}
            rows={product?.verbruiksobject?.data?.periodes
              ?.slice(index * pageSize, (index + 1) * pageSize)
              .map(
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
        );
      }}
    </ThemeHistoryPage>
  );
};

export default ParkerenHistory;
