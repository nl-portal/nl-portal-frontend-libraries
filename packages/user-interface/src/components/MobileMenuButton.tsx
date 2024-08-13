import { Button, ButtonProps } from "@gemeente-denhaag/button";
import styles from "./MobileMenuButton.module.scss";

const MobileMenuButton = (props: ButtonProps) => (
  <Button {...props} className={styles["denhaag-button--mobile-menu"]} />
);

export default MobileMenuButton;
