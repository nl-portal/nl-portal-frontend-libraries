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
import { useContext, useMemo } from "react";
import UserContext from "../contexts/UserContext";
import Notification from "../components/Notification";
import { LinkList } from "@gemeente-denhaag/link-list";
import { DigitaleAdresType } from "@nl-portal/nl-portal-api";
import AppContext from "../contexts/AppContext";

const AccountPage = () => {
  const { formatDate } = useDateFormatter();
  const { features } = useContext(AppContext);
  const { isPersoon, persoon, bedrijf, contact } = useContext(UserContext);
  const { paths } = useOutletContext<RouterOutletContext>();
  const intl = useIntl();
  const telefoonnummer = contact?.getUserDigitaleAdressen?.find(
    (a) => a.type === DigitaleAdresType.Telefoonnummer,
  );
  const emailadres = contact?.getUserDigitaleAdressen?.find(
    (a) => a.type === DigitaleAdresType.Email,
  );
  const openKlantAvailable = useMemo(() => {
    if (isPersoon && persoon) return true;
    if (!isPersoon && bedrijf) return true;
    return false;
  }, [isPersoon, persoon, bedrijf]);
  const contactDataAvailable = Boolean(contact);

  const indexItems = useMemo(() => {
    const items = [];

    if (contactDataAvailable) {
      items.push({
        label: <FormattedMessage id="account.detail.contact" />,
        href: "#contact",
      });
    }

    if (openKlantAvailable) {
      items.push({
        label: <FormattedMessage id="account.detail.persoonsgegevens" />,
        href: "#persoonsgegevens",
      });

      items.push({
        label: <FormattedMessage id="account.detail.adres" />,
        href: "#adres",
      });
    }

    return items;
  }, [contactDataAvailable, openKlantAvailable]);

  if (!isPersoon)
    return (
      <PageGrid>
        <PageHeader title={<FormattedMessage id="pageTitles.account" />}>
          {(!openKlantAvailable || !contactDataAvailable) && (
            <Notification
              variant="error"
              title=""
              text={intl.formatMessage({ id: "account.noDataAvailable" })}
              closable={false}
            />
          )}
        </PageHeader>
        {contactDataAvailable && (
          <PageGrid variant="small">
            <Heading id="contact" as="h3">
              <FormattedMessage id="account.detail.contact" />
            </Heading>
            <DescriptionList
              items={[
                {
                  title: <FormattedMessage id="account.detail.emailadres" />,
                  detail: (
                    <DescriptionListDetail translate="no">
                      {emailadres?.waarde}
                    </DescriptionListDetail>
                  ),
                  action: (
                    <Link
                      icon={<EditIcon />}
                      iconAlign="start"
                      href={paths.changeContactInfo("email")}
                      Link={PortalLink}
                    >
                      <FormattedMessage id="account.edit" />
                    </Link>
                  ),
                },
                {
                  title: (
                    <FormattedMessage id="account.detail.telefoonnummer" />
                  ),
                  detail: (
                    <DescriptionListDetail translate="no">
                      {telefoonnummer?.waarde}
                    </DescriptionListDetail>
                  ),
                  action: (
                    <Link
                      icon={<EditIcon />}
                      iconAlign="start"
                      href={paths.changeContactInfo("telefoonnummer")}
                      Link={PortalLink}
                    >
                      <FormattedMessage id="account.edit" />
                    </Link>
                  ),
                },
              ]}
            />
          </PageGrid>
        )}
        {openKlantAvailable && (
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
        )}
        {openKlantAvailable && (
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
                        bedrijf?.embedded?.hoofdvestiging?.adressen?.[0]
                          ?.plaats,
                      )}
                    </DescriptionListDetail>
                  ),
                },
              ]}
            ></DescriptionList>
          </PageGrid>
        )}
      </PageGrid>
    );

  return (
    <PageGrid>
      <PageGrid variant="small">
        <PageHeader title={<FormattedMessage id="pageTitles.account" />}>
          {(!openKlantAvailable || !contactDataAvailable) && (
            <Notification
              variant="error"
              title=""
              text={intl.formatMessage({ id: "account.noDataAvailable" })}
              closable={false}
            />
          )}
        </PageHeader>
        <LeadParagraph>
          <FormattedMessage id="account.leadParagraph" />
        </LeadParagraph>
        {indexItems.length > 0 && (
          <PageIndex
            heading={intl.formatMessage({ id: "account.pageIndex.title" })}
            headingLevel={3}
            headingAppearance="level-3"
            items={indexItems}
          />
        )}
      </PageGrid>
      {contactDataAvailable && (
        <PageGrid variant="small">
          <Heading id="contact" as="h3">
            <FormattedMessage id="account.detail.contact" />
          </Heading>
          <DescriptionList
            items={[
              {
                title: <FormattedMessage id="account.detail.emailadres" />,
                detail: (
                  <DescriptionListDetail translate="no">
                    {emailadres?.waarde}
                  </DescriptionListDetail>
                ),
                action: (
                  <Link
                    icon={<EditIcon />}
                    iconAlign="start"
                    href={paths.changeContactInfo("email")}
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
                    {telefoonnummer?.waarde}
                  </DescriptionListDetail>
                ),
                action: (
                  <Link
                    icon={<EditIcon />}
                    iconAlign="start"
                    href={paths.changeContactInfo("telefoonnummer")}
                    Link={PortalLink}
                  >
                    <FormattedMessage id="account.edit" />
                  </Link>
                ),
              },
            ]}
          />
        </PageGrid>
      )}
      {openKlantAvailable && (
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
          {(features?.properties.myNameChangeUrl ||
            features?.properties.myGenderChangeUrl) && (
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
                    href: features?.properties.myNameChangeUrl,
                    external: true,
                  },
                  {
                    label: (
                      <FormattedMessage id="account.adres.links.changeRegisteredGender" />
                    ),
                    href: features?.properties.myGenderChangeUrl,
                    external: true,
                  },
                ].filter((item): item is typeof item & { href: string } =>
                  Boolean(item.href),
                )}
              />
            </div>
          )}
        </PageGrid>
      )}
      {openKlantAvailable && (
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
                      persoon?.verblijfplaats?.verblijfadres
                        ?.officieleStraatnaam,
                      persoon?.verblijfplaats?.verblijfadres?.huisnummer?.toString(),
                      persoon?.verblijfplaats?.verblijfadres?.huisletter,
                      persoon?.verblijfplaats?.verblijfadres
                        ?.huisnummertoevoeging,
                    )}
                  </DescriptionListDetail>
                ),
              },
              {
                title: (
                  <FormattedMessage id="account.detail.postalCodeAndCity" />
                ),
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
              ...(features?.toggles.myInhabitantCountEnabled
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
          {(features?.properties.myAddressChangeUrl ||
            features?.properties.myAddressResearchUrl) && (
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
                    href: features?.properties.myAddressChangeUrl,
                    external: true,
                  },
                  {
                    label: (
                      <FormattedMessage id="account.adres.links.addressResearchRequest" />
                    ),
                    href: features?.properties.myAddressResearchUrl,
                    external: true,
                  },
                ].filter((item): item is typeof item & { href: string } =>
                  Boolean(item.href),
                )}
              />
            </div>
          )}
        </PageGrid>
      )}
      {(features?.properties.myAddressResearchMoreInfoUrl ||
        features?.properties.myBrpChangeUrl ||
        features?.properties.myBrpConfidentiallyChangeUrl) && (
        <div>
          <Heading id="wijzigingen-en-aanvragen-brp" as="h3">
            <FormattedMessage id="account.detail.wijzigingenBrp" />
          </Heading>
          <LinkList
            className={styles["account__link-list"]}
            items={[
              {
                label: (
                  <FormattedMessage id="account.wijzigingEnAanvragenBRP.links.addressResearchMoreInfo" />
                ),
                href: features?.properties.myAddressResearchMoreInfoUrl,
                external: true,
              },
              {
                label: (
                  <FormattedMessage id="account.wijzigingEnAanvragenBRP.links.requestForChangeBrpInfo" />
                ),
                href: features?.properties.myBrpChangeUrl,
                external: true,
              },
              {
                label: (
                  <FormattedMessage id="account.wijzigingEnAanvragenBRP.links.requestConfidentialityOfDataInfo" />
                ),
                href: features?.properties.myBrpConfidentiallyChangeUrl,
                external: true,
              },
            ].filter((item): item is typeof item & { href: string } =>
              Boolean(item.href),
            )}
          />
        </div>
      )}
    </PageGrid>
  );
};

export default AccountPage;
