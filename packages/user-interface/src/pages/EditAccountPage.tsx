import { Button } from "@gemeente-denhaag/components-react";
import { FormFieldErrorMessage } from "@gemeente-denhaag/form-field-error-message";
import { FormField } from "@gemeente-denhaag/form-field";
import { FormLabel } from "@gemeente-denhaag/form-label";
import { TextInput } from "@gemeente-denhaag/text-input";
import { FormattedMessage, useIntl } from "react-intl";
import { useContext, useEffect, useState } from "react";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useUpdateBurgerProfielMutation } from "@nl-portal/nl-portal-api";
import useQuery from "../hooks/useQuery";
import styles from "./EditAccountPage.module.scss";
import UserInformationContext from "../contexts/UserInformationContext";
import { REGEX_PATTERNS } from "../constants/regex-patterns";
import PageHeader from "../components/PageHeader";
import PageGrid from "../components/PageGrid";
import { RouterOutletContext } from "../contexts/RouterOutletContext";

const EditAccountPage = () => {
  const { currentLocale } = useContext(LocaleContext);
  const { userInformation } = useContext(UserInformationContext);
  const { paths } = useOutletContext<RouterOutletContext>();
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
    navigate(paths.account);
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

  const invalid = !valid && `${value}`.length >= 1;
  const inputId = propTranslation.toLowerCase();

  return (
    <PageGrid>
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
      <div>
        <div className={styles["edit-account__text-field-container"]}>
          <FormField invalid={invalid} type="text">
            <FormLabel htmlFor={inputId}>{propTranslation}</FormLabel>
            <TextInput
              id={inputId}
              onChange={(e) => setValue(e.target.value)}
              invalid={invalid}
              defaultValue={defaultValue || ""}
              disabled={loading}
            />
            <FormFieldErrorMessage>
              {invalid ? errorTranslation : ""}
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
    </PageGrid>
  );
};

export default EditAccountPage;
