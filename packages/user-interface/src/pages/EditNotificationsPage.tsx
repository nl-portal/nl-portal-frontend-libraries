import { FormattedMessage } from "react-intl";
import {
  GetBurgerProfielDocument,
  useGetBurgerProfielQuery,
  useUpdateBurgerProfielMutation,
} from "@nl-portal/nl-portal-api";
import PageHeader from "../components/PageHeader";
import { FormEvent, useContext, useId } from "react";
import { RouterOutletContext } from "../interfaces/router-outlet-context";
import { useNavigate, useOutletContext } from "react-router";
import BackLink from "../components/BackLink";
import { Paragraph } from "@gemeente-denhaag/typography";
import Form from "../components/Form";
import Heading from "../components/Heading";
import { FormField } from "@gemeente-denhaag/form-field";
import { FormLabel } from "@gemeente-denhaag/form-label";
import { FormFieldDescription } from "@gemeente-denhaag/form-field-description";
import { Fieldset, FieldsetLegend } from "@gemeente-denhaag/form-fieldset";
import { Checkbox } from "@gemeente-denhaag/checkbox";
import UserContext from "../contexts/UserContext";

const EditNotificationsPage = () => {
  const id = useId();
  const { isPerson } = useContext(UserContext);
  const { paths } = useOutletContext<RouterOutletContext>();
  const navigate = useNavigate();

  const { data: contactData } = useGetBurgerProfielQuery({
    skip: !isPerson,
  });

  const [
    mutateFunction,
    {
      loading: mutationLoading,
      error: mutationError,
      called: mutationCalled,
      reset: mutationReset,
    },
  ] = useUpdateBurgerProfielMutation({
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

  const handleNotificationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { emailNotification } = Object.fromEntries(
      new FormData(event.currentTarget),
    );

    mutateFunction({
      variables: {
        klant: { aanmaakkanaal: emailNotification?.toString() || "" },
      },
    });
  };

  const disableSubmit = mutationLoading;

  return (
    <>
      <div>
        <BackLink href={paths.account} />
        <PageHeader
          title={<FormattedMessage id={`pageTitles.editNotifications`} />}
        />
        <Paragraph>
          Stel in waarvoor u meldingen wilt ontvangen en op welke manier.
        </Paragraph>
      </div>
      <Form
        submitTranslationId="account.detail.notification.form.save"
        loading={disableSubmit}
        success={Boolean(!mutationLoading && mutationCalled && !mutationError)}
        error={Boolean(!mutationLoading && mutationCalled && mutationError)}
        onSubmit={handleNotificationSubmit}
        onCancel={() => navigate(paths.account)}
        onChange={mutationReset}
      >
        <Heading as="h3">
          <FormattedMessage id="account.detail.notification.form.post.title" />
        </Heading>
        <FormField>
          <span className="utrecht-form-label">
            <FormattedMessage id="account.detail.notification.form.post.label" />
          </span>
          <FormFieldDescription>
            <FormattedMessage id="account.detail.notification.form.post.description" />
          </FormFieldDescription>
        </FormField>
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
                  defaultChecked={
                    contactData?.getBurgerProfiel?.aanmaakkanaal === "EMAIL"
                  }
                />
                <FormattedMessage id="account.detail.notification.form.email.fieldvalue" />
              </FormLabel>
            </Paragraph>
          </FormField>
        </Fieldset>
      </Form>
    </>
  );
};

export default EditNotificationsPage;
