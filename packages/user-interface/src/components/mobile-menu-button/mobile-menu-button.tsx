import { Button, ButtonProps } from "@gemeente-denhaag/components-react";
import styles from "./mobile-menu-button.module.scss";

const MobileMenuButton = (props: ButtonProps) => (
  <Button {...props} className={styles["denhaag-button--mobile-menu"]} />
);

export { MobileMenuButton };
