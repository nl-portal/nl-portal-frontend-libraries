import { FormattedMessage } from "react-intl";
import {
  GetBurgerProfielDocument,
  useGetBurgerProfielQuery,
  useUpdateBurgerProfielMutation,
} from "@nl-portal/nl-portal-api";
import PageHeader from "../components/PageHeader";
import useUserInfo from "../hooks/useUserInfo";
import ContactForm from "../forms/ContactForm";
import { REGEX_PATTERNS } from "../constants/regex-patterns";
import BackLink from "../components/BackLink";
import { useOutletContext } from "react-router";
import { RouterOutletContext } from "../interfaces/router-outlet-context";

interface EditContactInfoPageProps {
  type: "emailadres" | "telefoonnummer";
}

const EditContactInfoPage = ({ type }: EditContactInfoPageProps) => {
  const { isPerson } = useUserInfo();
  const { paths } = useOutletContext<RouterOutletContext>();

  const { data: contactData } = useGetBurgerProfielQuery({
    skip: !isPerson,
  });

  const [mutateFunction] = useUpdateBurgerProfielMutation({
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

  const onSubmit = (value?: string) => {
    mutateFunction({
      variables: {
        klant: { [type]: value || "" },
      },
    });
  };

  const burgerProfiel = contactData?.getBurgerProfiel || {};

  return (
    <>
      <BackLink href={paths.account} />
      <PageHeader
        title={<FormattedMessage id={`pageTitles.editContactInfo.${type}`} />}
      />
      <ContactForm
        formId={`submit-${type}`}
        type={type === "emailadres" ? "email" : "tel"}
        currentValue={burgerProfiel[type] || ""}
        validationRegex={REGEX_PATTERNS[type]}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default EditContactInfoPage;
