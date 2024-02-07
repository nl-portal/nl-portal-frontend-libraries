import { FC, useEffect } from "react";
import { Button, Heading2, Heading3 } from "@gemeente-denhaag/components-react";
import { FormattedMessage } from "react-intl";
import {
  useGetBewonersAantalQuery,
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

interface AccountPageProps {
  showInhabitantAmount?: string;
  showAddressResearch?: string;
  addressResearchUrl?: string;
  showNotificationSubSection?: string;
}

const AccountPage: FC<AccountPageProps> = ({
  showInhabitantAmount,
  showAddressResearch = "true",
  addressResearchUrl,
  showNotificationSubSection = "true",
}) => {
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

  const {
    data: bewonerAantalData,
    loading: bewonersAantalLoading,
    refetch: bewonersAantalRefetch,
  } = useGetBewonersAantalQuery();

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
    bewonersAantalRefetch();
  }, []);

  return (
    <section className={styles.account}>
      <PageHeader title={<FormattedMessage id="pageTitles.account" />} />
      <div className={styles["account__sub-section"]}>
        <Heading3 className={styles["account__sub-header"]}>
          <FormattedMessage id="account.contactHeader" />
        </Heading3>
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
      {showNotificationSubSection === "true" && (
        <div className={styles["account__sub-section"]}>
          <Heading3 className={styles["account__sub-header"]}>
            <FormattedMessage id="account.notificationsHeader" />
          </Heading3>
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
      <div className={styles["account__sub-section"]}>
        <Heading3 className={styles["account__sub-header"]}>
          <FormattedMessage id="account.detailsHeader" />
        </Heading3>
        <DetailList
          details={[
            {
              translationKey: "firstNames",
              value: getNameString(personData?.getPersoon?.naam, "firstNames"),
              loading: personLoading,
            },
            {
              translationKey: "lastName",
              value: getNameString(personData?.getPersoon?.naam, "lastName"),
              loading: personLoading,
            },
            {
              translationKey: "gender",
              value: personData?.getPersoon?.geslachtsaanduiding,
              loading: personLoading,
            },
            {
              translationKey: "citizenServiceNumber",
              value: personData?.getPersoon?.burgerservicenummer,
              loading: personLoading,
            },
            {
              translationKey: "dateOfBirth",
              value: getLocaleDateOfBirth(
                personData?.getPersoon?.geboorte?.datum,
              ),
              loading: personLoading,
            },
            {
              translationKey: "countryOfBirth",
              value: personData?.getPersoon?.geboorte?.land?.omschrijving,
              loading: personLoading,
            },
            {
              translationKey: "nationality",
              value: getNationalitiesString(
                personData?.getPersoon?.nationaliteiten,
              ),
              loading: personLoading,
            },
          ]}
        />
      </div>
      <div className={styles["account__sub-section"]}>
        <Heading3 className={styles["account__sub-header"]}>
          <FormattedMessage id="account.addressHeader" />
        </Heading3>
        <DetailList
          details={[
            {
              translationKey: "street",
              value: getStreetString(
                personData?.getPersoon?.verblijfplaats?.straat,
                personData?.getPersoon?.verblijfplaats?.huisnummer,
                personData?.getPersoon?.verblijfplaats?.huisletter,
                personData?.getPersoon?.verblijfplaats?.huisnummertoevoeging,
              ),
              loading: personLoading,
            },
            {
              translationKey: "postalCodeAndCity",
              value: getPostalCodeCityString(
                personData?.getPersoon?.verblijfplaats?.postcode,
                personData?.getPersoon?.verblijfplaats?.woonplaats,
              ),
              loading: personLoading,
            },
          ]}
        />
      </div>
      {showInhabitantAmount === "true" && (
        <div className={styles["account__sub-section"]}>
          <Heading3 className={styles["account__sub-header"]}>
            <FormattedMessage id="account.inhabitantAmountHeader" />
          </Heading3>
          <DetailList
            details={[
              {
                translationKey: "inhabitantAmount",
                value: bewonerAantalData?.getBewonersAantal?.toString(),
                loading: bewonersAantalLoading,
              },
            ]}
          />
          <div className={styles["account__label-description"]}>
            <FormattedMessage id="account.inhabitantAmountDescription" />
          </div>
          {showAddressResearch === "true" && (
            <Button onClick={openAddressInvestigation}>
              <FormattedMessage id="account.addressResearchRequestButton" />
            </Button>
          )}
        </div>
      )}
    </section>
  );
};
export default AccountPage;
