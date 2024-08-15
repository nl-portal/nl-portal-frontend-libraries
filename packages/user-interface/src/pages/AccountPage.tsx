import { Button } from "@gemeente-denhaag/button";
import { FormattedMessage } from "react-intl";
import {
  MaatschappelijkeActiviteit,
  Persoon,
  useGetBedrijfQuery,
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
import useUserInfo from "../hooks/useUserInfo";

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
  const { isPerson } = useUserInfo();
  const { data: contactData, loading: contactLoading } =
    useGetBurgerProfielQuery({ skip: !isPerson });
  const { data: personData, loading: personLoading } = useGetPersoonDataQuery({
    skip: !isPerson,
  });
  const { data: companyData, loading: companyLoading } = useGetBedrijfQuery({
    skip: isPerson,
  });

  const loading = personLoading || companyLoading || contactLoading;
  const person = personData?.getPersoon as Persoon | undefined;
  const company = companyData?.getBedrijf as
    | MaatschappelijkeActiviteit
    | undefined;

  const openAddressInvestigation = (): void => {
    const newWindow = window.open(
      addressResearchUrl,
      "_blank",
      "noopener,noreferrer",
    );
    if (newWindow) newWindow.opener = null;
  };

  if (!isPerson)
    return (
      <PageGrid>
        <PageHeader title={<FormattedMessage id="pageTitles.account" />} />
        <div>
          <Heading as="h3" className={styles["account__sub-header"]}>
            <FormattedMessage id="account.companyInfoHeader" />
          </Heading>
          <DetailList
            details={[
              {
                translationKey: "kvkNumber",
                value: company?.kvkNummer,
                loading,
              },
              {
                translationKey: "companyName",
                value: company?.naam,
                loading,
              },
              {
                translationKey: "legalForm",
                value: company?.embedded?.eigenaar?.rechtsvorm,
                loading,
              },
            ]}
          />
        </div>
        <div>
          <Heading as="h3" className={styles["account__sub-header"]}>
            <FormattedMessage id="account.BusinessAddressHeader" />
          </Heading>
          <DetailList
            details={[
              {
                translationKey: "street",
                value: getStreetString(
                  company?.embedded?.hoofdvestiging.adressen?.[0].straatnaam,
                  company?.embedded?.hoofdvestiging.adressen?.[0].huisnummer.toString(),
                  undefined,
                  undefined,
                ),
                loading,
              },
              {
                translationKey: "postalCodeAndCity",
                value: getPostalCodeCityString(
                  company?.embedded?.hoofdvestiging.adressen?.[0].postcode,
                  company?.embedded?.hoofdvestiging.adressen?.[0].plaats,
                ),
                loading,
              },
            ]}
          />
        </div>
      </PageGrid>
    );

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
              loading,
            },
            {
              translationKey: "telefoonnummer",
              value: contactData?.getBurgerProfiel?.telefoonnummer,
              showEditButton: true,
              loading,
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
              loading,
            },
            {
              translationKey: "lastName",
              value: getNameString(person?.naam, "lastName"),
              loading,
            },
            {
              translationKey: "gender",
              value: person?.geslachtsaanduiding,
              loading,
            },
            {
              translationKey: "citizenServiceNumber",
              value: person?.burgerservicenummer,
              loading,
            },
            {
              translationKey: "dateOfBirth",
              value: getLocaleDateOfBirth(person?.geboorte?.datum),
              loading,
            },
            {
              translationKey: "countryOfBirth",
              value: person?.geboorte?.land?.omschrijving,
              loading,
            },
            {
              translationKey: "nationality",
              value: getNationalitiesString(person?.nationaliteiten),
              loading,
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
              loading,
            },
            {
              translationKey: "postalCodeAndCity",
              value: getPostalCodeCityString(
                person?.verblijfplaats?.postcode,
                person?.verblijfplaats?.woonplaats,
              ),
              loading,
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
                loading,
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
