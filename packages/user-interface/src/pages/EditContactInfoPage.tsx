import { FormattedMessage } from "react-intl";
import { useUserContactMutation } from "@nl-portal/nl-portal-api";
import PageHeader from "../components/PageHeader";
import { REGEX_PATTERNS } from "../constants/regex-patterns";
import { BackLink } from "../components/BackLink";
import { useNavigate, useOutletContext } from "react-router";
import { RouterOutletContext } from "../interfaces/router-outlet-context";
import useInput from "../hooks/useInput";
import { Form } from "../components/Form";
import { FormField } from "@gemeente-denhaag/form-field";
import { FormLabel } from "@gemeente-denhaag/form-label";
import { TextInput } from "@gemeente-denhaag/text-input";
import { FormFieldErrorMessage } from "@gemeente-denhaag/form-field-error-message";
import styles from "./EditContactInfoPage.module.scss";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";

const EditContactInfoPage = () => {
  const { contact } = useContext(UserContext);
  const { paths } = useOutletContext<RouterOutletContext>();
  const navigate = useNavigate();

  const [
    mutateFunction,
    {
      loading: mutationLoading,
      error: mutationError,
      called: mutationCalled,
      reset: mutationReset,
    },
  ] = useUserContactMutation();

  const {
    value: phoneValue,
    handleInputChange: handlePhoneInputChange,
    handleInputBlur: handlePhoneInputBlur,
    hasError: phoneHasError,
    errorTranslationId: phoneErrorTranslationId,
  } = useInput(contact?.telefoonnummer || "", [
    {
      validationFn: (value) =>
        value === "" || REGEX_PATTERNS.telefoonnummer.test(value),
      errorTranslationId: "account.detail.telefoonnummer.error",
    },
  ]);
  const {
    value: emailValue,
    handleInputChange: handleEmailInputChange,
    handleInputBlur: handleEmailInputBlur,
    hasError: emailHasError,
    errorTranslationId: emailErrorTranslationId,
  } = useInput(contact?.emailadres || "", [
    {
      validationFn: (value) =>
        value === "" || REGEX_PATTERNS.emailadres.test(value),
      errorTranslationId: "account.detail.emailadres.error",
    },
  ]);

  const onSubmit = () => {
    mutateFunction({
      emailadresId: contact?.emailadresId,
      emailadres: emailValue || "",
      telefoonnummerId: contact?.telefoonnummerId,
      telefoonnummer: phoneValue || "",
    });
  };

  const disableSubmit = emailHasError || phoneHasError || mutationLoading;

  return (
    <>
      <BackLink href={paths.account} />
      <PageHeader
        title={<FormattedMessage id="pageTitles.editContactInfo" />}
      />
      <Form
        id="edit-contact-info-form"
        submitTranslationId="account.save"
        loading={disableSubmit}
        success={Boolean(!mutationLoading && mutationCalled && !mutationError)}
        error={Boolean(!mutationLoading && mutationCalled && mutationError)}
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
        onCancel={() => navigate(paths.account)}
        onChange={mutationReset}
      >
        <FormField invalid={emailHasError}>
          <FormLabel htmlFor="contactform-email">
            <FormattedMessage id="account.detail.contactform.email" />
          </FormLabel>
          <TextInput
            id="contactform-email"
            type="text"
            name="email"
            value={emailValue}
            onChange={handleEmailInputChange}
            onBlur={handleEmailInputBlur}
            className={styles["nl-portal-edit-contact__emailadres-field"]}
          />
          {emailHasError && (
            <FormFieldErrorMessage>
              <FormattedMessage id={emailErrorTranslationId} />
            </FormFieldErrorMessage>
          )}
        </FormField>
        <FormField invalid={emailHasError}>
          <FormLabel htmlFor="contactform-phone">
            <FormattedMessage id="account.detail.contactform.tel" />
          </FormLabel>
          <TextInput
            id="contactform-phone"
            type="text"
            name="telefoonnummer"
            value={phoneValue}
            onChange={handlePhoneInputChange}
            onBlur={handlePhoneInputBlur}
            className={styles["nl-portal-edit-contact__telefoonnummer-field"]}
          />
          {phoneHasError && (
            <FormFieldErrorMessage>
              <FormattedMessage id={phoneErrorTranslationId} />
            </FormFieldErrorMessage>
          )}
        </FormField>
      </Form>
    </>
  );
};

export default EditContactInfoPage;
