import classNames from "classnames";
import styles from "./PageGrid.module.scss";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const PageGrid = ({ children, className }: Props) => {
  return (
    <div className={classNames(styles["page-grid"], className)}>{children}</div>
  );
};

export default PageGrid;
