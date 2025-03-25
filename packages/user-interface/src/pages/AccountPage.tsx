import { FormattedMessage, useIntl } from "react-intl";
import {
  GetBurgerProfielDocument,
  MaatschappelijkeActiviteit,
  Persoon,
  useGetBedrijfQuery,
  useGetBurgerProfielQuery,
  useGetPersoonDataQuery,
  useUpdateBurgerProfielMutation,
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
import Modal from "@gemeente-denhaag/modal";
import ContactForm from "../forms/ContactForm";
import { REGEX_PATTERNS } from "../constants/regex-patterns";
import { FormEvent } from "react";
import { Paragraph } from "@gemeente-denhaag/typography";
import { Accordion, AccordionSection } from "@gemeente-denhaag/accordion";
import "@gemeente-denhaag/button-group";
import DescriptionListDetail from "../components/DescriptionListDetail";
import NotificationForm from "../forms/NotificationForm";
import Skeleton from "react-loading-skeleton";

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

  const { data: contactData, loading: contactLoading } =
    useGetBurgerProfielQuery({ skip: !isPerson });
  const { data: personData, loading: personLoading } = useGetPersoonDataQuery({
    skip: !isPerson,
  });
  const { data: companyData, loading: companyLoading } = useGetBedrijfQuery({
    skip: isPerson,
  });

  const [mutateFunction, { loading: loadingMutation }] =
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

  const handleNotificationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("test");
    const { emailNotification } = Object.fromEntries(
      new FormData(event.currentTarget),
    );

    mutateFunction({
      variables: {
        klant: { aanmaakkanaal: emailNotification?.toString() || "" },
      },
    });
  };

  const loading = personLoading || companyLoading || contactLoading;
  const person = personData?.getPersoon as Persoon | undefined;
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
        <Accordion>
          <AccordionSection
            title={intl.formatMessage({ id: "account.detail.contact" })}
            description={intl.formatMessage({
              id: "account.detail.contact.description",
            })}
          >
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
                    <Modal
                      title={intl.formatMessage({
                        id: `account.detail.emailadres.modal.toevoegen`,
                      })}
                      closeLabel={intl.formatMessage({ id: "modal.close" })}
                      trigger={(setOpen) => (
                        <Link
                          onClick={() => setOpen(true)}
                          icon={<EditIcon />}
                          iconAlign="start"
                        >
                          <FormattedMessage id="account.edit" />
                        </Link>
                      )}
                      actions={(setOpen) => [
                        {
                          children: intl.formatMessage({
                            id: `account.detail.emailadres.modal.cancel`,
                          }),
                          variant: "secondary-action",
                          onClick: () => setOpen(false),
                        },
                        {
                          form: "submitContact",
                          children: intl.formatMessage({
                            id: `account.detail.emailadres.modal.confirm`,
                          }),
                          type: "submit",
                          disabled: loadingMutation,
                        },
                      ]}
                    >
                      {(setOpen) => (
                        <>
                          <Paragraph>
                            <FormattedMessage id="account.detail.emailadres.modal.text" />
                          </Paragraph>
                          <ContactForm
                            type="email"
                            currentValue={
                              contactData?.getBurgerProfiel?.emailadres || ""
                            }
                            validationRegex={REGEX_PATTERNS.emailadres}
                            formId="submitContact"
                            onSubmit={(value) =>
                              mutateFunction({
                                variables: {
                                  klant: { emailadres: value || "" },
                                },
                              }).finally(() => setOpen(false))
                            }
                          />
                        </>
                      )}
                    </Modal>
                  ),
                },
                {
                  title: (
                    <FormattedMessage id="account.detail.telefoonnummer" />
                  ),
                  detail: (
                    <DescriptionListDetail translate="no">
                      {contactData?.getBurgerProfiel?.telefoonnummer}
                    </DescriptionListDetail>
                  ),
                  action: (
                    <Modal
                      title={intl.formatMessage({
                        id: `account.detail.telefoonnummer.modal.toevoegen`,
                      })}
                      closeLabel={intl.formatMessage({ id: "modal.close" })}
                      trigger={(setOpen) => (
                        <Link
                          onClick={() => setOpen(true)}
                          icon={<EditIcon />}
                          iconAlign="start"
                        >
                          <FormattedMessage id="account.edit" />
                        </Link>
                      )}
                      actions={(setOpen) => [
                        {
                          children: intl.formatMessage({
                            id: `account.detail.telefoonnummer.modal.cancel`,
                          }),
                          variant: "secondary-action",
                          onClick: () => setOpen(false),
                        },
                        {
                          form: "submitContact",
                          children: intl.formatMessage({
                            id: `account.detail.telefoonnummer.modal.confirm`,
                          }),
                          type: "submit",
                          disabled: loadingMutation,
                        },
                      ]}
                    >
                      {(setOpen) => (
                        <>
                          <Paragraph>
                            <FormattedMessage id="account.detail.telefoonnummer.modal.text" />
                          </Paragraph>
                          <ContactForm
                            type="tel"
                            currentValue={
                              contactData?.getBurgerProfiel?.telefoonnummer ||
                              ""
                            }
                            validationRegex={REGEX_PATTERNS.telefoonnummer}
                            formId="submitContact"
                            onSubmit={(value) =>
                              mutateFunction({
                                variables: {
                                  klant: { telefoonnummer: value || "" },
                                },
                              }).finally(() => setOpen(false))
                            }
                          />
                        </>
                      )}
                    </Modal>
                  ),
                },
              ]}
            />
          </AccordionSection>
        </Accordion>
        {showNotificationSubSection && (
          <Accordion>
            <AccordionSection
              title={intl.formatMessage({ id: "account.detail.meldingen" })}
              description={intl.formatMessage({
                id: "account.detail.meldingen.description",
              })}
              data-testid="meldingen"
            >
              {loading ? (
                <Skeleton />
              ) : (
                <NotificationForm
                  currentValue={
                    contactData?.getBurgerProfiel?.aanmaakkanaal || ""
                  }
                  onSubmit={handleNotificationSubmit}
                  loading={loadingMutation}
                />
              )}
            </AccordionSection>
          </Accordion>
        )}
        <Accordion data-testid="persoonsgegevens">
          <AccordionSection
            title={intl.formatMessage({
              id: "account.detail.persoonsgegevens",
            })}
            description={intl.formatMessage({
              id: "account.detail.persoonsgegevens.description",
            })}
          >
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
                  title: (
                    <FormattedMessage id="account.detail.countryOfBirth" />
                  ),
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
          </AccordionSection>
        </Accordion>
        <Accordion>
          <AccordionSection
            title={intl.formatMessage({ id: "account.detail.adres" })}
            description={intl.formatMessage({
              id: "account.detail.adres.description",
            })}
          >
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
                        person?.verblijfplaats?.straat,
                        person?.verblijfplaats?.huisnummer,
                        person?.verblijfplaats?.huisletter,
                        person?.verblijfplaats?.huisnummertoevoeging,
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
          </AccordionSection>
        </Accordion>
      </div>
    </PageGrid>
  );
};

export default AccountPage;
