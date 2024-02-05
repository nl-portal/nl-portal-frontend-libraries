import { FC, Fragment, ReactElement, useContext } from "react";
import { FormattedMessage } from "react-intl";
import { EditIcon, Link } from "@gemeente-denhaag/components-react";
import Skeleton from "react-loading-skeleton";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import styles from "./DetailList.module.scss";
import useMediaQuery from "../hooks/useMediaQuery";
import { BREAKPOINTS } from "../constants/breakpoints";
import UserInformationContext from "../contexts/UserInformationContext";
import PortalLink from "../components/PortalLink";

interface DetailListProps {
  details: Array<{
    translationKey: string;
    loading?: boolean;
    value?: string | ReactElement | undefined | null | false;
    showEditButton?: boolean;
  }>;
}

const DetailList: FC<DetailListProps> = ({ details }) => {
  const { hrefLang } = useContext(LocaleContext);
  const { setUserInformation } = useContext(UserInformationContext);
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
            <span className={styles["detail-list__value"]}>
              {detail.loading ? (
                <Skeleton width={isDesktop ? 200 : 150} />
              ) : (
                detail.value || EMPTY_VALUE
              )}
            </span>
            {detail.showEditButton && (
              <Link
                onClick={() =>
                  setUserInformation(
                    detail.translationKey,
                    typeof detail.value === "string" ? detail.value : "",
                  )
                }
                Link={PortalLink}
                href={`/account/aanpassen?prop=${detail.translationKey}`}
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
