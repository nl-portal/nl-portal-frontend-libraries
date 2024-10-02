import { Button } from "@gemeente-denhaag/button";
import { FormFieldErrorMessage } from "@gemeente-denhaag/form-field-error-message";
import { FormField } from "@gemeente-denhaag/form-field";
import { FormLabel } from "@gemeente-denhaag/form-label";
import { TextInput } from "@gemeente-denhaag/text-input";
import { FormattedMessage, useIntl } from "react-intl";
import { useContext, useEffect, useState } from "react";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  useGetBurgerProfielQuery,
  useUpdateBurgerProfielMutation,
  GetBurgerProfielDocument,
} from "@nl-portal/nl-portal-api";
import useQuery from "../hooks/useQuery";
import styles from "./EditAccountPage.module.scss";
import { REGEX_PATTERNS } from "../constants/regex-patterns";
import PageHeader from "../components/PageHeader";
import PageGrid from "../components/PageGrid";
import { RouterOutletContext } from "../interfaces/router-outlet-context";
import BackLink from "../components/BackLink";

const EditAccountPage = () => {
  const { currentLocale } = useContext(LocaleContext);
  const { paths } = useOutletContext<RouterOutletContext>();
  const { data, loading: loadingBurger } = useGetBurgerProfielQuery();
  const query = useQuery();
  const intl = useIntl();
  const navigate = useNavigate();
  const [mutateFunction, { loading: loadingMutation, error }] =
    useUpdateBurgerProfielMutation({
      update: (cache, { data }) => {
        cache.writeQuery({
          query: GetBurgerProfielDocument,
          data: {
            getBurgerProfiel: {
              ...data?.updateBurgerProfiel,
            },
          },
        });
      },
    });

  const prop = query.get("prop") as "telefoonnummer" | "emailadres";
  const propTranslation = intl.formatMessage({ id: `account.detail.${prop}` });
  const errorTranslation = intl.formatMessage({
    id: `account.detail.${prop}.error`,
  });

  const defaultValue = data?.getBurgerProfiel?.[prop];
  const regex = REGEX_PATTERNS[prop];

  const [valid, setValidity] = useState(true);
  const [value, setValue] = useState(defaultValue || "");

  const onSave = (): void => {
    mutateFunction({
      variables: { klant: { [prop]: value } },
      onCompleted: () => {
        if (error) return;
        navigate(paths.account);
      },
    });
  };

  useEffect(() => {
    if (regex) {
      setValidity(regex.test(value));
    }
  }, [value, regex]);

  const invalid = !valid && `${value}`.length >= 1;
  const inputId = propTranslation.toLowerCase();
  const loading = loadingBurger || loadingMutation;

  return (
    <PageGrid>
      <div>
        <BackLink routePath={paths.account} />
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
      </div>
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
            onClick={() => navigate(paths.account)}
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
