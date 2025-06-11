import { FormattedMessage, useIntl } from "react-intl";
import {
  MaatschappelijkeActiviteit,
  Persoon,
  useGetBedrijfQuery,
  useGetBurgerProfielQuery,
  useGetPersoonDataQuery,
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
import { PageIndex } from "@gemeente-denhaag/page-index";
import { LeadParagraph, Paragraph } from "@gemeente-denhaag/typography";
import "@gemeente-denhaag/button-group";
import DescriptionListDetail from "../components/DescriptionListDetail";
import { useOutletContext } from "react-router";
import { RouterOutletContext } from "../interfaces/router-outlet-context";
import PortalLink from "../components/PortalLink";

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
  const { paths } = useOutletContext<RouterOutletContext>();
  const intl = useIntl();
  const { data: contactData } = useGetBurgerProfielQuery({ skip: !isPerson });
  const { data: personData } = useGetPersoonDataQuery({
    skip: !isPerson,
  });
  const { data: companyData } = useGetBedrijfQuery({
    skip: isPerson,
  });

  const person = personData?.getPersoon as Persoon | undefined;
  const company = companyData?.getBedrijf as
    | MaatschappelijkeActiviteit
    | undefined;

  if (!isPerson)
    return (
      <PageGrid>
        <PageHeader title={<FormattedMessage id="pageTitles.account" />} />
        <PageGrid variant="small">
          <Heading as="h3">
            <FormattedMessage id="account.companyInfoHeader" />
          </Heading>
          <DescriptionList
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
        </PageGrid>
        <PageGrid variant="small">
          <Heading as="h3">
            <FormattedMessage id="account.BusinessAddressHeader" />
          </Heading>
          <DescriptionList
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
        </PageGrid>
      </PageGrid>
    );

  return (
    <PageGrid>
      <PageGrid variant="small">
        <PageHeader title={<FormattedMessage id="pageTitles.account" />} />
        <LeadParagraph>
          <FormattedMessage id="account.leadParagraph" />
        </LeadParagraph>
        <PageIndex
          heading={intl.formatMessage({ id: "account.pageIndex.title" })}
          headingAs="h3"
          headingSize="h3"
          items={[
            {
              label: <FormattedMessage id="account.detail.contact" />,
              href: "#contact",
            },
            {
              label: <FormattedMessage id="account.detail.persoonsgegevens" />,
              href: "#persoonsgegevens",
            },
            {
              label: <FormattedMessage id="account.detail.adres" />,
              href: "#adres",
            },
            {
              label: <FormattedMessage id="account.detail.meldingen" />,
              href: "#meldingen",
            },
          ]}
        />
      </PageGrid>
      <PageGrid variant="small">
        <Heading as="h3" id="contact">
          <FormattedMessage id="account.detail.contact" />
        </Heading>
        <Link
          icon={<EditIcon />}
          iconAlign="start"
          href={paths.changeContactInfo}
          Link={PortalLink}
        >
          <FormattedMessage id="account.edit" />
        </Link>
        <DescriptionList
          items={[
            {
              title: <FormattedMessage id="account.detail.emailadres" />,
              detail: (
                <DescriptionListDetail translate="no">
                  {contactData?.getBurgerProfiel?.emailadres}
                </DescriptionListDetail>
              ),
            },
            {
              title: <FormattedMessage id="account.detail.telefoonnummer" />,
              detail: (
                <DescriptionListDetail translate="no">
                  {contactData?.getBurgerProfiel?.telefoonnummer}
                </DescriptionListDetail>
              ),
            },
          ]}
        />
      </PageGrid>
      <PageGrid variant="small">
        <Heading id="persoonsgegevens" as="h3">
          <FormattedMessage id="account.detail.persoonsgegevens" />
        </Heading>
        <DescriptionList
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
                  {person?.geslachtsaanduiding}
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
                        date: `${person?.geboorte?.datum?.jaar}-${String(person?.geboorte?.datum?.maand).padStart(2, "0")}-${String(person?.geboorte?.datum?.dag).padStart(2, "0")}`,
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
          ]}
        />
      </PageGrid>
      <PageGrid variant="small">
        <Heading id="adres" as="h3">
          <FormattedMessage id="account.detail.adres" />
        </Heading>
        <DescriptionList
          items={[
            {
              title: <FormattedMessage id="account.detail.street" />,
              detail: (
                <DescriptionListDetail
                  translate="no"
                  data-testid="persoonsgegevens-street"
                >
                  {getStreetString(
                    person?.verblijfplaats?.straat,
                    person?.verblijfplaats?.huisnummer,
                    person?.verblijfplaats?.huisletter,
                    person?.verblijfplaats?.huisnummertoevoeging,
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
                    person?.verblijfplaats?.postcode,
                    person?.verblijfplaats?.woonplaats,
                  )}
                </DescriptionListDetail>
              ),
            },
            {
              title: <FormattedMessage id="account.detail.aanvangsDatum" />,
              detail: (
                <DescriptionListDetail>
                  {person?.verblijfplaats?.datumAanvangAdreshouding
                    ? formatDate({
                        date: `${person?.verblijfplaats?.datumAanvangAdreshouding?.jaar}-${String(person?.verblijfplaats?.datumAanvangAdreshouding?.maand).padStart(2, "0")}-${String(person?.verblijfplaats?.datumAanvangAdreshouding?.dag).padStart(2, "0")}`,
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
        <div>
          <Paragraph
            className={styles["account__address-research-description"]}
          >
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
      {showNotificationSubSection && (
        <PageGrid variant="small">
          <Heading id="meldingen" as="h3">
            <FormattedMessage id="account.detail.meldingen" />
          </Heading>
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
                      values={{
                        strong: (chunk) => <strong>{chunk}</strong>,
                      }}
                    />
                  </DescriptionListDetail>
                ),
              },
            ]}
          />
        </PageGrid>
      )}
    </PageGrid>
  );
};

export default AccountPage;
