import { Fragment, ReactElement, useContext } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "@gemeente-denhaag/link";
import { EditIcon } from "@gemeente-denhaag/icons";
import Skeleton from "react-loading-skeleton";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import styles from "./DetailList.module.scss";
import useMediaQuery from "../hooks/useMediaQuery";
import { BREAKPOINTS } from "../constants/breakpoints";
import PortalLink from "./PortalLink";
import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../interfaces/router-outlet-context";
import React from "react";

interface DetailListProps {
  details: Array<{
    translationKey: string;
    loading?: boolean;
    value?: string | ReactElement | undefined | null | false;
    showEditButton?: boolean;
    translate?: React.HTMLAttributes<HTMLSpanElement>["translate"];
  }>;
}

const DetailList = ({ details }: DetailListProps) => {
  const { hrefLang } = useContext(LocaleContext);
  const { paths } = useOutletContext<RouterOutletContext>();
  const isDesktop = useMediaQuery(BREAKPOINTS.DESKTOP);
  const EMPTY_VALUE = "-";

  return (
    <Fragment>
      {details.map((detail) => (
        <div
          className={styles["detail-list__item"]}
          key={detail.translationKey}
        >
          <span className={styles["detail-list__header"]}>
            <b>
              <FormattedMessage
                id={`account.detail.${detail.translationKey}`}
              />
            </b>
          </span>
          <div className={styles["detail-list__value-edit"]}>
            <span
              className={styles["detail-list__value"]}
              translate={detail.translate}
            >
              {detail.loading ? (
                <Skeleton width={isDesktop ? 200 : 150} />
              ) : (
                detail.value || EMPTY_VALUE
              )}
            </span>
            {detail.showEditButton && (
              <Link
                href={`${paths.editAccount}?prop=${detail.translationKey}`}
                Link={PortalLink}
                hrefLang={hrefLang}
                icon={<EditIcon />}
                iconAlign="start"
              >
                {isDesktop && <FormattedMessage id="account.edit" />}
              </Link>
            )}
          </div>
        </div>
      ))}
    </Fragment>
  );
};
export default DetailList;
