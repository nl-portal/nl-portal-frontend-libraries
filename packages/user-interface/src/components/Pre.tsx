import classNames from "classnames";
import styles from "./Pre.module.scss";

type PreProps = React.HTMLAttributes<HTMLPreElement>;

const Pre = (props: PreProps) => {
  return <pre className={classNames(styles.pre, props.className)} {...props} />;
};

export default Pre;
