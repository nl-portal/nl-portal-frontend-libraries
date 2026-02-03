import { FormHTMLAttributes, useState, useEffect, RefAttributes } from "react";
import styles from "./Form.module.scss";
import { Alert, AlertProps } from "@gemeente-denhaag/alert";
import { FormattedMessage } from "react-intl";
import { Button } from "@gemeente-denhaag/button";
import classNames from "classnames";
import { Paragraph } from "@gemeente-denhaag/typography";

type Props = FormHTMLAttributes<HTMLFormElement> &
  RefAttributes<HTMLFormElement> & {
    loading?: boolean;
    submitTranslationId?: string;
    cancelTranslationId?: string;
    success?: AlertProps | boolean;
    error?: AlertProps | boolean;
    hideSubmit?: boolean;
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
  hideSubmit,
  onCancel,
  ...props
}: Props) => {
  const [showAlert, setShowAlert] = useState<AlertProps | undefined>();
  const formClassName = classNames(styles["form"], className);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (typeof success === "undefined") return;
    if (success === false) return setShowAlert(undefined);
    if (success === true)
      return setShowAlert({
        variant: "success",
        title: <FormattedMessage id="form.success.title" />,
        text: (
          <Paragraph>
            <FormattedMessage id="form.success.text" />
          </Paragraph>
        ),
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
        text: (
          <Paragraph>
            <FormattedMessage id="form.error.text" />
          </Paragraph>
        ),
      });
    setShowAlert(error);
  }, [error]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    setShowAlert(undefined);
    onChange?.(e);
  };
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <form onChange={onChangeHandler} className={formClassName} {...props}>
      {children}
      {showAlert && <Alert {...showAlert} />}
      {(!hideSubmit || onCancel) && (
        <div className="utrecht-button-group">
          {!hideSubmit && (
            <Button type="submit" disabled={loading}>
              <FormattedMessage id={submitTranslationId || `form.submit`} />
            </Button>
          )}
          {onCancel && (
            <Button variant="secondary-action" onClick={onCancel}>
              <FormattedMessage id={cancelTranslationId || `form.cancel`} />
            </Button>
          )}
        </div>
      )}
    </form>
  );
};

export default Form;
