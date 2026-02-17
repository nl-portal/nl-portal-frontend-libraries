import { FormattedMessage } from "react-intl";
import PageHeader from "../components/PageHeader";
import { REGEX_PATTERNS } from "../constants/regex-patterns";
import { BackLink } from "../components/BackLink";
import { useNavigate, useOutletContext, useParams } from "react-router";
import { RouterOutletContext } from "../interfaces/router-outlet-context";
import useInput from "../hooks/useInput";
import { Form } from "../components/Form";
import { FormField } from "@gemeente-denhaag/form-field";
import { FormLabel } from "@gemeente-denhaag/form-label";
import { TextInput } from "@gemeente-denhaag/text-input";
import { FormFieldErrorMessage } from "@gemeente-denhaag/form-field-error-message";
import styles from "./EditContactInfoPage.module.scss";
import UserContext from "../contexts/UserContext";
import { useContext, useState } from "react";
import {
  DigitaleAdresType,
  useUserContactMutation,
  VerificatieType,
} from "@nl-portal/nl-portal-api";
import { capitalizeFirstLetter } from "../utils/person-data";
import ValidationForm from "../components/ValidationForm";
import { Paragraph } from "@gemeente-denhaag/typography";
import PageGrid from "../components/PageGrid";

const typeParams = ["email", "telefoonnummer"] as const;
type TypeParams = (typeof typeParams)[number];

const EMAIL_VALIDATION = [
  {
    validationFn: (value: string) =>
      value === "" || REGEX_PATTERNS.emailadres.test(value),
    errorTranslationId: "account.detail.emailadres.error",
  },
];

const TELEFOON_VALIDATION = [
  {
    validationFn: (value: string) =>
      value === "" || REGEX_PATTERNS.telefoonnummerInvalidChars.test(value),
    errorTranslationId: "account.detail.telefoonnummer.error.invalidChars",
  },
  {
    validationFn: (value: string) =>
      value === "" || REGEX_PATTERNS.telefoonnummer.test(value),
    errorTranslationId: "account.detail.telefoonnummer.error",
  },
];

const EditContactInfoPage = () => {
  const { type } = useParams<{ type: TypeParams }>();
  const adresType = capitalizeFirstLetter(type || "") as
    | keyof typeof DigitaleAdresType
    | keyof typeof VerificatieType;
  const digitaleAdresType = DigitaleAdresType[adresType];
  const navigate = useNavigate();
  const { contact } = useContext(UserContext);
  const { paths } = useOutletContext<RouterOutletContext>();
  const [needValidation, setNeedValidation] = useState(false);
  const contactValue = contact?.getUserDigitaleAdressen?.find(
    (a) => a.type === digitaleAdresType,
  );
  const initialValue = contactValue?.waarde || "";

  console.log("contactValue", contactValue);

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
    value,
    handleInputChange,
    handleInputBlur,
    hasError,
    errorTranslationId,
  } = useInput(
    initialValue,
    type === "email" ? EMAIL_VALIDATION : TELEFOON_VALIDATION,
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key, ctrlKey, metaKey, altKey } = event;

    if ((ctrlKey || metaKey) && !altKey) return; // Copy and pasting should be allowed

    // Don't allow letters and special characters other than '+'
    if (
      type === "telefoonnummer" &&
      key.length === 1 &&
      !REGEX_PATTERNS.telefoonnummerInvalidChars.test(key)
    ) {
      event.preventDefault();
    }
  };

  const onSubmit = async (verificationCode?: string) => {
    if (!verificationCode && initialValue === value) return;

    console.log("Submitting with value:", contactValue?.uuid);

    const response = await mutateFunction(
      contactValue?.uuid,
      value || "",
      digitaleAdresType,
      verificationCode,
    );

    if (response?.verificatieNeeded) {
      setNeedValidation(true);
      return;
    }

    navigate(paths.account, {
      state: {
        notification: {
          id: "edit-contact-info-success",
          variant: "success",
          titleMessage: { id: "account.detail.validation.success.title" },
        },
      },
    });
  };

  const onRefresh = async () => {
    await mutateFunction(contactValue?.uuid, value || "", digitaleAdresType);
  };

  if (!type || !typeParams.includes(type)) {
    navigate(paths.account);
    return null;
  }

  return (
    <PageGrid variant="small">
      <div>
        <BackLink href={paths.account} />
        <PageHeader
          title={<FormattedMessage id="pageTitles.editContactInfo" />}
        ></PageHeader>
      </div>
      {needValidation ? (
        <>
          <Paragraph>
            <FormattedMessage
              id={`validationForm.description`}
              values={{ email: value }}
            />
          </Paragraph>
          <ValidationForm
            value={value}
            loading={mutationLoading}
            onSubmit={onSubmit}
            onRefresh={onRefresh}
            error={Boolean(!mutationLoading && mutationCalled && mutationError)}
          />
        </>
      ) : (
        <Form
          id="edit-contact-info-form"
          submitTranslationId="account.save"
          loading={initialValue === value || hasError || mutationLoading}
          error={Boolean(!mutationLoading && mutationCalled && mutationError)}
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
          onCancel={() => navigate(paths.account)}
          onChange={mutationReset}
        >
          <FormField invalid={hasError}>
            <FormLabel htmlFor="contactform">
              <FormattedMessage id={`account.detail.contactform.${type}`} />
            </FormLabel>
            <TextInput
              id="contactform"
              type="text"
              name="value"
              value={value}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
              className={styles["nl-portal-edit-contact__field"]}
              invalid={hasError}
            />
            {hasError && (
              <FormFieldErrorMessage>
                <FormattedMessage id={errorTranslationId} />
              </FormFieldErrorMessage>
            )}
          </FormField>
        </Form>
      )}
    </PageGrid>
  );
};

export default EditContactInfoPage;
