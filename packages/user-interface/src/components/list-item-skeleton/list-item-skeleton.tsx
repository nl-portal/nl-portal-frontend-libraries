import { FC, ReactElement } from "react";
import Skeleton from "react-loading-skeleton";
import styles from "./list-item-skeleton.module.scss";

interface ListItemSkeletonProps {
  icon: ReactElement;
}

const ListItemSkeleton: FC<ListItemSkeletonProps> = ({ icon }) => (
  <div className={styles["list-item-skeleton"]}>
    <div className={styles["list-item-skeleton__icon"]}>{icon}</div>
    <Skeleton width={100} />
  </div>
);

export { ListItemSkeleton };
