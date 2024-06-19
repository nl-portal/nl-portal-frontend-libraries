import { FC } from "react";
import { Paragraph } from "@gemeente-denhaag/typography";
import { useIntl } from "react-intl";
import classNames from "classnames";
import Skeleton from "react-loading-skeleton";
import styles from "./UserName.module.scss";
import { useUserInfo } from "../hooks/useUserInfo";

interface UserNameProps {
  mobileMenu?: boolean;
}

const UserName: FC<UserNameProps> = ({ mobileMenu }) => {
  const intl = useIntl();
  const { userName, volmachtgever, isLoading } = useUserInfo();

  return (
    <div
      className={classNames(styles["user-name"], {
        [styles["user-name--mobile-menu"]]: mobileMenu,
      })}
    >
      <Paragraph className={styles["user-name__paragraph"]}>
        {intl.formatMessage({ id: "header.welcome" }) +
          (userName ? ` ${userName}` : `${isLoading ? " " : ""}`)}
        {isLoading && !userName && <Skeleton width={80} />}
      </Paragraph>
      <Paragraph className={styles["user-name__paragraph"]}>
        {volmachtgever
          ? `${intl.formatMessage({ id: "header.proxyFor" })} ${volmachtgever}`
          : ""}
        {isLoading && !volmachtgever && <Skeleton width={160} />}
      </Paragraph>
    </div>
  );
};
export default UserName;
