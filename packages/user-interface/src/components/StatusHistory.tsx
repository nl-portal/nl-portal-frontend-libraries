import { FC, Fragment } from "react";
import { StatusType, ZaakStatus } from "@nl-portal/nl-portal-api";
import { Paragraph } from "@gemeente-denhaag/typography";
import { Status } from "@gemeente-denhaag/process-steps";
import Skeleton from "react-loading-skeleton";
import { useIntl } from "react-intl";
import { stringToId } from "../utils/string-to-id";
import styles from "./StatusHistory.module.scss";
import {
  statusHistoryCirleSize,
  statusHistoryTextWidth,
} from "../constants/skeleton";

interface StatusHistoryProps {
  caseId?: string;
  statusHistory?: Array<ZaakStatus>;
  statuses?: Array<StatusType>;
  status?: ZaakStatus | null;
  loading: boolean;
}

const StatusHistory: FC<StatusHistoryProps> = ({
  statusHistory,
  statuses = [],
  status,
  loading,
  caseId,
}) => {
  const intl = useIntl();

  const getSkeletonStep = (key: number) => (
    <div
      key={key}
      className={styles["skeleton-step"]}
      aria-busy
      aria-disabled
      aria-label={intl.formatMessage({ id: "element.loading" })}
    >
      <div className={styles["skeleton-step__circle"]}>
        <Skeleton
          circle
          height={statusHistoryCirleSize}
          width={statusHistoryCirleSize}
        />
      </div>
      <Paragraph>
        <Skeleton width={statusHistoryTextWidth} />
      </Paragraph>
    </div>
  );

  const getStepStatus = (omschrijving?: string | null) => {
    if (!omschrijving) {
      return "not-checked";
    }

    if (status?.statustype?.omschrijving === omschrijving) {
      return "current";
    }

    if (
      statusHistory?.find((h) => h.statustype.omschrijving === omschrijving)
    ) {
      return "checked";
    }

    return "not-checked";
  };

  return (
    <div className={styles["status-history-container"]}>
      {!loading && statuses ? (
        <Status
          steps={statuses.map(({ omschrijving }, index) => {
            const omschrijvingLabel = intl.formatMessage({
              id: `case.${caseId}.status.${stringToId(`${omschrijving}`)}`,
            });
            return {
              title: omschrijvingLabel,
              id: `step-${index + 1}`,
              status: getStepStatus(omschrijving),
              marker: index + 1,
            };
          })}
        />
      ) : (
        <Fragment>
          {getSkeletonStep(0)}
          {getSkeletonStep(1)}
        </Fragment>
      )}
    </div>
  );
};
export default StatusHistory;
