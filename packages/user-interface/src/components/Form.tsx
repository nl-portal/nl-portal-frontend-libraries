import { FormHTMLAttributes, useState, useEffect, RefAttributes } from "react";
import styles from "./Form.module.scss";
import Alert, { AlertProps } from "@gemeente-denhaag/alert";
import { FormattedMessage } from "react-intl";
import Button from "@gemeente-denhaag/button";
import classNames from "classnames";

type Props = FormHTMLAttributes<HTMLFormElement> &
  RefAttributes<HTMLFormElement> & {
    loading?: boolean;
    submitTranslationId?: string;
    cancelTranslationId?: string;
    success?: AlertProps | boolean;
    error?: AlertProps | boolean;
    onCancel?: () => void;
  };

export const Form = ({
  children,
  className,
  onChange,
  loading,
  submitTranslationId,
  cancelTranslationId,
  success,
  error,
  onCancel,
  ...props
}: Props) => {
  const [showAlert, setShowAlert] = useState<AlertProps | undefined>();
  const formClassName = classNames(styles["form"], className);

  useEffect(() => {
    if (typeof success === "undefined") return;
    if (success === false) return setShowAlert(undefined);
    if (success === true)
      return setShowAlert({
        variant: "success",
        title: <FormattedMessage id="form.success.title" />,
        text: <FormattedMessage id="form.success.text" />,
      });
    setShowAlert(success);
  }, [success]);

  useEffect(() => {
    if (typeof error === "undefined") return;
    if (error === false) return setShowAlert(undefined);
    if (error === true)
      return setShowAlert({
        variant: "error",
        title: <FormattedMessage id="form.error.title" />,
        text: <FormattedMessage id="form.error.text" />,
      });
    setShowAlert(error);
  }, [error]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    setShowAlert(undefined);
    onChange?.(e);
  };

  return (
    <form onChange={onChangeHandler} className={formClassName} {...props}>
      {children}
      {showAlert && <Alert {...showAlert} />}
      <div className="utrecht-button-group">
        <Button type="submit" disabled={loading}>
          <FormattedMessage id={submitTranslationId || `form.submit`} />
        </Button>
        {onCancel && (
          <Button variant="secondary-action" onClick={onCancel}>
            <FormattedMessage id={cancelTranslationId || `form.cancel`} />
          </Button>
        )}
      </div>
    </form>
  );
};

export default Form;
