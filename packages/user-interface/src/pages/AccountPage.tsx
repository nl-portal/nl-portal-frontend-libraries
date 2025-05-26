import { FormattedMessage, useIntl } from "react-intl";
import {
  BrpPersoon,
  MaatschappelijkeActiviteit,
  useGetBedrijfQuery,
  useGetBurgerProfielQuery,
  useGetPersoonV2Query,
} from "@nl-portal/nl-portal-api";
import styles from "./AccountPage.module.scss";
import {
  getNationalitiesString,
  getPostalCodeCityString,
  getStreetString,
} from "../utils/person-data";
import PageHeader from "../components/PageHeader";
import PageGrid from "../components/PageGrid";
import Heading from "../components/Heading";
import useUserInfo from "../hooks/useUserInfo";
import { useDateFormatter } from "@nl-portal/nl-portal-localization";
import { DescriptionList } from "@gemeente-denhaag/descriptionlist";
import Link from "@gemeente-denhaag/link";
import { ArrowRightIcon, EditIcon } from "@gemeente-denhaag/icons";
import { Paragraph } from "@gemeente-denhaag/typography";
import "@gemeente-denhaag/button-group";
import DescriptionListDetail from "../components/DescriptionListDetail";
import { useOutletContext } from "react-router";
import { RouterOutletContext } from "../interfaces/router-outlet-context";
import PortalLink from "../components/PortalLink";
import SectionHeader from "../components/SectionHeader";

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
  const { formatDate } = useDateFormatter();
  const { isPerson } = useUserInfo();
  const intl = useIntl();
  const { paths } = useOutletContext<RouterOutletContext>();

  const { data: contactData } = useGetBurgerProfielQuery({ skip: !isPerson });
  const { data: personData } = useGetPersoonV2Query({
    skip: !isPerson,
  });
  const { data: companyData } = useGetBedrijfQuery({
    skip: isPerson,
  });

  const person = personData?.getPersoonV2 as BrpPersoon | undefined;
  const company = companyData?.getBedrijf as
    | MaatschappelijkeActiviteit
    | undefined;

  if (!isPerson)
    return (
      <PageGrid>
        <PageHeader title={<FormattedMessage id="pageTitles.account" />} />
        <div>
          <Heading as="h3" className={styles["account__sub-header"]}>
            <FormattedMessage id="account.companyInfoHeader" />
          </Heading>
          <DescriptionList
            className={styles["account__description-list--readonly"]}
            items={[
              {
                title: <FormattedMessage id="account.detail.kvkNumber" />,
                detail: (
                  <DescriptionListDetail translate="no">
                    {company?.kvkNummer}
                  </DescriptionListDetail>
                ),
              },
              {
                title: <FormattedMessage id="account.detail.companyName" />,
                detail: (
                  <DescriptionListDetail translate="no">
                    {company?.naam}
                  </DescriptionListDetail>
                ),
              },
              {
                title: <FormattedMessage id="account.detail.legalForm" />,
                detail: (
                  <DescriptionListDetail>
                    {company?.embedded?.eigenaar?.rechtsvorm}
                  </DescriptionListDetail>
                ),
              },
            ]}
          ></DescriptionList>
        </div>
        <div>
          <Heading as="h3" className={styles["account__sub-header"]}>
            <FormattedMessage id="account.BusinessAddressHeader" />
          </Heading>
          <DescriptionList
            className={styles["account__description-list--readonly"]}
            items={[
              {
                title: <FormattedMessage id="account.detail.street" />,
                detail: (
                  <DescriptionListDetail translate="no">
                    {getStreetString(
                      company?.embedded?.hoofdvestiging?.adressen?.[0]
                        .straatnaam,
                      company?.embedded?.hoofdvestiging?.adressen?.[0].huisnummer?.toString(),
                      undefined,
                      undefined,
                    )}
                  </DescriptionListDetail>
                ),
              },
              {
                title: (
                  <FormattedMessage id="account.detail.postalCodeAndCity" />
                ),
                detail: (
                  <DescriptionListDetail translate="no">
                    {getPostalCodeCityString(
                      company?.embedded?.hoofdvestiging?.adressen?.[0].postcode,
                      company?.embedded?.hoofdvestiging?.adressen?.[0].plaats,
                    )}
                  </DescriptionListDetail>
                ),
              },
            ]}
          ></DescriptionList>
        </div>
      </PageGrid>
    );

  return (
    <PageGrid>
      <PageHeader title={<FormattedMessage id="pageTitles.account" />} />
      <div>
        <SectionHeader
          title={intl.formatMessage({ id: "account.detail.contact" })}
        />
        <DescriptionList
          items={[
            {
              title: <FormattedMessage id="account.detail.emailadres" />,
              detail: (
                <DescriptionListDetail translate="no">
                  {contactData?.getBurgerProfiel?.emailadres}
                </DescriptionListDetail>
              ),
              action: (
                <Link
                  icon={<EditIcon />}
                  iconAlign="start"
                  href={paths.changeEmail}
                  Link={PortalLink}
                >
                  <FormattedMessage id="account.edit" />
                </Link>
              ),
            },
            {
              title: <FormattedMessage id="account.detail.telefoonnummer" />,
              detail: (
                <DescriptionListDetail translate="no">
                  {contactData?.getBurgerProfiel?.telefoonnummer}
                </DescriptionListDetail>
              ),
              action: (
                <Link
                  icon={<EditIcon />}
                  iconAlign="start"
                  href={paths.changePhonenumber}
                  Link={PortalLink}
                >
                  <FormattedMessage id="account.edit" />
                </Link>
              ),
            },
          ]}
        />
      </div>
      {showNotificationSubSection && (
        <div>
          <SectionHeader
            title={intl.formatMessage({ id: "account.detail.meldingen" })}
          />
          <Link
            icon={<EditIcon />}
            iconAlign="start"
            href={paths.changeNotifications}
            Link={PortalLink}
          >
            <FormattedMessage id="account.edit" />
          </Link>
          <DescriptionList
            items={[
              {
                title: (
                  <FormattedMessage id="account.detail.notification.form.post.title" />
                ),
                detail: (
                  <DescriptionListDetail>
                    <FormattedMessage
                      id={`account.detail.notification.form.post.true`}
                    />
                  </DescriptionListDetail>
                ),
              },
              {
                title: (
                  <FormattedMessage id="account.detail.notification.form.email.title" />
                ),
                detail: (
                  <DescriptionListDetail>
                    <FormattedMessage
                      id={`account.detail.notification.form.email.${contactData?.getBurgerProfiel?.aanmaakkanaal === "EMAIL"}`}
                    />
                  </DescriptionListDetail>
                ),
              },
            ]}
          />
        </div>
      )}
      <div>
        <SectionHeader
          title={intl.formatMessage({ id: "account.detail.persoonsgegevens" })}
        />
        <DescriptionList
          className={styles["account__description-list--readonly"]}
          items={[
            {
              title: <FormattedMessage id="account.detail.firstNames" />,
              detail: (
                <DescriptionListDetail
                  translate="no"
                  data-testid="persoonsgegevens-firstname"
                >
                  {person?.naam.voornamen}
                </DescriptionListDetail>
              ),
            },
            {
              title: <FormattedMessage id="account.detail.lastName" />,
              detail: (
                <DescriptionListDetail
                  translate="no"
                  data-testid="persoonsgegevens-lastname"
                >
                  {person?.naam.officialLastName}
                </DescriptionListDetail>
              ),
            },
            {
              title: <FormattedMessage id="account.detail.gender" />,
              detail: (
                <DescriptionListDetail data-testid="persoonsgegevens-gender">
                  {person?.geslacht?.omschrijving}
                </DescriptionListDetail>
              ),
            },
            {
              title: (
                <FormattedMessage id="account.detail.citizenServiceNumber" />
              ),
              detail: (
                <DescriptionListDetail data-testid="persoonsgegevens-bsn">
                  {person?.burgerservicenummer}
                </DescriptionListDetail>
              ),
            },
            {
              title: <FormattedMessage id="account.detail.dateOfBirth" />,
              detail: (
                <DescriptionListDetail data-testid="persoonsgegevens-birthdate">
                  {person?.geboorte?.datum
                    ? formatDate({
                        date: person?.geboorte?.datum.datum,
                      })
                    : ""}
                </DescriptionListDetail>
              ),
            },
            {
              title: <FormattedMessage id="account.detail.countryOfBirth" />,
              detail: (
                <DescriptionListDetail data-testid="persoonsgegevens-country">
                  {person?.geboorte?.land?.omschrijving}
                </DescriptionListDetail>
              ),
            },
            {
              title: <FormattedMessage id="account.detail.nationality" />,
              detail: (
                <DescriptionListDetail data-testid="persoonsgegevens-nationality">
                  {getNationalitiesString(person?.nationaliteiten)}
                </DescriptionListDetail>
              ),
            },
            {
              title: (
                <FormattedMessage id="account.detail.confidentialityOfPersonalData" />
              ),
              detail: (
                <DescriptionListDetail data-testid="persoonsgegevens-confidentialityOfPersonalData">
                  {
                    <FormattedMessage
                      id={`account.detail.confidentialityOfPersonalData.${person?.geheimhoudingPersoonsgegevens ?? false}`}
                    />
                  }
                </DescriptionListDetail>
              ),
            },
          ]}
        />
      </div>
      <div>
        <SectionHeader
          title={intl.formatMessage({ id: "account.detail.adres" })}
        />
        <DescriptionList
          className={styles["account__description-list--readonly"]}
          items={[
            {
              title: <FormattedMessage id="account.detail.street" />,
              detail: (
                <DescriptionListDetail
                  translate="no"
                  data-testid="persoonsgegevens-street"
                >
                  {getStreetString(
                    person?.verblijfplaats?.verblijfadres?.officieleStraatnaam,
                    person?.verblijfplaats?.verblijfadres?.huisnummer?.toString(),
                    person?.verblijfplaats?.verblijfadres?.huisletter,
                    person?.verblijfplaats?.verblijfadres?.huisnummertoevoeging,
                  )}
                </DescriptionListDetail>
              ),
            },
            {
              title: <FormattedMessage id="account.detail.postalCodeAndCity" />,
              detail: (
                <DescriptionListDetail
                  translate="no"
                  data-testid="persoonsgegevens-postcode"
                >
                  {getPostalCodeCityString(
                    person?.verblijfplaats?.verblijfadres?.postcode,
                    person?.verblijfplaats?.verblijfadres?.woonplaats,
                  )}
                </DescriptionListDetail>
              ),
            },
            {
              title: <FormattedMessage id="account.detail.aanvangsDatum" />,
              detail: (
                <DescriptionListDetail>
                  {person?.verblijfplaats?.datumVan?.datum
                    ? formatDate({
                        date: person?.verblijfplaats?.datumVan?.datum,
                      })
                    : ""}
                </DescriptionListDetail>
              ),
            },
            ...(showInhabitantAmount === "true"
              ? [
                  {
                    title: (
                      <FormattedMessage id="account.detail.inhabitantAmount" />
                    ),
                    detail: (
                      <DescriptionListDetail>
                        {person?.bewonersAantal?.toString()}
                      </DescriptionListDetail>
                    ),
                  },
                ]
              : []),
          ]}
        />
        <Paragraph className={styles["account__address-research-description"]}>
          <FormattedMessage id="account.inhabitantAmountDescription" />
        </Paragraph>
        {showAddressResearch && (
          <Link
            href={addressResearchUrl}
            target="_blank"
            iconAlign="start"
            icon={<ArrowRightIcon />}
          >
            <FormattedMessage id="account.addressResearchRequestButton" />
          </Link>
        )}
      </div>
    </PageGrid>
  );
};

export default AccountPage;
