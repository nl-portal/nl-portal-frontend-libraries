import { useEffect } from "react";
import { Button } from "@gemeente-denhaag/components-react";
import { FormattedMessage } from "react-intl";
import {
  Persoon,
  useGetBurgerProfielQuery,
  useGetPersoonDataQuery,
} from "@nl-portal/nl-portal-api";
import styles from "./AccountPage.module.scss";
import DetailList from "../components/DetailList";
import {
  getLocaleDateOfBirth,
  getNameString,
  getNationalitiesString,
  getPostalCodeCityString,
  getStreetString,
} from "../utils/person-data";
import PageHeader from "../components/PageHeader";
import PageGrid from "../components/PageGrid";
import Heading from "../components/Heading";

interface AccountPageProps {
  showInhabitantAmount?: string;
  showAddressResearch?: boolean;
  addressResearchUrl?: string;
  showNotificationSubSection?: boolean;
}

const AccountPage = ({
  showInhabitantAmount,
  showAddressResearch = true,
  addressResearchUrl,
  showNotificationSubSection = true,
}: AccountPageProps) => {
  const {
    data: contactData,
    loading: contactLoading,
    refetch: contactRefetch,
  } = useGetBurgerProfielQuery();

  const {
    data: personData,
    loading: personLoading,
    refetch: personRefetch,
  } = useGetPersoonDataQuery();

  const person = personData?.getPersoon as Persoon | undefined;

  const openAddressInvestigation = (): void => {
    const newWindow = window.open(
      addressResearchUrl,
      "_blank",
      "noopener,noreferrer",
    );
    if (newWindow) newWindow.opener = null;
  };

  useEffect(() => {
    contactRefetch();
    personRefetch();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PageGrid>
      <PageHeader title={<FormattedMessage id="pageTitles.account" />} />
      <div>
        <Heading as="h3" className={styles["account__sub-header"]}>
          <FormattedMessage id="account.contactHeader" />
        </Heading>
        <DetailList
          details={[
            {
              translationKey: "emailadres",
              value: contactData?.getBurgerProfiel?.emailadres,
              showEditButton: true,
              loading: contactLoading,
            },
            {
              translationKey: "telefoonnummer",
              value: contactData?.getBurgerProfiel?.telefoonnummer,
              showEditButton: true,
              loading: contactLoading,
            },
          ]}
        />
      </div>
      {showNotificationSubSection && (
        <div className={styles["account__sub-section"]}>
          <Heading as="h3" className={styles["account__sub-header"]}>
            <FormattedMessage id="account.notificationsHeader" />
          </Heading>
          <DetailList
            details={[
              {
                translationKey: "updatesOnCases",
              },
              {
                translationKey: "newsOnNeighborhood",
              },
              {
                translationKey: "tips",
              },
            ]}
          />
        </div>
      )}
      <div>
        <Heading as="h3" className={styles["account__sub-header"]}>
          <FormattedMessage id="account.detailsHeader" />
        </Heading>
        <DetailList
          details={[
            {
              translationKey: "firstNames",
              value: getNameString(person?.naam, "firstNames"),
              loading: personLoading,
            },
            {
              translationKey: "lastName",
              value: getNameString(person?.naam, "lastName"),
              loading: personLoading,
            },
            {
              translationKey: "gender",
              value: person?.geslachtsaanduiding,
              loading: personLoading,
            },
            {
              translationKey: "citizenServiceNumber",
              value: person?.burgerservicenummer,
              loading: personLoading,
            },
            {
              translationKey: "dateOfBirth",
              value: getLocaleDateOfBirth(person?.geboorte?.datum),
              loading: personLoading,
            },
            {
              translationKey: "countryOfBirth",
              value: person?.geboorte?.land?.omschrijving,
              loading: personLoading,
            },
            {
              translationKey: "nationality",
              value: getNationalitiesString(person?.nationaliteiten),
              loading: personLoading,
            },
          ]}
        />
      </div>
      <div>
        <Heading as="h3" className={styles["account__sub-header"]}>
          <FormattedMessage id="account.addressHeader" />
        </Heading>
        <DetailList
          details={[
            {
              translationKey: "street",
              value: getStreetString(
                person?.verblijfplaats?.straat,
                person?.verblijfplaats?.huisnummer,
                person?.verblijfplaats?.huisletter,
                person?.verblijfplaats?.huisnummertoevoeging,
              ),
              loading: personLoading,
            },
            {
              translationKey: "postalCodeAndCity",
              value: getPostalCodeCityString(
                person?.verblijfplaats?.postcode,
                person?.verblijfplaats?.woonplaats,
              ),
              loading: personLoading,
            },
          ]}
        />
      </div>
      {showInhabitantAmount === "true" && (
        <div>
          <Heading as="h3" className={styles["account__sub-header"]}>
            <FormattedMessage id="account.inhabitantAmountHeader" />
          </Heading>
          <DetailList
            details={[
              {
                translationKey: "inhabitantAmount",
                value: person?.bewonersAantal?.toString() || "-",
                loading: personLoading,
              },
            ]}
          />
          <div className={styles["account__label-description"]}>
            <FormattedMessage id="account.inhabitantAmountDescription" />
          </div>
          {showAddressResearch && (
            <Button onClick={openAddressInvestigation}>
              <FormattedMessage id="account.addressResearchRequestButton" />
            </Button>
          )}
        </div>
      )}
    </PageGrid>
  );
};

export default AccountPage;
