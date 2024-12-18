import { Paragraph } from "@gemeente-denhaag/typography";
import { useIntl } from "react-intl";
import classNames from "classnames";
import Skeleton from "react-loading-skeleton";
import styles from "./UserName.module.scss";
import { useUserInfo } from "../hooks/useUserInfo";

interface UserNameProps {
  mobileMenu?: boolean;
}

const UserName = ({ mobileMenu }: UserNameProps) => {
  const intl = useIntl();
  const { userName, volmachtgever, isLoading } = useUserInfo();

  if (isLoading) {
    return <Skeleton width={160} />;
  }

  return (
    <div
      className={classNames(styles["user-name"], {
        [styles["user-name--mobile-menu"]]: mobileMenu,
      })}
    >
      <Paragraph className={styles["user-name__paragraph"]}>
        {intl.formatMessage({ id: "header.welcome" })}{" "}
        <span translate="no">{userName}</span>
      </Paragraph>
      {volmachtgever && (
        <Paragraph className={styles["user-name__paragraph"]}>
          {intl.formatMessage({ id: "header.proxyFor" })}{" "}
          <span translate="no">{volmachtgever}</span>
        </Paragraph>
      )}
    </div>
  );
};
export default UserName;
