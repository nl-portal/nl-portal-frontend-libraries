import Form from "../components/Form";
import FormLabel from "@gemeente-denhaag/form-label";
import FormField from "@gemeente-denhaag/form-field";
import { FormattedMessage } from "react-intl";
import { FormEvent, useId } from "react";
import FormFieldDescription from "@gemeente-denhaag/form-field-description";
import Fieldset, { FieldsetLegend } from "@gemeente-denhaag/form-fieldset";
import Heading from "../components/Heading";
import { Paragraph } from "@gemeente-denhaag/typography";
import Checkbox from "@gemeente-denhaag/checkbox";
import Button from "@gemeente-denhaag/button";
import styles from "./NotificationForm.module.scss";

interface NotificationFormProps {
  currentValue: string;
  loading?: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const NotificationForm = ({
  currentValue,
  loading,
  onSubmit,
}: NotificationFormProps) => {
  const id = useId();
  return (
    <Form className={styles["notification-form"]} onSubmit={onSubmit}>
      <div className={styles["notification-form__group"]}>
        <Heading as="h3">
          <FormattedMessage id="account.detail.notification.form.post.title" />
        </Heading>
        <FormField>
          <FormLabel>
            <FormattedMessage id="account.detail.notification.form.post.label" />
          </FormLabel>
          <FormFieldDescription>
            <FormattedMessage id="account.detail.notification.form.post.description" />
          </FormFieldDescription>
        </FormField>
      </div>
      <div className={styles["notification-form__group"]}>
        <Heading as="h3">
          <FormattedMessage id="account.detail.notification.form.email.title" />
        </Heading>
        <Fieldset>
          <FieldsetLegend>
            <FormattedMessage id="account.detail.notification.form.email.label" />
          </FieldsetLegend>
          <FormFieldDescription className="utrecht-form-fieldset__legend--distanced">
            <FormattedMessage id="account.detail.notification.form.email.description" />
          </FormFieldDescription>
          <FormField type="checkbox">
            <Paragraph className="utrecht-form-field__label utrecht-form-field__label--checkbox">
              <FormLabel htmlFor={id} type="checkbox">
                <Checkbox
                  className="utrecht-form-field__input"
                  id={id}
                  name="emailNotification"
                  value="EMAIL"
                  defaultChecked={currentValue === "EMAIL"}
                />
                <FormattedMessage id="account.detail.notification.form.email.fieldvalue" />
              </FormLabel>
            </Paragraph>
          </FormField>
        </Fieldset>
      </div>
      <div className="utrecht-button-group">
        <Button type="submit" disabled={loading}>
          <FormattedMessage id="account.detail.notification.form.save" />
        </Button>
      </div>
    </Form>
  );
};

export default NotificationForm;
