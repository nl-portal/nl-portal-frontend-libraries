import classNames from "classnames";
import styles from "./PageGrid.module.scss";

interface Props {
  children: React.ReactNode;
  className?: string;
  variant?: "large" | "medium";
}

const PageGrid = ({ children, className, variant = "large" }: Props) => {
  return (
    <div
      className={classNames(
        styles["page-grid"],
        { [styles["page-grid--md"]]: variant === "medium" },
        className,
      )}
    >
      {children}
    </div>
  );
};

export default PageGrid;
