import {
  Button,
  FormField,
  Heading2,
} from "@gemeente-denhaag/components-react";
import { FormFieldErrorMessage } from "@gemeente-denhaag/form-field-error-message";
import { TextField } from "@gemeente-denhaag/textfield";
import { FormattedMessage, useIntl } from "react-intl";
import { useContext, useEffect, useState } from "react";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { useNavigate } from "react-router-dom";
import { useUpdateBurgerProfielMutation } from "@nl-portal/nl-portal-api";
import useQuery from "../hooks/useQuery";
import styles from "./EditAccountPage.module.scss";
import UserInformationContext from "../contexts/UserInformationContext";
import { REGEX_PATTERNS } from "../constants/regex-patterns";
import PageHeader from "../components/PageHeader";

const EditAccountPage = () => {
  const { currentLocale } = useContext(LocaleContext);
  const { userInformation } = useContext(UserInformationContext);
  const query = useQuery();
  const intl = useIntl();
  const navigate = useNavigate();
  const [mutateFunction, { loading, error }] = useUpdateBurgerProfielMutation();

  const prop = query.get("prop");
  const propTranslation = intl.formatMessage({ id: `account.detail.${prop}` });
  const errorTranslation = intl.formatMessage({
    id: `account.detail.${prop}.error`,
  });

  const defaultValue = userInformation[`${prop}`];
  const regex = REGEX_PATTERNS[`${prop}`];

  const [valid, setValidity] = useState(true);
  const [value, setValue] = useState(defaultValue || "");
  const [mutating, setMutationStatus] = useState(false);

  const navigateToAccountPage = (): void => {
    navigate(`/account/`);
  };

  const onSave = (): void => {
    setMutationStatus(true);
    mutateFunction({ variables: { klant: { [`${prop}`]: `${value}` } } });
  };

  useEffect(() => {
    if (regex) {
      setValidity(regex.test(value));
    }
  }, [value]);

  useEffect(() => {
    if (mutating && !loading) {
      if (!error) {
        navigateToAccountPage();
      }
      setMutationStatus(false);
    }
  }, [loading]);

  return (
    <div className={styles["edit-account"]}>
      <PageHeader
        title={
          currentLocale.toLowerCase().includes("nl")
            ? `${propTranslation} ${intl
                .formatMessage({ id: "account.edit" })
                .toLowerCase()}`
            : `${intl.formatMessage({
                id: "account.edit",
              })} ${propTranslation.toLowerCase()}`
        }
      />
      <div className={styles["edit-account__text-field-container"]}>
        <FormField invalid={!valid && `${value}`.length >= 1}>
          <TextField
            id={propTranslation}
            aria-describedby={propTranslation}
            onChange={(e) => setValue(e.target.value)}
            invalid={!valid && `${value}`.length >= 1}
            defaultValue={defaultValue || ""}
            disabled={loading}
          />
          <FormFieldErrorMessage>
            {!valid && `${value}`.length >= 1 ? errorTranslation : ""}
          </FormFieldErrorMessage>
        </FormField>
      </div>

      <div className={styles["edit-account__buttons"]}>
        <Button
          className={styles["edit-account__button"]}
          onClick={onSave}
          disabled={!valid || loading || `${value}`.length === 0}
        >
          <FormattedMessage id="account.save" />
        </Button>
        <Button
          variant="secondary-action"
          className={styles["edit-account__button"]}
          onClick={navigateToAccountPage}
          disabled={loading}
        >
          <FormattedMessage id="account.cancel" />
        </Button>
      </div>
    </div>
  );
};

export default EditAccountPage;
