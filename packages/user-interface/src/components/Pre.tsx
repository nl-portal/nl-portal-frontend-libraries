import styles from "./Pre.module.scss";

type PreProps = React.HTMLAttributes<HTMLPreElement>;

const Pre = (props: PreProps) => {
  return <pre className={styles.pre} {...props} />;
};

export default Pre;
