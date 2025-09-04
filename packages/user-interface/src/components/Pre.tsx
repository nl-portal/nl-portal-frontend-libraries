import styles from "./Pre.module.scss";

type PreProps = React.HTMLAttributes<HTMLPreElement>;

const Pre = ({ children }: PreProps) => {
  return <pre className={styles.pre}>{children}</pre>;
};

export default Pre;
