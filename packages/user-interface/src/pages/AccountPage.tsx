import { FormattedMessage, useIntl } from "react-intl";
import styles from "./AccountPage.module.scss";
import {
  getNationalitiesString,
  getPostalCodeCityString,
  getStreetString,
} from "../utils/person-data";
import PageHeader from "../components/PageHeader";
import PageGrid from "../components/PageGrid";
import Heading from "../components/Heading";
import { useDateFormatter } from "@nl-portal/nl-portal-localization";
import { DescriptionList } from "@gemeente-denhaag/descriptionlist";
import { Link } from "@gemeente-denhaag/link";
import { EditIcon } from "@gemeente-denhaag/icons";
import { PageIndex } from "@gemeente-denhaag/page-index";
import { LeadParagraph } from "@gemeente-denhaag/typography";
import "@gemeente-denhaag/button-group";
import DescriptionListDetail from "../components/DescriptionListDetail";
import { useOutletContext } from "react-router";
import { RouterOutletContext } from "../interfaces/router-outlet-context";
import PortalLink from "../components/PortalLink";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import Notification from "../components/Notification";
import { LinkList } from "@gemeente-denhaag/link-list";
import { DigitaleAdresType } from "@nl-portal/nl-portal-api";

// Temporary props, this should be moved to the config portal in the future
interface AccountPageProps {
  showInhabitantAmount?: string;
  addressResearchUrl?: string;
  reportChangeOfAddressUrl?: string;
  changeInUseOfSurnameUrl?: string;
  changeRegisteredGenderUrl?: string;
  addressResearchMoreInfoUrl?: string;
  requestForChangeBrpInfoUrl?: string;
  requestConfidentialityOfDataUrl?: string;
  showNotificationSubSection?: boolean;
}

const AccountPage = ({
  showInhabitantAmount,
  addressResearchUrl,
  reportChangeOfAddressUrl,
  changeInUseOfSurnameUrl,
  changeRegisteredGenderUrl,
  addressResearchMoreInfoUrl,
  requestForChangeBrpInfoUrl,
  requestConfidentialityOfDataUrl,
  //showNotificationSubSection = true,
}: AccountPageProps) => {
  const { formatDate } = useDateFormatter();
  const { isPersoon, persoon, bedrijf, contact } = useContext(UserContext);
  const { paths } = useOutletContext<RouterOutletContext>();
  const intl = useIntl();
  const telefoonnummer = contact?.getUserDigitaleAdressen?.find(
    (a) => a.type === DigitaleAdresType.Telefoonnummer,
  );
  const emailadres = contact?.getUserDigitaleAdressen?.find(
    (a) => a.type === DigitaleAdresType.Email,
  );

  if ((isPersoon && !persoon) || (!isPersoon && !bedrijf)) {
    return (
      <>
        <PageHeader title={<FormattedMessage id="pageTitles.account" />} />
        <Notification
          variant="error"
          title=""
          text={intl.formatMessage({ id: "account.noDataAvailable" })}
          closable={false}
        />
      </>
    );
  }

  if (!isPersoon)
    return (
      <PageGrid>
        <PageHeader title={<FormattedMessage id="pageTitles.account" />} />
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
                    {emailadres?.waarde}
                  </DescriptionListDetail>
                ),
              },
              {
                title: <FormattedMessage id="account.detail.telefoonnummer" />,
                detail: (
                  <DescriptionListDetail translate="no">
                    {telefoonnummer?.waarde}
                  </DescriptionListDetail>
                ),
              },
            ]}
          />
        </PageGrid>
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
                    {bedrijf?.kvkNummer}
                  </DescriptionListDetail>
                ),
              },
              {
                title: <FormattedMessage id="account.detail.companyName" />,
                detail: (
                  <DescriptionListDetail translate="no">
                    {bedrijf?.naam}
                  </DescriptionListDetail>
                ),
              },
              {
                title: <FormattedMessage id="account.detail.legalForm" />,
                detail: (
                  <DescriptionListDetail>
                    {bedrijf?.embedded?.eigenaar?.rechtsvorm}
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
                      bedrijf?.embedded?.hoofdvestiging?.adressen?.[0]
                        ?.straatnaam,
                      bedrijf?.embedded?.hoofdvestiging?.adressen?.[0]?.huisnummer?.toString(),
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
                      bedrijf?.embedded?.hoofdvestiging?.adressen?.[0]
                        ?.postcode,
                      bedrijf?.embedded?.hoofdvestiging?.adressen?.[0]?.plaats,
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
          headingLevel={3}
          headingAppearance="level-3"
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
            // {
            //   label: <FormattedMessage id="account.detail.meldingen" />,
            //   href: "#meldingen",
            // },
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
                  {emailadres?.waarde}
                </DescriptionListDetail>
              ),
            },
            {
              title: <FormattedMessage id="account.detail.telefoonnummer" />,
              detail: (
                <DescriptionListDetail translate="no">
                  {telefoonnummer?.waarde}
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
                  {persoon?.naam.voornamen}
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
                  {persoon?.naam.officialLastName}
                </DescriptionListDetail>
              ),
            },
            {
              title: <FormattedMessage id="account.detail.gender" />,
              detail: (
                <DescriptionListDetail data-testid="persoonsgegevens-gender">
                  {persoon?.geslacht?.omschrijving}
                </DescriptionListDetail>
              ),
            },
            {
              title: (
                <FormattedMessage id="account.detail.citizenServiceNumber" />
              ),
              detail: (
                <DescriptionListDetail data-testid="persoonsgegevens-bsn">
                  {persoon?.burgerservicenummer}
                </DescriptionListDetail>
              ),
            },
            {
              title: <FormattedMessage id="account.detail.dateOfBirth" />,
              detail: (
                <DescriptionListDetail data-testid="persoonsgegevens-birthdate">
                  {persoon?.geboorte?.datum?.datum
                    ? formatDate({
                        date: persoon.geboorte.datum.datum,
                      })
                    : ""}
                </DescriptionListDetail>
              ),
            },
            {
              title: <FormattedMessage id="account.detail.countryOfBirth" />,
              detail: (
                <DescriptionListDetail data-testid="persoonsgegevens-country">
                  {persoon?.geboorte?.land?.omschrijving}
                </DescriptionListDetail>
              ),
            },
            {
              title: <FormattedMessage id="account.detail.nationality" />,
              detail: (
                <DescriptionListDetail data-testid="persoonsgegevens-nationality">
                  {getNationalitiesString(persoon?.nationaliteiten)}
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
                      id={`account.detail.confidentialityOfPersonalData.${persoon?.geheimhoudingPersoonsgegevens ?? false}`}
                    />
                  }
                </DescriptionListDetail>
              ),
            },
          ]}
        />
        {(changeInUseOfSurnameUrl || changeRegisteredGenderUrl) && (
          <div>
            <Heading as="h4">
              <FormattedMessage id="linkList.title" />
            </Heading>
            <LinkList
              className={styles["account__link-list"]}
              items={[
                {
                  label: (
                    <FormattedMessage id="account.persoonsgegevens.links.changeInUseOfSurname" />
                  ),
                  href: changeInUseOfSurnameUrl,
                  external: true,
                },
                {
                  label: (
                    <FormattedMessage id="account.adres.links.changeRegisteredGender" />
                  ),
                  href: changeRegisteredGenderUrl,
                  external: true,
                },
              ].filter((item): item is typeof item & { href: string } =>
                Boolean(item.href),
              )}
            />
          </div>
        )}
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
                    persoon?.verblijfplaats?.verblijfadres?.officieleStraatnaam,
                    persoon?.verblijfplaats?.verblijfadres?.huisnummer?.toString(),
                    persoon?.verblijfplaats?.verblijfadres?.huisletter,
                    persoon?.verblijfplaats?.verblijfadres
                      ?.huisnummertoevoeging,
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
                    persoon?.verblijfplaats?.verblijfadres?.postcode,
                    persoon?.verblijfplaats?.verblijfadres?.woonplaats,
                  )}
                </DescriptionListDetail>
              ),
            },
            {
              title: <FormattedMessage id="account.detail.aanvangsDatum" />,
              detail: (
                <DescriptionListDetail>
                  {persoon?.verblijfplaats?.datumVan?.datum
                    ? formatDate({
                        date: persoon?.verblijfplaats?.datumVan?.datum,
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
                        {persoon?.bewonersAantal?.toString()}
                      </DescriptionListDetail>
                    ),
                  },
                ]
              : []),
          ]}
        />
        {(reportChangeOfAddressUrl || addressResearchUrl) && (
          <div>
            <Heading as="h4">
              <FormattedMessage id="linkList.title" />
            </Heading>
            <LinkList
              className={styles["account__link-list"]}
              items={[
                {
                  label: (
                    <FormattedMessage id="account.adres.links.reportChangeOfAddress" />
                  ),
                  href: reportChangeOfAddressUrl,
                  external: true,
                },
                {
                  label: (
                    <FormattedMessage id="account.adres.links.addressResearchRequest" />
                  ),
                  href: addressResearchUrl,
                  external: true,
                },
              ].filter((item): item is typeof item & { href: string } =>
                Boolean(item.href),
              )}
            />
          </div>
        )}
      </PageGrid>
      {(addressResearchMoreInfoUrl ||
        requestForChangeBrpInfoUrl ||
        requestConfidentialityOfDataUrl) && (
        <div>
          <Heading id="wijzigingen-en-aanvragen-brp" as="h3">
            <FormattedMessage id="account.detail.wijzigingenBrp" />
          </Heading>
          {(addressResearchMoreInfoUrl ||
            requestForChangeBrpInfoUrl ||
            requestConfidentialityOfDataUrl) && (
            <LinkList
              className={styles["account__link-list"]}
              items={[
                {
                  label: (
                    <FormattedMessage id="account.wijzigingEnAanvragenBRP.links.addressResearchMoreInfo" />
                  ),
                  href: addressResearchMoreInfoUrl,
                  external: true,
                },
                {
                  label: (
                    <FormattedMessage id="account.wijzigingEnAanvragenBRP.links.requestForChangeBrpInfo" />
                  ),
                  href: requestForChangeBrpInfoUrl,
                  external: true,
                },
                {
                  label: (
                    <FormattedMessage id="account.wijzigingEnAanvragenBRP.links.requestConfidentialityOfDataInfo" />
                  ),
                  href: requestConfidentialityOfDataUrl,
                  external: true,
                },
              ].filter((item): item is typeof item & { href: string } =>
                Boolean(item.href),
              )}
            />
          )}
        </div>
      )}
    </PageGrid>
  );
};

export default AccountPage;
