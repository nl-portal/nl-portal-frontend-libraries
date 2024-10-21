import {
  FormHTMLAttributes,
  forwardRef,
  PropsWithChildren,
  ForwardedRef,
} from "react";
import styles from "./Form.module.scss";
import classnames from "classnames";

export const Form = forwardRef(function Form(
  {
    children,
    className,
    ...props
  }: PropsWithChildren<FormHTMLAttributes<HTMLFormElement>>,
  ref: ForwardedRef<HTMLFormElement>,
) {
  const classNames = classnames(styles["form"], className);
  return (
    <form ref={ref} className={classNames} {...props}>
      {children}
    </form>
  );
});

export default Form;
