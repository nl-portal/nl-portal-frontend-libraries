import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInteger: { input: any; output: any; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  LocalDateTime: { input: any; output: any; }
  LocalTime: { input: any; output: any; }
  Locale: { input: any; output: any; }
  Long: { input: any; output: any; }
  PositiveFloat: { input: any; output: any; }
  UUID: { input: any; output: any; }
  ZonedDateTime: { input: any; output: any; }
};

export type ActiesPage = {
  __typename?: 'ActiesPage';
  /**  The elements on this page */
  content: Array<OpenProductActie>;
  /**  The requested page number */
  number: Scalars['Int']['output'];
  /**  The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  /**  The requested page size */
  size: Scalars['Int']['output'];
  /**  The total number of elements */
  totalElements: Scalars['Int']['output'];
  /**  The total number of available pages */
  totalPages: Scalars['Int']['output'];
};

export type Adres = {
  __typename?: 'Adres';
  huisnummer?: Maybe<Scalars['Int']['output']>;
  indAfgeschermd: Scalars['String']['output'];
  land: Scalars['String']['output'];
  plaats: Scalars['String']['output'];
  postbusnummer?: Maybe<Scalars['Int']['output']>;
  postcode: Scalars['String']['output'];
  straatnaam?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  volledigAdres: Scalars['String']['output'];
};

export type Bericht = {
  __typename?: 'Bericht';
  berichtTekst: Scalars['String']['output'];
  berichtType: BerichtType;
  bijlages: Array<Scalars['String']['output']>;
  documenten: Array<Document>;
  einddatumHandelingstermijn: Scalars['ZonedDateTime']['output'];
  geopend: Scalars['Boolean']['output'];
  handelingsperspectief: BerichtHandelingsperspectief;
  id?: Maybe<Scalars['UUID']['output']>;
  identificatie: BerichtIdentificatie;
  onderwerp: Scalars['String']['output'];
  publicatiedatum: Scalars['ZonedDateTime']['output'];
  referentie: Scalars['String']['output'];
};

export enum BerichtHandelingsperspectief {
  Betalen = 'BETALEN',
  InformatieOntvangen = 'INFORMATIE_ONTVANGEN',
  InformatieVerstrekken = 'INFORMATIE_VERSTREKKEN'
}

export type BerichtIdentificatie = {
  __typename?: 'BerichtIdentificatie';
  type: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export enum BerichtType {
  Betaalverzoek = 'BETAALVERZOEK',
  Notificatie = 'NOTIFICATIE',
  Uitnodiging = 'UITNODIGING',
  Verzoek = 'VERZOEK'
}

export type BerichtenPage = {
  __typename?: 'BerichtenPage';
  /**  The elements on this page */
  content: Array<Bericht>;
  /**  The requested page number */
  number: Scalars['Int']['output'];
  /**  The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  /**  The requested page size */
  size: Scalars['Int']['output'];
  /**  The total number of elements */
  totalElements: Scalars['Int']['output'];
  /**  The total number of available pages */
  totalPages: Scalars['Int']['output'];
};

export type Besluit = {
  __typename?: 'Besluit';
  auditTrails: Array<BesluitAuditTrail>;
  besluittype: BesluitType;
  bestuursorgaan?: Maybe<Scalars['String']['output']>;
  datum: Scalars['Date']['output'];
  documenten: Array<BesluitDocument>;
  identificatie: Scalars['String']['output'];
  ingangsdatum: Scalars['Date']['output'];
  publicatiedatum?: Maybe<Scalars['Date']['output']>;
  toelichting?: Maybe<Scalars['String']['output']>;
  uiterlijkeReactiedatum?: Maybe<Scalars['Date']['output']>;
  url: Scalars['String']['output'];
  verantwoordelijkeOrganisatie: Scalars['String']['output'];
  vervaldatum?: Maybe<Scalars['Date']['output']>;
  vervalreden: Scalars['String']['output'];
  vervalredenWeergave: Scalars['String']['output'];
  verzenddatum?: Maybe<Scalars['Date']['output']>;
  zaak: Scalars['String']['output'];
};

export type BesluitAuditTrail = {
  __typename?: 'BesluitAuditTrail';
  aanmaakdatum?: Maybe<Scalars['ZonedDateTime']['output']>;
  actie: Scalars['String']['output'];
  actieWeergave?: Maybe<Scalars['String']['output']>;
  applicatieId?: Maybe<Scalars['String']['output']>;
  applicatieWeergave?: Maybe<Scalars['String']['output']>;
  bron: Scalars['String']['output'];
  gebruikersId?: Maybe<Scalars['String']['output']>;
  gebruikersWeergave?: Maybe<Scalars['String']['output']>;
  hoofdObject: Scalars['String']['output'];
  resource: Scalars['String']['output'];
  resourceUrl: Scalars['String']['output'];
  resourceWeergave: Scalars['String']['output'];
  resultaat: Scalars['Int']['output'];
  toelichting?: Maybe<Scalars['String']['output']>;
  uuid: Scalars['UUID']['output'];
  wijzigingen: BesluitAuditTrailWijzigingen;
};

export type BesluitAuditTrailWijzigingen = {
  __typename?: 'BesluitAuditTrailWijzigingen';
  nieuw?: Maybe<Scalars['JSON']['output']>;
  oud?: Maybe<Scalars['JSON']['output']>;
};

export type BesluitDocument = {
  __typename?: 'BesluitDocument';
  besluit: Scalars['String']['output'];
  informatieobject: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type BesluitPage = {
  __typename?: 'BesluitPage';
  /**  The elements on this page */
  content: Array<Besluit>;
  /**  The requested page number */
  number: Scalars['Int']['output'];
  /**  The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  /**  The requested page size */
  size: Scalars['Int']['output'];
  /**  The total number of elements */
  totalElements: Scalars['Int']['output'];
  /**  The total number of available pages */
  totalPages: Scalars['Int']['output'];
};

export type BesluitType = {
  __typename?: 'BesluitType';
  besluitcategorie: Scalars['String']['output'];
  omschrijving?: Maybe<Scalars['String']['output']>;
  omschrijvingGeneriek?: Maybe<Scalars['String']['output']>;
  publicatieIndicatie: Scalars['Boolean']['output'];
  publicatietekst?: Maybe<Scalars['String']['output']>;
  publicatietermijn?: Maybe<Scalars['String']['output']>;
  reactietermijn?: Maybe<Scalars['String']['output']>;
  toelichting?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
  zaaktypen: Array<Scalars['String']['output']>;
};

export type BestandenPage = {
  __typename?: 'BestandenPage';
  /**  The elements on this page */
  content: Array<OpenProductBestand>;
  /**  The requested page number */
  number: Scalars['Int']['output'];
  /**  The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  /**  The requested page size */
  size: Scalars['Int']['output'];
  /**  The total number of elements */
  totalElements: Scalars['Int']['output'];
  /**  The total number of available pages */
  totalPages: Scalars['Int']['output'];
};

export type Betrokkene = {
  __typename?: 'Betrokkene';
  bezoekadres?: Maybe<OpenKlant2Adres>;
  contactnaam?: Maybe<Contactnaam>;
  correspondentieadres?: Maybe<OpenKlant2Adres>;
  digitaleAdressen: Array<OpenKlant2ForeignKey>;
  hadKlantcontact: OpenKlant2ForeignKey;
  initiator: Scalars['Boolean']['output'];
  organisatienaam: Scalars['String']['output'];
  rol: Scalars['String']['output'];
  url: Scalars['String']['output'];
  uuid: Scalars['String']['output'];
  volledigeNaam: Scalars['String']['output'];
  wasPartij?: Maybe<OpenKlant2ForeignKey>;
};

export type Brp2Adres = {
  __typename?: 'Brp2Adres';
  aanduidingBijHuisnummer?: Maybe<BrpCodeOmschrijving>;
  huisletter?: Maybe<Scalars['String']['output']>;
  huisnummer?: Maybe<Scalars['Int']['output']>;
  huisnummertoevoeging?: Maybe<Scalars['String']['output']>;
  inOnderzoek?: Maybe<Brp2AdresInOnderzoek>;
  korteStraatnaam?: Maybe<Scalars['String']['output']>;
  officieleStraatnaam?: Maybe<Scalars['String']['output']>;
  postcode?: Maybe<Scalars['String']['output']>;
  woonplaats?: Maybe<Scalars['String']['output']>;
};

export type Brp2AdresInOnderzoek = {
  __typename?: 'Brp2AdresInOnderzoek';
  aanduidingBijHuisnummer?: Maybe<Scalars['Boolean']['output']>;
  huisletter?: Maybe<Scalars['Boolean']['output']>;
  huisnummer?: Maybe<Scalars['Boolean']['output']>;
  huisnummertoevoeging?: Maybe<Scalars['Boolean']['output']>;
  korteStraatnaam?: Maybe<Scalars['Boolean']['output']>;
  officieleStraatnaam?: Maybe<Scalars['Boolean']['output']>;
  postcode?: Maybe<Scalars['Boolean']['output']>;
  woonplaats?: Maybe<Scalars['Boolean']['output']>;
};

export type Brp2NationaliteitInOnderzoek = {
  __typename?: 'Brp2NationaliteitInOnderzoek';
  datumIngangGeldigheid?: Maybe<Scalars['Boolean']['output']>;
  datumIngangOnderzoek?: Maybe<BrpDatum>;
  nationaliteit?: Maybe<Scalars['Boolean']['output']>;
  redenOpname?: Maybe<Scalars['Boolean']['output']>;
  type?: Maybe<Scalars['Boolean']['output']>;
};

export type BrpAdellijkeTitelPredicaat = {
  __typename?: 'BrpAdellijkeTitelPredicaat';
  code?: Maybe<Scalars['String']['output']>;
  omschrijving?: Maybe<Scalars['String']['output']>;
  soort?: Maybe<Scalars['String']['output']>;
};

export type BrpAdressering = {
  __typename?: 'BrpAdressering';
  aanhef?: Maybe<Scalars['String']['output']>;
  aanschrijfwijze?: Maybe<BrpAdresseringAanschrijfwijze>;
  adresregel1?: Maybe<Scalars['String']['output']>;
  adresregel2?: Maybe<Scalars['String']['output']>;
  adresregel3?: Maybe<Scalars['String']['output']>;
  gebruikInLopendeTekst?: Maybe<Scalars['String']['output']>;
  indicatieVastgesteldVerblijftNietOpAdres?: Maybe<Scalars['Boolean']['output']>;
  land?: Maybe<BrpCodeOmschrijving>;
};

export type BrpAdresseringAanschrijfwijze = {
  __typename?: 'BrpAdresseringAanschrijfwijze';
  aanspreekvorm?: Maybe<Scalars['String']['output']>;
  naam?: Maybe<Scalars['String']['output']>;
};

export type BrpCodeOmschrijving = {
  __typename?: 'BrpCodeOmschrijving';
  code?: Maybe<Scalars['String']['output']>;
  omschrijving?: Maybe<Scalars['String']['output']>;
};

export type BrpDatum = {
  __typename?: 'BrpDatum';
  datum?: Maybe<Scalars['Date']['output']>;
  langFormaat?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type BrpDatumLandPlaats = {
  __typename?: 'BrpDatumLandPlaats';
  datum?: Maybe<BrpDatum>;
  inOnderzoek?: Maybe<BrpDatumLandPlaatsInOnderzoek>;
  land?: Maybe<BrpCodeOmschrijving>;
  plaats?: Maybe<BrpCodeOmschrijving>;
};

export type BrpDatumLandPlaatsInOnderzoek = {
  __typename?: 'BrpDatumLandPlaatsInOnderzoek';
  datum?: Maybe<Scalars['Boolean']['output']>;
  datumIngangOnderzoek?: Maybe<BrpDatum>;
  land?: Maybe<Scalars['Boolean']['output']>;
  plaats?: Maybe<Scalars['Boolean']['output']>;
};

export type BrpEuropeesKiesrecht = {
  __typename?: 'BrpEuropeesKiesrecht';
  aanduiding?: Maybe<BrpCodeOmschrijving>;
  einddatumUitsluiting?: Maybe<BrpDatum>;
};

export type BrpGezag = {
  __typename?: 'BrpGezag';
  derde?: Maybe<BrpGezagDerde>;
  derden?: Maybe<Array<BrpGezagDerde>>;
  minderjarige?: Maybe<BrpGezagMinderjarige>;
  ouder?: Maybe<BrpGezagOuder>;
  ouders?: Maybe<Array<BrpGezagOuder>>;
  type?: Maybe<Scalars['String']['output']>;
};

export type BrpGezagDerde = {
  __typename?: 'BrpGezagDerde';
  burgerservicenummer?: Maybe<Scalars['String']['output']>;
  naam?: Maybe<BrpGezagNaam>;
  type?: Maybe<Scalars['String']['output']>;
};

export type BrpGezagMinderjarige = {
  __typename?: 'BrpGezagMinderjarige';
  burgerservicenummer?: Maybe<Scalars['String']['output']>;
  leeftijd?: Maybe<Scalars['Int']['output']>;
  naam?: Maybe<BrpGezagNaam>;
};

export type BrpGezagNaam = {
  __typename?: 'BrpGezagNaam';
  volledigeNaam?: Maybe<Scalars['String']['output']>;
};

export type BrpGezagOuder = {
  __typename?: 'BrpGezagOuder';
  burgerservicenummer?: Maybe<Scalars['String']['output']>;
  naam?: Maybe<BrpGezagNaam>;
};

export type BrpImigratie = {
  __typename?: 'BrpImigratie';
  datumVestigingInNederland?: Maybe<BrpDatum>;
  inOnderzoek?: Maybe<BrpImigratieInOnderzoek>;
  indicatieVestigingVanuitBuitenland?: Maybe<Scalars['Boolean']['output']>;
  landVanwaarIngeschreven?: Maybe<BrpCodeOmschrijving>;
  vanuitVerblijfplaatsOnbekend?: Maybe<Scalars['Boolean']['output']>;
};

export type BrpImigratieInOnderzoek = {
  __typename?: 'BrpImigratieInOnderzoek';
  datumIngangOnderzoek?: Maybe<BrpDatum>;
  datumVestigingInNederland?: Maybe<Scalars['Boolean']['output']>;
  indicatieVestigingVanuitBuitenland?: Maybe<Scalars['Boolean']['output']>;
  landVanwaarIngeschreven?: Maybe<Scalars['Boolean']['output']>;
  vanuitVerblijfplaatsOnbekend?: Maybe<Scalars['Boolean']['output']>;
};

export type BrpInOnderzoek = {
  __typename?: 'BrpInOnderzoek';
  burgerservicenummer?: Maybe<Scalars['Boolean']['output']>;
  datumIngangOnderzoekGemeente?: Maybe<BrpDatum>;
  datumIngangOnderzoekGezag?: Maybe<BrpDatum>;
  datumIngangOnderzoekPersoon?: Maybe<BrpDatum>;
  datumInschrijvingInGemeente?: Maybe<Scalars['Boolean']['output']>;
  gemeenteVanInschrijving?: Maybe<Scalars['Boolean']['output']>;
  geslacht?: Maybe<Scalars['Boolean']['output']>;
  indicatieCurateleRegister?: Maybe<Scalars['Boolean']['output']>;
  /**
   * deprecated(
   *  reason: "This value is deprecated and should be removed."
   * )
   */
  indicatieGezagMinderjarige?: Maybe<Scalars['Boolean']['output']>;
  leeftijd?: Maybe<Scalars['Boolean']['output']>;
};

export type BrpKind = {
  __typename?: 'BrpKind';
  burgerservicenummer?: Maybe<Scalars['String']['output']>;
  geboorte?: Maybe<BrpDatumLandPlaats>;
  inOnderzoek?: Maybe<BrpKindInOnderzoek>;
  naam?: Maybe<BrpNaam>;
};

export type BrpKindInOnderzoek = {
  __typename?: 'BrpKindInOnderzoek';
  burgerservicenummer?: Maybe<Scalars['Boolean']['output']>;
  datumIngangOnderzoek?: Maybe<BrpDatum>;
};

export type BrpNaam = {
  __typename?: 'BrpNaam';
  aanduidingNaamgebruik?: Maybe<BrpCodeOmschrijving>;
  adellijkeTitelPredicaat?: Maybe<BrpAdellijkeTitelPredicaat>;
  geslachtsnaam?: Maybe<Scalars['String']['output']>;
  inOnderzoek?: Maybe<BrpNaamInOnderzoek>;
  lastName: Scalars['String']['output'];
  officialLastName?: Maybe<Scalars['String']['output']>;
  volledigeNaam?: Maybe<Scalars['String']['output']>;
  voorletters?: Maybe<Scalars['String']['output']>;
  voornamen?: Maybe<Scalars['String']['output']>;
  voorvoegsel?: Maybe<Scalars['String']['output']>;
};

export type BrpNaamInOnderzoek = {
  __typename?: 'BrpNaamInOnderzoek';
  aanduidingNaamgebruik?: Maybe<Scalars['Boolean']['output']>;
  adellijkeTitelPredicaat?: Maybe<Scalars['Boolean']['output']>;
  datumIngangOnderzoek?: Maybe<BrpDatum>;
  geslachtsnaam?: Maybe<Scalars['Boolean']['output']>;
  volledigeNaam?: Maybe<Scalars['Boolean']['output']>;
  voorletters?: Maybe<Scalars['Boolean']['output']>;
  voornamen?: Maybe<Scalars['Boolean']['output']>;
  voorvoegsel?: Maybe<Scalars['Boolean']['output']>;
};

export type BrpNationaliteit = {
  __typename?: 'BrpNationaliteit';
  datumIngangGeldigheid?: Maybe<BrpCodeOmschrijving>;
  inOnderzoek?: Maybe<Brp2NationaliteitInOnderzoek>;
  nationaliteit?: Maybe<BrpCodeOmschrijving>;
  redenOpname?: Maybe<BrpCodeOmschrijving>;
  type?: Maybe<Scalars['String']['output']>;
};

export type BrpOuder = {
  __typename?: 'BrpOuder';
  burgerservicenummer?: Maybe<Scalars['String']['output']>;
  datumIngangFamilierechtelijkeBetrekking?: Maybe<BrpDatum>;
  geboorte?: Maybe<BrpDatumLandPlaats>;
  geslacht?: Maybe<BrpCodeOmschrijving>;
  inOnderzoek?: Maybe<BrpOuderInOnderzoek>;
  naam?: Maybe<BrpNaam>;
  ouderAanduiding?: Maybe<Scalars['String']['output']>;
};

export type BrpOuderInOnderzoek = {
  __typename?: 'BrpOuderInOnderzoek';
  burgerservicenummer?: Maybe<Scalars['Boolean']['output']>;
  datumIngangFamilierechtelijkeBetrekking?: Maybe<Scalars['Boolean']['output']>;
  datumIngangOnderzoek?: Maybe<BrpDatum>;
  geslacht?: Maybe<Scalars['Boolean']['output']>;
};

export type BrpPartner = {
  __typename?: 'BrpPartner';
  aangaanHuwelijkPartnerschap?: Maybe<BrpPartnerHuwelijkAangaan>;
  burgerservicenummer?: Maybe<Scalars['String']['output']>;
  geboorte?: Maybe<BrpDatumLandPlaats>;
  geslacht?: Maybe<BrpCodeOmschrijving>;
  inOnderzoek?: Maybe<BrpPartnerInOnderzoek>;
  naam?: Maybe<BrpNaam>;
  ontbindingHuwelijkPartnerschap?: Maybe<BrpPartnerHuwelijkOntbinding>;
  soortVerbintenis?: Maybe<BrpCodeOmschrijving>;
};

export type BrpPartnerHuwelijkAangaan = {
  __typename?: 'BrpPartnerHuwelijkAangaan';
  datum?: Maybe<BrpDatum>;
  inOnderzoek?: Maybe<BrpPartnerHuwelijkAangaanInOnderzoek>;
  land?: Maybe<BrpCodeOmschrijving>;
  plaats?: Maybe<BrpCodeOmschrijving>;
  soortVerbintenis?: Maybe<BrpCodeOmschrijving>;
};

export type BrpPartnerHuwelijkAangaanInOnderzoek = {
  __typename?: 'BrpPartnerHuwelijkAangaanInOnderzoek';
  datum?: Maybe<Scalars['Boolean']['output']>;
  datumIngangOnderzoek?: Maybe<BrpDatum>;
  land?: Maybe<Scalars['Boolean']['output']>;
  plaats?: Maybe<Scalars['Boolean']['output']>;
  soortVerbintenis?: Maybe<Scalars['Boolean']['output']>;
};

export type BrpPartnerHuwelijkOntbinding = {
  __typename?: 'BrpPartnerHuwelijkOntbinding';
  datum?: Maybe<BrpDatum>;
  inOnderzoek?: Maybe<BrpPartnerHuwelijkOntbindingInOnderzoek>;
};

export type BrpPartnerHuwelijkOntbindingInOnderzoek = {
  __typename?: 'BrpPartnerHuwelijkOntbindingInOnderzoek';
  datum?: Maybe<Scalars['Boolean']['output']>;
  datumIngangOnderzoek?: Maybe<BrpDatum>;
};

export type BrpPartnerInOnderzoek = {
  __typename?: 'BrpPartnerInOnderzoek';
  burgerservicenummer?: Maybe<Scalars['Boolean']['output']>;
  datumIngangOnderzoek?: Maybe<BrpDatum>;
  geslacht?: Maybe<Scalars['Boolean']['output']>;
  soortVerbintenis?: Maybe<Scalars['Boolean']['output']>;
};

export type BrpPersoon = {
  __typename?: 'BrpPersoon';
  adressering?: Maybe<BrpAdressering>;
  bewonersAantal?: Maybe<Scalars['Int']['output']>;
  burgerservicenummer: Scalars['String']['output'];
  datumEersteInschrijvingGBA?: Maybe<BrpDatum>;
  datumInschrijvingInGemeente?: Maybe<BrpDatum>;
  europeesKiesrecht?: Maybe<BrpEuropeesKiesrecht>;
  geboorte?: Maybe<BrpDatumLandPlaats>;
  geheimhoudingPersoonsgegevens?: Maybe<Scalars['Boolean']['output']>;
  gemeenteVanInschrijving?: Maybe<BrpCodeOmschrijving>;
  geslacht?: Maybe<BrpCodeOmschrijving>;
  gezag?: Maybe<Array<BrpGezag>>;
  imigratie?: Maybe<BrpImigratie>;
  inOnderzoek?: Maybe<BrpInOnderzoek>;
  indicatieCurateleRegister?: Maybe<Scalars['Boolean']['output']>;
  /**
   * deprecated(
   *  reason: "This value is deprecated and should be removed."
   * )
   */
  indicatieGezagMinderjarige?: Maybe<BrpCodeOmschrijving>;
  kinderen?: Maybe<Array<BrpKind>>;
  leeftijd: Scalars['Int']['output'];
  naam: BrpNaam;
  nationaliteiten: Array<BrpNationaliteit>;
  ouders?: Maybe<Array<BrpOuder>>;
  overlijden?: Maybe<BrpDatumLandPlaats>;
  partners?: Maybe<Array<BrpPartner>>;
  rni?: Maybe<Array<BrpPersoonRni>>;
  uitsluitingKiesrecht?: Maybe<BrpUitsluitingKiesrecht>;
  verblijfplaats?: Maybe<BrpVerblijfplaats>;
  verblijfstitel?: Maybe<BrpVerblijfsTitel>;
  verificatie?: Maybe<BrpPersoonVerificatie>;
};

export type BrpPersoonRni = {
  __typename?: 'BrpPersoonRni';
  categorie?: Maybe<Scalars['String']['output']>;
  deelnemer?: Maybe<BrpCodeOmschrijving>;
  omschrijvingVerdrag?: Maybe<Scalars['String']['output']>;
};

export type BrpPersoonVerificatie = {
  __typename?: 'BrpPersoonVerificatie';
  datum?: Maybe<BrpDatum>;
  omschrijving?: Maybe<Scalars['String']['output']>;
};

export type BrpUitsluitingKiesrecht = {
  __typename?: 'BrpUitsluitingKiesrecht';
  einddatum?: Maybe<BrpDatum>;
  uitgeslotenVanKiesrecht?: Maybe<Scalars['Boolean']['output']>;
};

export type BrpVerblijfplaats = {
  __typename?: 'BrpVerblijfplaats';
  adresseerbaarObjectIdentificatie?: Maybe<Scalars['String']['output']>;
  datumVan?: Maybe<BrpDatum>;
  functieAdres?: Maybe<BrpCodeOmschrijving>;
  inOnderzoek?: Maybe<BrpVerblijfplaatsInOnderzoek>;
  indicatieVastgesteldVerblijftNietOpAdres?: Maybe<Scalars['Boolean']['output']>;
  nummeraanduidingIdentificatie?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  verblijfadres?: Maybe<Brp2Adres>;
};

export type BrpVerblijfplaatsInOnderzoek = {
  __typename?: 'BrpVerblijfplaatsInOnderzoek';
  adresseerbaarObjectIdentificatie?: Maybe<Scalars['Boolean']['output']>;
  datumIngangOnderzoek?: Maybe<BrpDatum>;
  datumVan?: Maybe<Scalars['Boolean']['output']>;
  functieAdres?: Maybe<Scalars['Boolean']['output']>;
  indicatieVastgesteldVerblijftNietOpAdres?: Maybe<Scalars['Boolean']['output']>;
  nummeraanduidingIdentificatie?: Maybe<Scalars['Boolean']['output']>;
  type?: Maybe<Scalars['Boolean']['output']>;
  verblijfplaats?: Maybe<Scalars['Boolean']['output']>;
};

export type BrpVerblijfsTitel = {
  __typename?: 'BrpVerblijfsTitel';
  aanduiding?: Maybe<BrpCodeOmschrijving>;
  datumEinde?: Maybe<BrpDatum>;
  datumIngang?: Maybe<BrpDatum>;
  inOnderzoek?: Maybe<BrpVerblijfsTitelInOnderzoek>;
};

export type BrpVerblijfsTitelInOnderzoek = {
  __typename?: 'BrpVerblijfsTitelInOnderzoek';
  aanduiding?: Maybe<Scalars['Boolean']['output']>;
  datumEinde?: Maybe<Scalars['Boolean']['output']>;
  datumIngang?: Maybe<Scalars['Boolean']['output']>;
  datumIngangOnderzoek?: Maybe<BrpDatum>;
};

export type Categorie = {
  __typename?: 'Categorie';
  naam: Scalars['String']['output'];
  url: Scalars['String']['output'];
  uuid: Scalars['String']['output'];
};

export type CategorieRelatie = {
  __typename?: 'CategorieRelatie';
  beginDatum?: Maybe<Scalars['Date']['output']>;
  categorie?: Maybe<Categorie>;
  eindDatum?: Maybe<Scalars['Date']['output']>;
  partij?: Maybe<OpenKlant2ForeignKey>;
  url: Scalars['String']['output'];
  uuid: Scalars['String']['output'];
};

export type CategorieRelatieForeignKey = {
  __typename?: 'CategorieRelatieForeignKey';
  beginDatum?: Maybe<Scalars['Date']['output']>;
  categorieNaam: Scalars['String']['output'];
  eindDatum?: Maybe<Scalars['Date']['output']>;
  url: Scalars['String']['output'];
  uuid: Scalars['String']['output'];
};

export type ContactenPage = {
  __typename?: 'ContactenPage';
  /**  The elements on this page */
  content: Array<OpenProductContact>;
  /**  The requested page number */
  number: Scalars['Int']['output'];
  /**  The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  /**  The requested page size */
  size: Scalars['Int']['output'];
  /**  The total number of elements */
  totalElements: Scalars['Int']['output'];
  /**  The total number of available pages */
  totalPages: Scalars['Int']['output'];
};

export type Contactnaam = {
  __typename?: 'Contactnaam';
  achternaam?: Maybe<Scalars['String']['output']>;
  voorletters?: Maybe<Scalars['String']['output']>;
  voornaam?: Maybe<Scalars['String']['output']>;
  voorvoegselAchternaam?: Maybe<Scalars['String']['output']>;
};

export type ContactnaamInput = {
  achternaam?: InputMaybe<Scalars['String']['input']>;
  voorletters?: InputMaybe<Scalars['String']['input']>;
  voornaam?: InputMaybe<Scalars['String']['input']>;
  voorvoegselAchternaam?: InputMaybe<Scalars['String']['input']>;
};

export type ContactpersoonIdentificatie = {
  __typename?: 'ContactpersoonIdentificatie';
  contactnaam?: Maybe<Contactnaam>;
  uuid?: Maybe<Scalars['UUID']['output']>;
  volledigeNaam?: Maybe<Scalars['String']['output']>;
  werkteVoorPartij?: Maybe<OpenKlant2ForeignKey>;
};

export type ContactpersoonIdentificatieInput = {
  contactnaam?: InputMaybe<ContactnaamInput>;
  uuid?: InputMaybe<Scalars['UUID']['input']>;
  volledigeNaam?: InputMaybe<Scalars['String']['input']>;
  werkteVoorPartij?: InputMaybe<OpenKlant2ForeignKeyInput>;
};

export type DigitaleAdresRequestInput = {
  omschrijving: Scalars['String']['input'];
  type: DigitaleAdresType;
  uuid?: InputMaybe<Scalars['UUID']['input']>;
  waarde: Scalars['String']['input'];
};

export type DigitaleAdresResponse = {
  __typename?: 'DigitaleAdresResponse';
  omschrijving: Scalars['String']['output'];
  referentie: Scalars['String']['output'];
  type: DigitaleAdresType;
  uuid: Scalars['UUID']['output'];
  waarde: Scalars['String']['output'];
};

export enum DigitaleAdresType {
  Email = 'EMAIL',
  Overig = 'OVERIG',
  Telefoonnummer = 'TELEFOONNUMMER'
}

export type DirectPaymentRequestInput = {
  amount: Scalars['PositiveFloat']['input'];
  identifier: Scalars['String']['input'];
  langId?: InputMaybe<Scalars['String']['input']>;
  orderId: Scalars['String']['input'];
  reference: Scalars['String']['input'];
  returnUrl?: InputMaybe<Scalars['String']['input']>;
};

export type DirectPaymentResponse = {
  __typename?: 'DirectPaymentResponse';
  redirectUrl: Scalars['String']['output'];
};

export type DirectPaymentStatus = {
  __typename?: 'DirectPaymentStatus';
  status?: Maybe<DirectPaymentStatusCategory>;
};

export enum DirectPaymentStatusCategory {
  Rejected = 'REJECTED',
  StatusUnknown = 'STATUS_UNKNOWN',
  Successful = 'SUCCESSFUL'
}

export type Document = {
  __typename?: 'Document';
  bestandsnaam?: Maybe<Scalars['String']['output']>;
  bestandsomvang?: Maybe<Scalars['Int']['output']>;
  creatiedatum?: Maybe<Scalars['String']['output']>;
  documentapi: Scalars['String']['output'];
  formaat?: Maybe<Scalars['String']['output']>;
  identificatie?: Maybe<Scalars['String']['output']>;
  titel?: Maybe<Scalars['String']['output']>;
  uuid: Scalars['UUID']['output'];
};

export type DocumentContent = {
  __typename?: 'DocumentContent';
  content: Scalars['String']['output'];
};

export type Eigenaar = {
  __typename?: 'Eigenaar';
  rechtsvorm: Scalars['String']['output'];
  rsin?: Maybe<Scalars['String']['output']>;
  uitgebreideRechtsvorm: Scalars['String']['output'];
};

export type Embedded = {
  __typename?: 'Embedded';
  eigenaar: Eigenaar;
  hoofdvestiging: Hoofdvestiging;
};

export type FormDefinition = {
  __typename?: 'FormDefinition';
  formDefinition: Scalars['JSON']['output'];
};

export type GemachtigdeV2 = {
  __typename?: 'GemachtigdeV2';
  bedrijf?: Maybe<MaatschappelijkeActiviteit>;
  persoon?: Maybe<BrpPersoon>;
};

export type HadBetrokkenActoren = {
  __typename?: 'HadBetrokkenActoren';
  actoridentificator: OpenKlant2Identificator;
  indicatieActief: Scalars['Boolean']['output'];
  naam: Scalars['String']['output'];
  soortActor: Scalars['String']['output'];
  url: Scalars['String']['output'];
  uuid: Scalars['String']['output'];
};

export type HadKlantcontact = {
  __typename?: 'HadKlantcontact';
  gingOverOnderwerpobjecten: Array<OpenKlant2ForeignKey>;
  hadBetrokkenActoren: Array<HadBetrokkenActoren>;
  hadBetrokkenen: Array<OpenKlant2ForeignKey>;
  indicatieContactGelukt: Scalars['Boolean']['output'];
  inhoud: Scalars['String']['output'];
  kanaal: Scalars['String']['output'];
  leiddeTotInterneTaken: Array<OpenKlant2ForeignKey>;
  nummer: Scalars['String']['output'];
  omvatteBijlagen: Array<OpenKlant2ForeignKey>;
  onderwerp: Scalars['String']['output'];
  plaatsgevondenOp: Scalars['String']['output'];
  taal: Scalars['String']['output'];
  url: Scalars['String']['output'];
  uuid: Scalars['String']['output'];
  vertrouwelijk: Scalars['Boolean']['output'];
};

export type HandelsNaam = {
  __typename?: 'HandelsNaam';
  naam: Scalars['String']['output'];
  volgorde: Scalars['Int']['output'];
};

export type Hoofdvestiging = {
  __typename?: 'Hoofdvestiging';
  adressen?: Maybe<Array<Maybe<Adres>>>;
  eersteHandelsnaam: Scalars['String']['output'];
  indCommercieleVestiging: Scalars['String']['output'];
  indHoofdvestiging: Scalars['String']['output'];
  kvkNummer: Scalars['String']['output'];
  totaalWerkzamePersonen: Scalars['Int']['output'];
  vestigingsnummer: Scalars['String']['output'];
};

export type LinksPage = {
  __typename?: 'LinksPage';
  /**  The elements on this page */
  content: Array<OpenProductLink>;
  /**  The requested page number */
  number: Scalars['Int']['output'];
  /**  The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  /**  The requested page size */
  size: Scalars['Int']['output'];
  /**  The total number of elements */
  totalElements: Scalars['Int']['output'];
  /**  The total number of available pages */
  totalPages: Scalars['Int']['output'];
};

export type LocatiesPage = {
  __typename?: 'LocatiesPage';
  /**  The elements on this page */
  content: Array<OpenProductLocatie>;
  /**  The requested page number */
  number: Scalars['Int']['output'];
  /**  The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  /**  The requested page size */
  size: Scalars['Int']['output'];
  /**  The total number of elements */
  totalElements: Scalars['Int']['output'];
  /**  The total number of available pages */
  totalPages: Scalars['Int']['output'];
};

export type MaatschappelijkeActiviteit = {
  __typename?: 'MaatschappelijkeActiviteit';
  embedded?: Maybe<Embedded>;
  formeleRegistratiedatum?: Maybe<Scalars['String']['output']>;
  handelsnamen?: Maybe<Array<Maybe<HandelsNaam>>>;
  indNonMailing?: Maybe<Scalars['String']['output']>;
  kvkNummer: Scalars['String']['output'];
  materieleRegistratie?: Maybe<MaterieleRegistratie>;
  naam: Scalars['String']['output'];
  sbiActiviteiten?: Maybe<Array<Maybe<SbiActiviteit>>>;
  statutaireNaam: Scalars['String']['output'];
  totaalWerkzamePersonen?: Maybe<Scalars['Int']['output']>;
};

export type MaterieleRegistratie = {
  __typename?: 'MaterieleRegistratie';
  datumAanvang: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /**  Create DigitaleAdres for User */
  createUserDigitaleAdres?: Maybe<DigitaleAdresResponse>;
  /**  Create Partij for user */
  createUserPartij?: Maybe<PartijResponse>;
  /**  Delete DigitaleAdres of User by Id */
  deleteUserDigitaleAdres?: Maybe<Scalars['Boolean']['output']>;
  /**  Do Worldline Direct payment */
  doDirectPayment: DirectPaymentResponse;
  /**  Create Ogone payment with hash and fields */
  generateOgonePayment: OgonePayment;
  /**  Submit a task */
  submitTaakV2: TaakV2;
  /**  Update product */
  updateProduct?: Maybe<OpenProductProduct>;
  /**  Update product verbruiks object */
  updateProductVerbruiksObject: ProductVerbruiksObject;
  /**  Update DigitaleAdres of User */
  updateUserDigitaleAdres?: Maybe<DigitaleAdresResponse>;
  /**  Update user Partij */
  updateUserPartij?: Maybe<PartijResponse>;
};


export type MutationCreateUserDigitaleAdresArgs = {
  digitaleAdresRequest: DigitaleAdresRequestInput;
};


export type MutationCreateUserPartijArgs = {
  partijRequest: PartijRequestInput;
};


export type MutationDeleteUserDigitaleAdresArgs = {
  digitaleAdresId: Scalars['UUID']['input'];
};


export type MutationDoDirectPaymentArgs = {
  paymentRequest: DirectPaymentRequestInput;
};


export type MutationGenerateOgonePaymentArgs = {
  paymentRequest: OgonePaymentRequestInput;
};


export type MutationSubmitTaakV2Args = {
  id: Scalars['UUID']['input'];
  submission: Scalars['JSON']['input'];
};


export type MutationUpdateProductArgs = {
  productUpdateRequest: UpdateProductRequestInput;
};


export type MutationUpdateProductVerbruiksObjectArgs = {
  id: Scalars['UUID']['input'];
  submission: Scalars['JSON']['input'];
};


export type MutationUpdateUserDigitaleAdresArgs = {
  digitaleAdresRequest: DigitaleAdresRequestInput;
};


export type MutationUpdateUserPartijArgs = {
  partijRequest: PartijRequestInput;
};

export type OgoneBetaling = {
  __typename?: 'OgoneBetaling';
  bedrag: Scalars['PositiveFloat']['output'];
  betaalkenmerk: Scalars['String']['output'];
  pspid: Scalars['String']['output'];
};

export type OgonePayment = {
  __typename?: 'OgonePayment';
  formAction: Scalars['String']['output'];
  formFields: Array<PaymentField>;
};

export type OgonePaymentRequestInput = {
  amount: Scalars['PositiveFloat']['input'];
  failureUrl?: InputMaybe<Scalars['String']['input']>;
  langId?: InputMaybe<Scalars['String']['input']>;
  orderId: Scalars['String']['input'];
  pspId: Scalars['String']['input'];
  reference: Scalars['String']['input'];
  successUrl?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export enum OnderwerpObjectIndentificatorType {
  Product = 'PRODUCT',
  Zaak = 'ZAAK'
}

export type OpenKlant2Adres = {
  __typename?: 'OpenKlant2Adres';
  adresregel1?: Maybe<Scalars['String']['output']>;
  adresregel2?: Maybe<Scalars['String']['output']>;
  adresregel3?: Maybe<Scalars['String']['output']>;
  land?: Maybe<OpenKlant2Landcode>;
  nummeraanduidingId?: Maybe<Scalars['String']['output']>;
};

export type OpenKlant2DigitaleAdres = {
  __typename?: 'OpenKlant2DigitaleAdres';
  adres: Scalars['String']['output'];
  omschrijving: Scalars['String']['output'];
  referentie?: Maybe<Scalars['String']['output']>;
  soortDigitaalAdres: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['UUID']['output']>;
  verstrektDoorBetrokkene?: Maybe<OpenKlant2Uuid>;
  verstrektDoorPartij?: Maybe<OpenKlant2Uuid>;
};

export type OpenKlant2ForeignKey = {
  __typename?: 'OpenKlant2ForeignKey';
  url: Scalars['String']['output'];
  uuid: Scalars['UUID']['output'];
};

export type OpenKlant2ForeignKeyInput = {
  url: Scalars['String']['input'];
  uuid: Scalars['UUID']['input'];
};

export type OpenKlant2Identificator = {
  __typename?: 'OpenKlant2Identificator';
  codeObjecttype: Scalars['String']['output'];
  codeRegister: Scalars['String']['output'];
  codeSoortObjectId: Scalars['String']['output'];
  objectId: Scalars['String']['output'];
};

export type OpenKlant2IdentificeerdePartij = {
  __typename?: 'OpenKlant2IdentificeerdePartij';
  uuid: Scalars['UUID']['output'];
};

export type OpenKlant2Klantcontact = {
  __typename?: 'OpenKlant2Klantcontact';
  gingOverOnderwerpobjecten: Array<OpenKlant2ForeignKey>;
  hadBetrokkenActoren: Array<HadBetrokkenActoren>;
  hadBetrokkenen: Array<OpenKlant2ForeignKey>;
  indicatieContactGelukt: Scalars['Boolean']['output'];
  inhoud: Scalars['String']['output'];
  kanaal: Scalars['String']['output'];
  leiddeTotInterneTaken: Array<OpenKlant2ForeignKey>;
  nummer: Scalars['String']['output'];
  omvatteBijlagen: Array<OpenKlant2ForeignKey>;
  onderwerp: Scalars['String']['output'];
  plaatsgevondenOp: Scalars['String']['output'];
  taal: Scalars['String']['output'];
  url: Scalars['String']['output'];
  uuid: Scalars['String']['output'];
  vertrouwelijk: Scalars['Boolean']['output'];
};

export enum OpenKlant2Landcode {
  Abessinie = 'ABESSINIE',
  AbuDhabi = 'ABU_DHABI',
  Aden = 'ADEN',
  Afghanistan = 'AFGHANISTAN',
  Ajman = 'AJMAN',
  Albanie = 'ALBANIE',
  Algerije = 'ALGERIJE',
  AmerikaanseMaagdeneilanden = 'AMERIKAANSE_MAAGDENEILANDEN',
  Amerikaanssamoa = 'AMERIKAANSSAMOA',
  Andorra = 'ANDORRA',
  Angola = 'ANGOLA',
  Anguilla = 'ANGUILLA',
  Antigua = 'ANTIGUA',
  AntiguaEnBarbuda = 'ANTIGUA_EN_BARBUDA',
  Argentinie = 'ARGENTINIE',
  Armenie = 'ARMENIE',
  Aruba = 'ARUBA',
  Ascension = 'ASCENSION',
  Australie = 'AUSTRALIE',
  AustralischeSalomonseilanden = 'AUSTRALISCHE_SALOMONSEILANDEN',
  AustralischNieuwguinea = 'AUSTRALISCH_NIEUWGUINEA',
  Azerbeidzjan = 'AZERBEIDZJAN',
  Azoren = 'AZOREN',
  Bahamas = 'BAHAMAS',
  Bahrein = 'BAHREIN',
  Bangladesh = 'BANGLADESH',
  Barbados = 'BARBADOS',
  Basutoland = 'BASUTOLAND',
  Bechuanaland = 'BECHUANALAND',
  Belarus = 'BELARUS',
  Belau = 'BELAU',
  Belgie = 'BELGIE',
  Belgischcongo = 'BELGISCHCONGO',
  Belize = 'BELIZE',
  Benin = 'BENIN',
  Bermuda = 'BERMUDA',
  Bhutan = 'BHUTAN',
  Bolivia = 'BOLIVIA',
  Bonaire = 'BONAIRE',
  BondsrepubliekDuitsland = 'BONDSREPUBLIEK_DUITSLAND',
  Bosnieherzegovina = 'BOSNIEHERZEGOVINA',
  Botswana = 'BOTSWANA',
  Brazilie = 'BRAZILIE',
  Britsafrika = 'BRITSAFRIKA',
  Britsborneo = 'BRITSBORNEO',
  BritseAntillen = 'BRITSE_ANTILLEN',
  BritseMaagdeneilanden = 'BRITSE_MAAGDENEILANDEN',
  BritseSalomonseilanden = 'BRITSE_SALOMONSEILANDEN',
  Britsguyana = 'BRITSGUYANA',
  Britshonduras = 'BRITSHONDURAS',
  Britsindie = 'BRITSINDIE',
  Britskameroen = 'BRITSKAMEROEN',
  Britssomaliland = 'BRITSSOMALILAND',
  BritsAntarctischTerritorium = 'BRITS_ANTARCTISCH_TERRITORIUM',
  BritsIndischeOceaanterritorium = 'BRITS_INDISCHE_OCEAANTERRITORIUM',
  BritsNoordborneo = 'BRITS_NOORDBORNEO',
  BritsOostafrika = 'BRITS_OOSTAFRIKA',
  BritsWestborneo = 'BRITS_WESTBORNEO',
  BritsWestindie = 'BRITS_WESTINDIE',
  Brunei = 'BRUNEI',
  Bulgarije = 'BULGARIJE',
  BurkinaFaso = 'BURKINA_FASO',
  Burma = 'BURMA',
  Burundi = 'BURUNDI',
  Cabinda = 'CABINDA',
  Caicoseilanden = 'CAICOSEILANDEN',
  Cambodja = 'CAMBODJA',
  Canada = 'CANADA',
  CanarischeEilanden = 'CANARISCHE_EILANDEN',
  CantonEnEnderbury = 'CANTON_EN_ENDERBURY',
  Caymaneilanden = 'CAYMANEILANDEN',
  CentraalafrikaanseRepubliek = 'CENTRAALAFRIKAANSE_REPUBLIEK',
  Ceylon = 'CEYLON',
  Chili = 'CHILI',
  China = 'CHINA',
  Christmaseiland = 'CHRISTMASEILAND',
  Cocoseilanden = 'COCOSEILANDEN',
  Colombia = 'COLOMBIA',
  Comoren = 'COMOREN',
  Congo = 'CONGO',
  Congobrazzaville = 'CONGOBRAZZAVILLE',
  Congokinshasa = 'CONGOKINSHASA',
  Cookeilanden = 'COOKEILANDEN',
  CostaRica = 'COSTA_RICA',
  Cuba = 'CUBA',
  Curacao = 'CURACAO',
  Cyprus = 'CYPRUS',
  Dahomey = 'DAHOMEY',
  Dantzig = 'DANTZIG',
  DemocratischeRepubliekCongo = 'DEMOCRATISCHE_REPUBLIEK_CONGO',
  Denemarken = 'DENEMARKEN',
  Djibouti = 'DJIBOUTI',
  Dominica = 'DOMINICA',
  DominicaanseRepubliek = 'DOMINICAANSE_REPUBLIEK',
  Dubai = 'DUBAI',
  DuitseDemocratischeRepubliek = 'DUITSE_DEMOCRATISCHE_REPUBLIEK',
  Duitsland = 'DUITSLAND',
  DuitsOostafrika = 'DUITS_OOSTAFRIKA',
  DuitsZuidwestafrika = 'DUITS_ZUIDWESTAFRIKA',
  Ecuador = 'ECUADOR',
  Egypte = 'EGYPTE',
  ElSalvador = 'EL_SALVADOR',
  Equatoriaalguinea = 'EQUATORIAALGUINEA',
  Eritrea = 'ERITREA',
  Estland = 'ESTLAND',
  Eswatini = 'ESWATINI',
  Ethiopie = 'ETHIOPIE',
  Faeroer = 'FAEROER',
  Falklandeilanden = 'FALKLANDEILANDEN',
  FederaleRepubliekJoegoslavie = 'FEDERALE_REPUBLIEK_JOEGOSLAVIE',
  Fiji = 'FIJI',
  Filipijnen = 'FILIPIJNEN',
  Finland = 'FINLAND',
  Frankrijk = 'FRANKRIJK',
  Franscongo = 'FRANSCONGO',
  Fransguyana = 'FRANSGUYANA',
  Fransindie = 'FRANSINDIE',
  Franskameroen = 'FRANSKAMEROEN',
  Franspolynesie = 'FRANSPOLYNESIE',
  Franssomaliland = 'FRANSSOMALILAND',
  FransEquatoriaalafrika = 'FRANS_EQUATORIAALAFRIKA',
  FransIndochina = 'FRANS_INDOCHINA',
  FransTerritoriumVoorAfarsEnIssas = 'FRANS_TERRITORIUM_VOOR_AFARS_EN_ISSAS',
  FransWestafrika = 'FRANS_WESTAFRIKA',
  Fujairah = 'FUJAIRAH',
  Gabon = 'GABON',
  Gambia = 'GAMBIA',
  GazastrookEnWestelijkeJordaanoever = 'GAZASTROOK_EN_WESTELIJKE_JORDAANOEVER',
  Georgie = 'GEORGIE',
  Ghana = 'GHANA',
  Gibraltar = 'GIBRALTAR',
  Gilberteilanden = 'GILBERTEILANDEN',
  GilbertEnElliceeilanden = 'GILBERT_EN_ELLICEEILANDEN',
  Goa = 'GOA',
  Goudkust = 'GOUDKUST',
  Grenada = 'GRENADA',
  Griekenland = 'GRIEKENLAND',
  Groenland = 'GROENLAND',
  Guadeloupe = 'GUADELOUPE',
  Guam = 'GUAM',
  Guatemala = 'GUATEMALA',
  Guinee = 'GUINEE',
  Guineebissau = 'GUINEEBISSAU',
  Guyana = 'GUYANA',
  Haiti = 'HAITI',
  Hawaiieilanden = 'HAWAIIEILANDEN',
  Honduras = 'HONDURAS',
  Hongarije = 'HONGARIJE',
  Hongkong = 'HONGKONG',
  Ierland = 'IERLAND',
  Ifni = 'IFNI',
  Ijsland = 'IJSLAND',
  India = 'INDIA',
  Indochina = 'INDOCHINA',
  Indonesie = 'INDONESIE',
  InternationaalGebied = 'INTERNATIONAAL_GEBIED',
  Irak = 'IRAK',
  Iran = 'IRAN',
  Israel = 'ISRAEL',
  Italiaanssomaliland = 'ITALIAANSSOMALILAND',
  Italie = 'ITALIE',
  Ivoorkust = 'IVOORKUST',
  Jamaica = 'JAMAICA',
  Japan = 'JAPAN',
  Jemen = 'JEMEN',
  Joegoslavie = 'JOEGOSLAVIE',
  Johnston = 'JOHNSTON',
  Johore = 'JOHORE',
  Jordanie = 'JORDANIE',
  Kaapverdie = 'KAAPVERDIE',
  KaapverdischeEilanden = 'KAAPVERDISCHE_EILANDEN',
  Kameroen = 'KAMEROEN',
  Kanaaleilanden = 'KANAALEILANDEN',
  Kashmir = 'KASHMIR',
  Kazachstan = 'KAZACHSTAN',
  Kedah = 'KEDAH',
  KeizerWilhelmsland = 'KEIZER_WILHELMSLAND',
  Kelantan = 'KELANTAN',
  Kenya = 'KENYA',
  Kirgizie = 'KIRGIZIE',
  Kiribati = 'KIRIBATI',
  Koeweit = 'KOEWEIT',
  Korea = 'KOREA',
  Kosovo = 'KOSOVO',
  Kroatie = 'KROATIE',
  Labuan = 'LABUAN',
  Laos = 'LAOS',
  Leewardeilanden = 'LEEWARDEILANDEN',
  Lesotho = 'LESOTHO',
  Letland = 'LETLAND',
  Libanon = 'LIBANON',
  Liberia = 'LIBERIA',
  Libie = 'LIBIE',
  Liechtenstein = 'LIECHTENSTEIN',
  Litouwen = 'LITOUWEN',
  Luxemburg = 'LUXEMBURG',
  Macau = 'MACAU',
  Macedonie = 'MACEDONIE',
  Madagaskar = 'MADAGASKAR',
  Madeiraeilanden = 'MADEIRAEILANDEN',
  Malakka = 'MALAKKA',
  Malawi = 'MALAWI',
  Maldiven = 'MALDIVEN',
  Maleisie = 'MALEISIE',
  Mali = 'MALI',
  Malta = 'MALTA',
  Man = 'MAN',
  Marianen = 'MARIANEN',
  Marokko = 'MAROKKO',
  Marshalleilanden = 'MARSHALLEILANDEN',
  Martinique = 'MARTINIQUE',
  Mauritanie = 'MAURITANIE',
  Mauritius = 'MAURITIUS',
  Mayotte = 'MAYOTTE',
  Mexico = 'MEXICO',
  Micronesia = 'MICRONESIA',
  Midway = 'MIDWAY',
  Moldavie = 'MOLDAVIE',
  Monaco = 'MONACO',
  Mongolie = 'MONGOLIE',
  Montenegro = 'MONTENEGRO',
  Montserrat = 'MONTSERRAT',
  Mozambique = 'MOZAMBIQUE',
  MuscatEnOman = 'MUSCAT_EN_OMAN',
  Myanmar = 'MYANMAR',
  Namibie = 'NAMIBIE',
  Nauru = 'NAURU',
  Nederland = 'NEDERLAND',
  NederlandseAntillen = 'NEDERLANDSE_ANTILLEN',
  Nederlandsindie = 'NEDERLANDSINDIE',
  NederlandsNieuwguinea = 'NEDERLANDS_NIEUWGUINEA',
  NegriSembilan = 'NEGRI_SEMBILAN',
  Nepal = 'NEPAL',
  Newfoundland = 'NEWFOUNDLAND',
  Nicaragua = 'NICARAGUA',
  Nieuwcaledonie = 'NIEUWCALEDONIE',
  NieuweHebriden = 'NIEUWE_HEBRIDEN',
  Nieuwzeeland = 'NIEUWZEELAND',
  Niger = 'NIGER',
  Nigeria = 'NIGERIA',
  Niue = 'NIUE',
  None = 'NONE',
  Noordjemen = 'NOORDJEMEN',
  Noordkorea = 'NOORDKOREA',
  Noordrhodesie = 'NOORDRHODESIE',
  Noordvietnam = 'NOORDVIETNAM',
  Noorwegen = 'NOORWEGEN',
  Norfolk = 'NORFOLK',
  Nyasaland = 'NYASALAND',
  Oekraine = 'OEKRAINE',
  Oezbekistan = 'OEZBEKISTAN',
  Oman = 'OMAN',
  Oostenrijk = 'OOSTENRIJK',
  Oostenrijkhongarije = 'OOSTENRIJKHONGARIJE',
  Oppervolta = 'OPPERVOLTA',
  Pacificeilanden = 'PACIFICEILANDEN',
  Pahang = 'PAHANG',
  Pakistan = 'PAKISTAN',
  Palau = 'PALAU',
  Palestina = 'PALESTINA',
  Panama = 'PANAMA',
  Panamakanaalzone = 'PANAMAKANAALZONE',
  Papoeanieuwguinea = 'PAPOEANIEUWGUINEA',
  Paraguay = 'PARAGUAY',
  Perak = 'PERAK',
  Perlis = 'PERLIS',
  Peru = 'PERU',
  Phoenixeilanden = 'PHOENIXEILANDEN',
  Pitcairneilanden = 'PITCAIRNEILANDEN',
  Polen = 'POLEN',
  Portugal = 'PORTUGAL',
  Portugeesafrika = 'PORTUGEESAFRIKA',
  Portugeesguinee = 'PORTUGEESGUINEE',
  Portugeesindie = 'PORTUGEESINDIE',
  Portugeestimor = 'PORTUGEESTIMOR',
  PortugeesOostafrika = 'PORTUGEES_OOSTAFRIKA',
  PortugeesWestafrika = 'PORTUGEES_WESTAFRIKA',
  PuertoRico = 'PUERTO_RICO',
  Qatar = 'QATAR',
  RasAlkhaimah = 'RAS_ALKHAIMAH',
  RepubliekNoordmacedonie = 'REPUBLIEK_NOORDMACEDONIE',
  Reunion = 'REUNION',
  Rhodesie = 'RHODESIE',
  Riukiueilanden = 'RIUKIUEILANDEN',
  Roemenie = 'ROEMENIE',
  Ruandaurundi = 'RUANDAURUNDI',
  Rusland = 'RUSLAND',
  RuslandOud = 'RUSLAND_OUD',
  Rwanda = 'RWANDA',
  Saarland = 'SAARLAND',
  Saba = 'SABA',
  Sabah = 'SABAH',
  SaintKittsEnNevis = 'SAINT_KITTS_EN_NEVIS',
  SaintKittsNevisEnAnguilla = 'SAINT_KITTS_NEVIS_EN_ANGUILLA',
  SaintLucia = 'SAINT_LUCIA',
  SaintPierreEnMiquelon = 'SAINT_PIERRE_EN_MIQUELON',
  SaintVincent = 'SAINT_VINCENT',
  SaintVincentEnDeGrenadines = 'SAINT_VINCENT_EN_DE_GRENADINES',
  Salomonseilanden = 'SALOMONSEILANDEN',
  Samoa = 'SAMOA',
  SanMarino = 'SAN_MARINO',
  Saoediarabie = 'SAOEDIARABIE',
  SaoTomeEnPrincipe = 'SAO_TOME_EN_PRINCIPE',
  Sarawak = 'SARAWAK',
  Selangor = 'SELANGOR',
  Senegal = 'SENEGAL',
  Servie = 'SERVIE',
  ServieEnMontenegro = 'SERVIE_EN_MONTENEGRO',
  Seychellen = 'SEYCHELLEN',
  SeychellenEnAmiranten = 'SEYCHELLEN_EN_AMIRANTEN',
  Sharjah = 'SHARJAH',
  Siam = 'SIAM',
  SierraLeone = 'SIERRA_LEONE',
  Sikkim = 'SIKKIM',
  Singapore = 'SINGAPORE',
  Sinthelena = 'SINTHELENA',
  SintEustatius = 'SINT_EUSTATIUS',
  SintMaarten = 'SINT_MAARTEN',
  Slovenie = 'SLOVENIE',
  Slowakije = 'SLOWAKIJE',
  Soedan = 'SOEDAN',
  Somalie = 'SOMALIE',
  Sovjetunie = 'SOVJETUNIE',
  SpaanseSahara = 'SPAANSE_SAHARA',
  Spaansguinee = 'SPAANSGUINEE',
  SpaansNoordafrika = 'SPAANS_NOORDAFRIKA',
  Spanje = 'SPANJE',
  Spitsbergen = 'SPITSBERGEN',
  SriLanka = 'SRI_LANKA',
  StraitsSettlements = 'STRAITS_SETTLEMENTS',
  Suriname = 'SURINAME',
  Svalbardeilanden = 'SVALBARDEILANDEN',
  Swaziland = 'SWAZILAND',
  Syrie = 'SYRIE',
  Tadzjikistan = 'TADZJIKISTAN',
  Taiwan = 'TAIWAN',
  Tanganyika = 'TANGANYIKA',
  Tanzania = 'TANZANIA',
  Tasmanie = 'TASMANIE',
  Thailand = 'THAILAND',
  Tibet = 'TIBET',
  TimorLeste = 'TIMOR_LESTE',
  Togo = 'TOGO',
  Tokelau = 'TOKELAU',
  Tonga = 'TONGA',
  Transjordanie = 'TRANSJORDANIE',
  Trengganu = 'TRENGGANU',
  TrinidadEnTobago = 'TRINIDAD_EN_TOBAGO',
  TristanDaCunha = 'TRISTAN_DA_CUNHA',
  TrucialOman = 'TRUCIAL_OMAN',
  Tsjaad = 'TSJAAD',
  Tsjechie = 'TSJECHIE',
  Tsjechoslowakije = 'TSJECHOSLOWAKIJE',
  Tunesie = 'TUNESIE',
  Turkije = 'TURKIJE',
  Turkmenistan = 'TURKMENISTAN',
  Turkseilanden = 'TURKSEILANDEN',
  TurksEnCaicoseilanden = 'TURKS_EN_CAICOSEILANDEN',
  Tuvalu = 'TUVALU',
  Uganda = 'UGANDA',
  UmmAlqaiwain = 'UMM_ALQAIWAIN',
  Uruguay = 'URUGUAY',
  Urundi = 'URUNDI',
  Vanuatu = 'VANUATU',
  Vaticaanstad = 'VATICAANSTAD',
  Venezuela = 'VENEZUELA',
  VerenigdeArabischeEmiraten = 'VERENIGDE_ARABISCHE_EMIRATEN',
  VerenigdeArabischeRepubliek = 'VERENIGDE_ARABISCHE_REPUBLIEK',
  VerenigdeStatenVanAmerika = 'VERENIGDE_STATEN_VAN_AMERIKA',
  VerenigdKoninkrijk = 'VERENIGD_KONINKRIJK',
  Vietnam = 'VIETNAM',
  Wake = 'WAKE',
  WallisEnFutuna = 'WALLIS_EN_FUTUNA',
  WestelijkeSahara = 'WESTELIJKE_SAHARA',
  Westsamoa = 'WESTSAMOA',
  Windwardeilanden = 'WINDWARDEILANDEN',
  Zaire = 'ZAIRE',
  Zambia = 'ZAMBIA',
  Zanzibar = 'ZANZIBAR',
  Zimbabwe = 'ZIMBABWE',
  Zuidafrika = 'ZUIDAFRIKA',
  ZuidarabischeFederatie = 'ZUIDARABISCHE_FEDERATIE',
  Zuidjemen = 'ZUIDJEMEN',
  Zuidkorea = 'ZUIDKOREA',
  Zuidrhodesie = 'ZUIDRHODESIE',
  Zuidsoedan = 'ZUIDSOEDAN',
  Zuidvietnam = 'ZUIDVIETNAM',
  Zuidwestafrika = 'ZUIDWESTAFRIKA',
  Zweden = 'ZWEDEN',
  Zwitserland = 'ZWITSERLAND'
}

/**  A Type that represents a Klantinteracties API Partij object */
export type OpenKlant2Partij = {
  __typename?: 'OpenKlant2Partij';
  betrokkenen?: Maybe<Array<OpenKlant2ForeignKey>>;
  bezoekadres?: Maybe<OpenKlant2Adres>;
  categorieRelaties?: Maybe<Array<CategorieRelatieForeignKey>>;
  correspondentieadres?: Maybe<OpenKlant2Adres>;
  digitaleAdressen?: Maybe<Array<OpenKlant2ForeignKey>>;
  expand?: Maybe<PartijExpand>;
  indicatieActief: Scalars['Boolean']['output'];
  indicatieGeheimhouding?: Maybe<Scalars['Boolean']['output']>;
  interneNotitie?: Maybe<Scalars['String']['output']>;
  nummer?: Maybe<Scalars['String']['output']>;
  partijIdentificatie: PartijIdentificatie;
  partijIdentificatoren?: Maybe<Array<OpenKlant2PartijIdentificator>>;
  rekeningnummers?: Maybe<Array<OpenKlant2ForeignKey>>;
  soortPartij: SoortPartij;
  url?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['UUID']['output']>;
  vertegenwoordigden?: Maybe<Array<OpenKlant2ForeignKey>>;
  voorkeursDigitaalAdres?: Maybe<OpenKlant2ForeignKey>;
  voorkeursRekeningnummer?: Maybe<OpenKlant2ForeignKey>;
  voorkeurstaal?: Maybe<Scalars['String']['output']>;
};

export type OpenKlant2PartijIdentificator = {
  __typename?: 'OpenKlant2PartijIdentificator';
  anderePartijIdentificator?: Maybe<Scalars['String']['output']>;
  identificeerdePartij?: Maybe<OpenKlant2IdentificeerdePartij>;
  partijIdentificator?: Maybe<OpenKlant2Identificator>;
  subIdentificatorVan?: Maybe<OpenKlant2SubIdentificatorVan>;
  url?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['UUID']['output']>;
};

export type OpenKlant2SubIdentificatorVan = {
  __typename?: 'OpenKlant2SubIdentificatorVan';
  uuid: Scalars['UUID']['output'];
};

export type OpenKlant2Uuid = {
  __typename?: 'OpenKlant2UUID';
  uuid: Scalars['UUID']['output'];
};

export type OpenProductActie = {
  __typename?: 'OpenProductActie';
  naam: Scalars['String']['output'];
  productTypeUuid?: Maybe<Scalars['UUID']['output']>;
  uuid: Scalars['UUID']['output'];
};

export type OpenProductBestand = {
  __typename?: 'OpenProductBestand';
  bestand: Scalars['String']['output'];
  productTypeUuid: Scalars['UUID']['output'];
  uuid: Scalars['UUID']['output'];
};

export type OpenProductContact = {
  __typename?: 'OpenProductContact';
  email?: Maybe<Scalars['String']['output']>;
  huisnummer?: Maybe<Scalars['String']['output']>;
  naam: Scalars['String']['output'];
  organisatie?: Maybe<OpenProductOrganisatie>;
  postcode?: Maybe<Scalars['String']['output']>;
  stad?: Maybe<Scalars['String']['output']>;
  straat?: Maybe<Scalars['String']['output']>;
  telefoonnummer?: Maybe<Scalars['String']['output']>;
  uuid: Scalars['UUID']['output'];
};

export enum OpenProductFrequentie {
  Actief = 'ACTIEF',
  Gereed = 'GEREED',
  Ingetrokken = 'INGETROKKEN'
}

export type OpenProductLink = {
  __typename?: 'OpenProductLink';
  naam: Scalars['String']['output'];
  url: Scalars['String']['output'];
  uuid: Scalars['UUID']['output'];
};

export type OpenProductLocatie = {
  __typename?: 'OpenProductLocatie';
  email?: Maybe<Scalars['String']['output']>;
  huisnummer?: Maybe<Scalars['String']['output']>;
  naam: Scalars['String']['output'];
  postcode?: Maybe<Scalars['String']['output']>;
  stad?: Maybe<Scalars['String']['output']>;
  straat?: Maybe<Scalars['String']['output']>;
  telefoonnummer?: Maybe<Scalars['String']['output']>;
  uuid: Scalars['UUID']['output'];
};

export type OpenProductOrganisatie = {
  __typename?: 'OpenProductOrganisatie';
  code: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  huisnummer?: Maybe<Scalars['String']['output']>;
  naam: Scalars['String']['output'];
  postcode?: Maybe<Scalars['String']['output']>;
  stad?: Maybe<Scalars['String']['output']>;
  straat?: Maybe<Scalars['String']['output']>;
  telefoonnummer?: Maybe<Scalars['String']['output']>;
  uuid: Scalars['UUID']['output'];
};

export type OpenProductPrijs = {
  __typename?: 'OpenProductPrijs';
  actiefVanaf: Scalars['Date']['output'];
  prijsopties: Array<OpenProductPrijsOptie>;
  prijsregels: Array<OpenProductPrijsRegel>;
  uuid: Scalars['UUID']['output'];
};

export type OpenProductPrijsOptie = {
  __typename?: 'OpenProductPrijsOptie';
  bedrag: Scalars['PositiveFloat']['output'];
  beschrijving: Scalars['String']['output'];
  uuid: Scalars['UUID']['output'];
};

export type OpenProductPrijsRegel = {
  __typename?: 'OpenProductPrijsRegel';
  beschrijving: Scalars['String']['output'];
  url: Scalars['String']['output'];
  uuid: Scalars['UUID']['output'];
};

export type OpenProductProduct = {
  __typename?: 'OpenProductProduct';
  aanmaakDatum: Scalars['ZonedDateTime']['output'];
  acties?: Maybe<Array<OpenProductActie>>;
  dataobject?: Maybe<Scalars['JSON']['output']>;
  decisions: Array<Scalars['JSON']['output']>;
  documenten: Array<OpenProductUrl>;
  eindDatum?: Maybe<Scalars['Date']['output']>;
  frequentie: OpenProductFrequentie;
  gepubliceerd?: Maybe<Scalars['Boolean']['output']>;
  naam: Scalars['String']['output'];
  prijs?: Maybe<Scalars['Float']['output']>;
  producttype: OpenProductProductProductType;
  startDatum?: Maybe<Scalars['Date']['output']>;
  status: OpenProductToegestaneStatus;
  taken?: Maybe<Array<TaakV2>>;
  updateDatum: Scalars['ZonedDateTime']['output'];
  url?: Maybe<Scalars['String']['output']>;
  uuid: Scalars['UUID']['output'];
  verbruiksobject?: Maybe<Scalars['JSON']['output']>;
  zaken?: Maybe<Array<Zaak>>;
};

export type OpenProductProductProductType = {
  __typename?: 'OpenProductProductProductType';
  aanmaakDatum: Scalars['ZonedDateTime']['output'];
  code: Scalars['String']['output'];
  gepubliceerd?: Maybe<Scalars['Boolean']['output']>;
  keywords: Array<Scalars['String']['output']>;
  toegestaneStatussen: Array<OpenProductToegestaneStatus>;
  uniformeProductNaam: Scalars['String']['output'];
  updateDatum: Scalars['ZonedDateTime']['output'];
  uuid: Scalars['UUID']['output'];
};

export type OpenProductProductType = {
  __typename?: 'OpenProductProductType';
  aanmaakDatum: Scalars['ZonedDateTime']['output'];
  acties: Array<OpenProductActie>;
  bestanden: Array<OpenProductProductTypeBestand>;
  code: Scalars['String']['output'];
  contacten: Array<OpenProductContact>;
  content?: Maybe<Array<OpenProductProductTypeContent>>;
  dataObjectSchema?: Maybe<OpenProductSchema>;
  externCodes: Array<OpenProductProductTypeExterneCode>;
  gepubliceerd?: Maybe<Scalars['Boolean']['output']>;
  interneOpmerking?: Maybe<Scalars['String']['output']>;
  keywords: Array<Scalars['String']['output']>;
  links: Array<OpenProductLink>;
  locaties: Array<OpenProductLocatie>;
  naam: Scalars['String']['output'];
  organisaties: Array<OpenProductOrganisatie>;
  parameters: Array<OpenProductProductTypeParameter>;
  prijzen: Array<OpenProductPrijs>;
  processen: Array<OpenProductUrl>;
  samenvatting: Scalars['String']['output'];
  taal: Scalars['String']['output'];
  themas: Array<OpenProductProductTypeThema>;
  toegestaneStatussen: Array<OpenProductToegestaneStatus>;
  uniformeProductNaam: Scalars['String']['output'];
  updateDatum: Scalars['ZonedDateTime']['output'];
  uuid: Scalars['UUID']['output'];
  verbruiksObjectSchema?: Maybe<OpenProductSchema>;
  verzoektypen: Array<OpenProductUrl>;
  zaaktypen: Array<OpenProductUrl>;
};

export type OpenProductProductTypeBestand = {
  __typename?: 'OpenProductProductTypeBestand';
  bestand: Scalars['String']['output'];
  uuid: Scalars['UUID']['output'];
};

export type OpenProductProductTypeContent = {
  __typename?: 'OpenProductProductTypeContent';
  content: Scalars['String']['output'];
  labels?: Maybe<Array<Scalars['String']['output']>>;
  taal: Scalars['String']['output'];
  uuid: Scalars['UUID']['output'];
};

export type OpenProductProductTypeExterneCode = {
  __typename?: 'OpenProductProductTypeExterneCode';
  code: Scalars['String']['output'];
  naam: Scalars['String']['output'];
};

export type OpenProductProductTypeParameter = {
  __typename?: 'OpenProductProductTypeParameter';
  naam: Scalars['String']['output'];
  waarde: Scalars['String']['output'];
};

export type OpenProductProductTypeThema = {
  __typename?: 'OpenProductProductTypeThema';
  aanmaakDatum: Scalars['ZonedDateTime']['output'];
  beschrijving?: Maybe<Scalars['String']['output']>;
  gepubliceerd?: Maybe<Scalars['Boolean']['output']>;
  hoofdThema?: Maybe<Scalars['String']['output']>;
  naam: Scalars['String']['output'];
  producttypen: Array<OpenProductThemaProductType>;
  updateDatum: Scalars['ZonedDateTime']['output'];
  uuid: Scalars['UUID']['output'];
};

export type OpenProductSchema = {
  __typename?: 'OpenProductSchema';
  naam: Scalars['String']['output'];
  schema: Scalars['JSON']['output'];
};

export type OpenProductThema = {
  __typename?: 'OpenProductThema';
  aanmaakDatum: Scalars['ZonedDateTime']['output'];
  beschrijving?: Maybe<Scalars['String']['output']>;
  gepubliceerd?: Maybe<Scalars['Boolean']['output']>;
  /**  UUID of the hoofdthema, which this thema is related to. */
  hoofdThema?: Maybe<Scalars['UUID']['output']>;
  naam: Scalars['String']['output'];
  producten?: Maybe<Array<OpenProductProduct>>;
  producttypen: Array<OpenProductThemaProductType>;
  taken?: Maybe<Array<TaakV2>>;
  updateDatum: Scalars['ZonedDateTime']['output'];
  uuid: Scalars['UUID']['output'];
  zaken?: Maybe<Array<Zaak>>;
};

export type OpenProductThemaHierarchy = {
  __typename?: 'OpenProductThemaHierarchy';
  subThemas?: Maybe<Array<OpenProductThemaHierarchy>>;
  thema: OpenProductThema;
};

export type OpenProductThemaProductType = {
  __typename?: 'OpenProductThemaProductType';
  aanmaakDatum: Scalars['ZonedDateTime']['output'];
  code: Scalars['String']['output'];
  gepubliceerd?: Maybe<Scalars['Boolean']['output']>;
  keywords: Array<Scalars['String']['output']>;
  toegestaneStatussen: Array<OpenProductToegestaneStatus>;
  uniformeProductNaam: Scalars['String']['output'];
  updateDatum: Scalars['ZonedDateTime']['output'];
  uuid: Scalars['UUID']['output'];
};

export enum OpenProductToegestaneStatus {
  Actief = 'ACTIEF',
  Gereed = 'GEREED',
  Geweigerd = 'GEWEIGERD',
  Ingetrokken = 'INGETROKKEN',
  Initieel = 'INITIEEL',
  InAanvraag = 'IN_AANVRAAG',
  Verlopen = 'VERLOPEN'
}

export type OpenProductUrl = {
  __typename?: 'OpenProductUrl';
  url: Scalars['String']['output'];
};

export type OrganisatieIdentificatie = {
  __typename?: 'OrganisatieIdentificatie';
  naam?: Maybe<Scalars['String']['output']>;
};

export type OrganisatieIdentificatieInput = {
  naam?: InputMaybe<Scalars['String']['input']>;
};

export type OrganisatiesPage = {
  __typename?: 'OrganisatiesPage';
  /**  The elements on this page */
  content: Array<OpenProductOrganisatie>;
  /**  The requested page number */
  number: Scalars['Int']['output'];
  /**  The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  /**  The requested page size */
  size: Scalars['Int']['output'];
  /**  The total number of elements */
  totalElements: Scalars['Int']['output'];
  /**  The total number of available pages */
  totalPages: Scalars['Int']['output'];
};

export type PartijExpand = {
  __typename?: 'PartijExpand';
  betrokkenen?: Maybe<Array<Betrokkene>>;
  categorieRelaties?: Maybe<Array<CategorieRelatie>>;
  digitaleAdressen?: Maybe<Array<OpenKlant2DigitaleAdres>>;
  hadKlantcontact?: Maybe<Array<HadKlantcontact>>;
};

export type PartijIdentificatie = ContactpersoonIdentificatie | OrganisatieIdentificatie | PersoonsIdentificatie;

export type PartijRequestInput = {
  contactpersoonIdentificatie?: InputMaybe<ContactpersoonIdentificatieInput>;
  indicatieActief: Scalars['Boolean']['input'];
  indicatieGeheimhouding: Scalars['Boolean']['input'];
  organisatieIdentificatie?: InputMaybe<OrganisatieIdentificatieInput>;
  persoonsIdentificatie?: InputMaybe<PersoonsIdentificatieInput>;
  type: PartijType;
};

export type PartijResponse = {
  __typename?: 'PartijResponse';
  contactpersoonIdentificatie?: Maybe<ContactpersoonIdentificatie>;
  digitaleAdressen?: Maybe<Array<OpenKlant2DigitaleAdres>>;
  indicatieActief: Scalars['Boolean']['output'];
  indicatieGeheimhouding?: Maybe<Scalars['Boolean']['output']>;
  klantcontacten?: Maybe<Array<HadKlantcontact>>;
  organisatieIdentificatie?: Maybe<OrganisatieIdentificatie>;
  persoonsIdentificatie?: Maybe<PersoonsIdentificatie>;
  type: PartijType;
};

export enum PartijType {
  Contactpersoon = 'CONTACTPERSOON',
  Organisatie = 'ORGANISATIE',
  Persoon = 'PERSOON'
}

export type PaymentField = {
  __typename?: 'PaymentField';
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type PersoonsIdentificatie = {
  __typename?: 'PersoonsIdentificatie';
  contactnaam?: Maybe<Contactnaam>;
  volledigeNaam?: Maybe<Scalars['String']['output']>;
};

export type PersoonsIdentificatieInput = {
  contactnaam?: InputMaybe<ContactnaamInput>;
  volledigeNaam?: InputMaybe<Scalars['String']['input']>;
};

export type PrefillResponse = {
  __typename?: 'PrefillResponse';
  formulierUrl: Scalars['String']['output'];
  hash: Scalars['String']['output'];
  objectId: Scalars['UUID']['output'];
};

export type PrijzenPage = {
  __typename?: 'PrijzenPage';
  /**  The elements on this page */
  content: Array<OpenProductPrijs>;
  /**  The requested page number */
  number: Scalars['Int']['output'];
  /**  The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  /**  The requested page size */
  size: Scalars['Int']['output'];
  /**  The total number of elements */
  totalElements: Scalars['Int']['output'];
  /**  The total number of available pages */
  totalPages: Scalars['Int']['output'];
};

export type Product = {
  __typename?: 'Product';
  documenten: Array<Scalars['String']['output']>;
  eigenschappen?: Maybe<Scalars['JSON']['output']>;
  geldigTot?: Maybe<Scalars['LocalDateTime']['output']>;
  geldigVan: Scalars['LocalDateTime']['output'];
  id?: Maybe<Scalars['UUID']['output']>;
  naam: Scalars['String']['output'];
  parameters?: Maybe<Scalars['JSON']['output']>;
  productDetails?: Maybe<ProductDetails>;
  productSubType?: Maybe<Scalars['String']['output']>;
  productType?: Maybe<ProductType>;
  status: Scalars['String']['output'];
  taken: Array<TaakV2>;
  verbruiksobjecten: Array<ProductVerbruiksObject>;
  zaken: Array<Zaak>;
};

export type ProductDetails = {
  __typename?: 'ProductDetails';
  data: Array<Scalars['JSON']['output']>;
  id?: Maybe<Scalars['UUID']['output']>;
  productInstantie: Scalars['UUID']['output'];
};

export type ProductPage = {
  __typename?: 'ProductPage';
  /**  The elements on this page */
  content: Array<Product>;
  /**  The requested page number */
  number: Scalars['Int']['output'];
  /**  The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  /**  The requested page size */
  size: Scalars['Int']['output'];
  /**  The total number of elements */
  totalElements: Scalars['Int']['output'];
  /**  The total number of available pages */
  totalPages: Scalars['Int']['output'];
};

export type ProductType = {
  __typename?: 'ProductType';
  /**  Get list of available beslistabellen, with their object configurations */
  beslistabelMappings?: Maybe<Array<Scalars['String']['output']>>;
  eigenschappen?: Maybe<Scalars['JSON']['output']>;
  id?: Maybe<Scalars['UUID']['output']>;
  naam: Scalars['String']['output'];
  omschrijving?: Maybe<Scalars['String']['output']>;
  parameters?: Maybe<Scalars['JSON']['output']>;
  /**  Get list of available forms to prefill, with their object configurations */
  prefillMappings?: Maybe<Scalars['JSON']['output']>;
  productSubType?: Maybe<Scalars['String']['output']>;
  zaaktypen: Array<Scalars['UUID']['output']>;
};

export type ProductTypesPage = {
  __typename?: 'ProductTypesPage';
  /**  The elements on this page */
  content: Array<OpenProductProductType>;
  /**  The requested page number */
  number: Scalars['Int']['output'];
  /**  The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  /**  The requested page size */
  size: Scalars['Int']['output'];
  /**  The total number of elements */
  totalElements: Scalars['Int']['output'];
  /**  The total number of available pages */
  totalPages: Scalars['Int']['output'];
};

export type ProductVerbruiksObject = {
  __typename?: 'ProductVerbruiksObject';
  data?: Maybe<Scalars['JSON']['output']>;
  id?: Maybe<Scalars['UUID']['output']>;
  productInstantie: Scalars['String']['output'];
  soort?: Maybe<Scalars['String']['output']>;
};

export type ProductenPage = {
  __typename?: 'ProductenPage';
  /**  The elements on this page */
  content: Array<OpenProductProduct>;
  /**  The requested page number */
  number: Scalars['Int']['output'];
  /**  The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  /**  The requested page size */
  size: Scalars['Int']['output'];
  /**  The total number of elements */
  totalElements: Scalars['Int']['output'];
  /**  The total number of available pages */
  totalPages: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  /**  Find the Partij of the authenticated user. */
  findUserPartij?: Maybe<OpenKlant2Partij>;
  /**  Gets the bedrijf data */
  getBedrijf?: Maybe<MaatschappelijkeActiviteit>;
  /**  Gets a single Bericht by Id */
  getBericht?: Maybe<Bericht>;
  getBerichten: BerichtenPage;
  /**  Get all besluit by id */
  getBesluit: Besluit;
  /**  Get all besluit audit trails by id */
  getBesluitAuditTrail: BesluitAuditTrail;
  /**  Get all besluit audit trails */
  getBesluitAuditTrails: Array<BesluitAuditTrail>;
  /**  Get all besluit document by id */
  getBesluitDocument: BesluitDocument;
  /**  Get all besluit documents */
  getBesluitDocumenten: Array<BesluitDocument>;
  /**  Get all besluiten */
  getBesluiten: BesluitPage;
  /**  Gets the number of people living in the same house of the adresseerbaarObjectIdentificatie */
  getBewonersAantalV2?: Maybe<Scalars['Int']['output']>;
  getDecision: Array<Scalars['JSON']['output']>;
  getDirectPaymentStatus: DirectPaymentStatus;
  /**  Gets a document content by id as base64 encoded */
  getDocumentContent: DocumentContent;
  /**
   *  find single form definition from repository or Objecten API
   * deprecated(
   *  reason: "Replaced by getFormDefinitionByName and getFormDefinitionByObjectenApiUrl, replace with getFormDefinitionByName or getFormDefinitionByObjectenApiUrl"
   * )
   */
  getFormDefinitionById?: Maybe<FormDefinition>;
  /**  find single form definition from repository */
  getFormDefinitionByName?: Maybe<FormDefinition>;
  /**  find single form definition from the Objecten API */
  getFormDefinitionByObjectenApiUrl?: Maybe<FormDefinition>;
  /**  Gets the data of the gemachtigde */
  getGemachtigdeV2?: Maybe<GemachtigdeV2>;
  /**  Get a Open product type by id */
  getOpenProduct?: Maybe<OpenProductProduct>;
  /**  Get a actie */
  getOpenProductActie?: Maybe<OpenProductActie>;
  /**  Get decision by actie naam */
  getOpenProductActieDecision: Array<Scalars['JSON']['output']>;
  /**  Get all acties */
  getOpenProductActies: ActiesPage;
  /**  Get a bestand */
  getOpenProductBestand?: Maybe<OpenProductBestand>;
  /**  Get all bestanden */
  getOpenProductBestanden: BestandenPage;
  /**  Get a contact */
  getOpenProductContact?: Maybe<OpenProductContact>;
  /**  Get all contacten */
  getOpenProductContacten: ContactenPage;
  /**  Get all hoofd themas */
  getOpenProductHoofdThemas: Array<OpenProductThema>;
  /**  Get all hoofd themas by producten */
  getOpenProductHoofdThemasByProducten: Array<OpenProductThema>;
  /**  Get a link */
  getOpenProductLink?: Maybe<OpenProductLink>;
  /**  Get all links */
  getOpenProductLinks: LinksPage;
  /**  Get a locatie */
  getOpenProductLocatie?: Maybe<OpenProductLocatie>;
  /**  Get all locaties */
  getOpenProductLocaties: LocatiesPage;
  /**  Get a organisatie */
  getOpenProductOrganisatie?: Maybe<OpenProductOrganisatie>;
  /**  Get all organisaties */
  getOpenProductOrganisaties: OrganisatiesPage;
  /**  Get a prijs */
  getOpenProductPrijs?: Maybe<OpenProductPrijs>;
  /**  Get all prijzen */
  getOpenProductPrijzen: PrijzenPage;
  /**  Get a thema */
  getOpenProductThema?: Maybe<OpenProductThema>;
  /**  Get thema hierarchy */
  getOpenProductThemaHierarchy: Array<OpenProductThemaHierarchy>;
  /**  Get taken of a thema, including their parent themas */
  getOpenProductThemaTaken: Array<TaakV2>;
  /**  Get zaken of a thema, including their parent themas */
  getOpenProductThemaZaken: Array<Zaak>;
  /**  Get all themas */
  getOpenProductThemas: ThemasPage;
  /**  Get all themas hierarchy */
  getOpenProductThemasHierarchy: Array<OpenProductThemaHierarchy>;
  /**  Get a Open product type by id */
  getOpenProductType?: Maybe<OpenProductProductType>;
  /**  Get all Open product types */
  getOpenProductTypes: ProductTypesPage;
  getOpenProducten: ProductenPage;
  /**  Get a Open producten type by thema id */
  getOpenProductenByThema: Array<OpenProductProduct>;
  /**  Gets the persoon data */
  getPersoonV2?: Maybe<BrpPersoon>;
  /**  Get product by id */
  getProduct?: Maybe<Product>;
  getProductDecision: Array<Scalars['JSON']['output']>;
  /**  Get list of taken by product name */
  getProductTaken: Array<TaakV2>;
  /**  Get productType by name */
  getProductType?: Maybe<ProductType>;
  /**  Get productTypes where the user has products */
  getProductTypes: Array<ProductType>;
  /**  Get list of verbruiksobjecten of product */
  getProductVerbruiksObjecten: Array<ProductVerbruiksObject>;
  getProductZaken: Array<Zaak>;
  getProducten: ProductPage;
  /**  Get task by id V2 */
  getTaakByIdV2?: Maybe<TaakV2>;
  /**  Get a list of tasks. Optional filter for zaak V2 */
  getTakenV2: TaakPageV2;
  /**  Returns the total amount of unopened Berichten */
  getUnopenedBerichtenCount: Scalars['Int']['output'];
  /**  Get DigitaleAdressen of authenticated user. */
  getUserDigitaleAdressen?: Maybe<Array<DigitaleAdresResponse>>;
  /**  Get KlantContact by id of authenticated user. */
  getUserKlantContact?: Maybe<OpenKlant2Klantcontact>;
  getUserKlantContacten: Array<OpenKlant2Klantcontact>;
  /**  Get Partij by Id for authenticated user. */
  getUserPartij?: Maybe<OpenKlant2Partij>;
  /**  Gets a zaak by id */
  getZaak: Zaak;
  getZaken: ZaakPage;
  productPrefill: PrefillResponse;
};


export type QueryGetBerichtArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryGetBerichtenArgs = {
  onderwerp?: InputMaybe<Scalars['String']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetBesluitArgs = {
  besluitId: Scalars['UUID']['input'];
};


export type QueryGetBesluitAuditTrailArgs = {
  auditTrailId: Scalars['UUID']['input'];
  besluitId: Scalars['UUID']['input'];
};


export type QueryGetBesluitAuditTrailsArgs = {
  besluitId: Scalars['UUID']['input'];
};


export type QueryGetBesluitDocumentArgs = {
  documentId: Scalars['UUID']['input'];
};


export type QueryGetBesluitDocumentenArgs = {
  besluit?: InputMaybe<Scalars['String']['input']>;
  informatieobject?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetBesluitenArgs = {
  besluitType?: InputMaybe<Scalars['String']['input']>;
  identificatie?: InputMaybe<Scalars['String']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  verantwoordelijkeOrganisatie?: InputMaybe<Scalars['String']['input']>;
  zaak?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetBewonersAantalV2Args = {
  adresseerbaarObjectIdentificatie: Scalars['String']['input'];
};


export type QueryGetDecisionArgs = {
  dmnVariables?: InputMaybe<Scalars['JSON']['input']>;
  key: Scalars['String']['input'];
  productName: Scalars['String']['input'];
  productTypeId?: InputMaybe<Scalars['UUID']['input']>;
  sources?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryGetDirectPaymentStatusArgs = {
  hostedCheckoutId: Scalars['String']['input'];
  identifier: Scalars['String']['input'];
};


export type QueryGetDocumentContentArgs = {
  documentApi: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type QueryGetFormDefinitionByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetFormDefinitionByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryGetFormDefinitionByObjectenApiUrlArgs = {
  url: Scalars['String']['input'];
};


export type QueryGetOpenProductArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryGetOpenProductActieArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryGetOpenProductActieDecisionArgs = {
  naam: Scalars['String']['input'];
  productId: Scalars['UUID']['input'];
};


export type QueryGetOpenProductActiesArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetOpenProductBestandArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryGetOpenProductBestandenArgs = {
  naam?: InputMaybe<Scalars['String']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetOpenProductContactArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryGetOpenProductContactenArgs = {
  naam?: InputMaybe<Scalars['String']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetOpenProductLinkArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryGetOpenProductLinksArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetOpenProductLocatieArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryGetOpenProductLocatiesArgs = {
  naam?: InputMaybe<Scalars['String']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetOpenProductOrganisatieArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryGetOpenProductOrganisatiesArgs = {
  naam?: InputMaybe<Scalars['String']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetOpenProductPrijsArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryGetOpenProductPrijzenArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetOpenProductThemaArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryGetOpenProductThemaHierarchyArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryGetOpenProductThemaTakenArgs = {
  id: Scalars['UUID']['input'];
  language?: InputMaybe<Scalars['String']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetOpenProductThemaZakenArgs = {
  id: Scalars['UUID']['input'];
  isOpen?: InputMaybe<Scalars['Boolean']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetOpenProductThemasArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetOpenProductTypeArgs = {
  id: Scalars['UUID']['input'];
  language?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetOpenProductTypesArgs = {
  language?: InputMaybe<Scalars['String']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetOpenProductenArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  productTypeCode?: InputMaybe<Scalars['String']['input']>;
  productTypeCodes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  productTypeId?: InputMaybe<Scalars['String']['input']>;
  productTypeIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetOpenProductenByThemaArgs = {
  themaId: Scalars['UUID']['input'];
};


export type QueryGetProductArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryGetProductDecisionArgs = {
  dmnVariables?: InputMaybe<Scalars['JSON']['input']>;
  key: Scalars['String']['input'];
  productName: Scalars['String']['input'];
  productTypeId?: InputMaybe<Scalars['UUID']['input']>;
  sources?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryGetProductTakenArgs = {
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  productName: Scalars['String']['input'];
  productSubType?: InputMaybe<Scalars['String']['input']>;
  productTypeId?: InputMaybe<Scalars['UUID']['input']>;
};


export type QueryGetProductTypeArgs = {
  productName: Scalars['String']['input'];
  productTypeId?: InputMaybe<Scalars['UUID']['input']>;
};


export type QueryGetProductVerbruiksObjectenArgs = {
  productId: Scalars['UUID']['input'];
};


export type QueryGetProductZakenArgs = {
  isOpen?: InputMaybe<Scalars['Boolean']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  productName: Scalars['String']['input'];
  productTypeId?: InputMaybe<Scalars['UUID']['input']>;
};


export type QueryGetProductenArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  productName: Scalars['String']['input'];
  productTypeId?: InputMaybe<Scalars['UUID']['input']>;
  subProductType?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetTaakByIdV2Args = {
  id: Scalars['UUID']['input'];
};


export type QueryGetTakenV2Args = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<TaakStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
  zaakUUID?: InputMaybe<Scalars['UUID']['input']>;
};


export type QueryGetUserKlantContactArgs = {
  klantContactId: Scalars['UUID']['input'];
};


export type QueryGetUserKlantContactenArgs = {
  identificatorId?: InputMaybe<Scalars['UUID']['input']>;
  identificatorType?: InputMaybe<OnderwerpObjectIndentificatorType>;
};


export type QueryGetUserPartijArgs = {
  partijId: Scalars['UUID']['input'];
};


export type QueryGetZaakArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryGetZakenArgs = {
  identificatie?: InputMaybe<Scalars['String']['input']>;
  identificatieContains?: InputMaybe<Scalars['String']['input']>;
  isOpen?: InputMaybe<Scalars['Boolean']['input']>;
  omschrijving?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  zaakTypeUrl?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductPrefillArgs = {
  key: Scalars['String']['input'];
  productName: Scalars['String']['input'];
  productTypeId?: InputMaybe<Scalars['UUID']['input']>;
  sources?: InputMaybe<Scalars['JSON']['input']>;
  staticData?: InputMaybe<Scalars['JSON']['input']>;
};

export type ResultaatType = {
  __typename?: 'ResultaatType';
  omschrijving?: Maybe<Scalars['String']['output']>;
  omschrijvingGeneriek?: Maybe<Scalars['String']['output']>;
  resultaattypeomschrijving: Scalars['String']['output'];
  selectielijstklasse: Scalars['String']['output'];
  toelichting?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
  zaaktype: Scalars['String']['output'];
  zaaktypeIdentificatie?: Maybe<Scalars['String']['output']>;
};

export type SbiActiviteit = {
  __typename?: 'SbiActiviteit';
  indHoofdactiviteit: Scalars['String']['output'];
  sbiCode: Scalars['String']['output'];
  sbiOmschrijving: Scalars['String']['output'];
};

export enum SoortPartij {
  Contactpersoon = 'CONTACTPERSOON',
  Organisatie = 'ORGANISATIE',
  Persoon = 'PERSOON'
}

export type StatusType = {
  __typename?: 'StatusType';
  isEindstatus?: Maybe<Scalars['Boolean']['output']>;
  omschrijving: Scalars['String']['output'];
  omschrijvingGeneriek?: Maybe<Scalars['String']['output']>;
};

export type TaakForm = {
  __typename?: 'TaakForm';
  data?: Maybe<Scalars['JSON']['output']>;
  formulier: TaakFormulierV2;
};

export type TaakFormulierV2 = {
  __typename?: 'TaakFormulierV2';
  soort: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type TaakIdentificatie = {
  __typename?: 'TaakIdentificatie';
  type: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type TaakKoppeling = {
  __typename?: 'TaakKoppeling';
  registratie: Scalars['String']['output'];
  value?: Maybe<Scalars['String']['output']>;
};

export type TaakPageV2 = {
  __typename?: 'TaakPageV2';
  /**  The elements on this page */
  content: Array<TaakV2>;
  /**  The requested page number */
  number: Scalars['Int']['output'];
  /**  The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  /**  The requested page size */
  size: Scalars['Int']['output'];
  /**  The total number of elements */
  totalElements: Scalars['Int']['output'];
  /**  The total number of available pages */
  totalPages: Scalars['Int']['output'];
};

export enum TaakSoort {
  Ogonebetaling = 'OGONEBETALING',
  Portaalformulier = 'PORTAALFORMULIER',
  Url = 'URL'
}

export enum TaakStatus {
  Afgerond = 'AFGEROND',
  Gesloten = 'GESLOTEN',
  Ingediend = 'INGEDIEND',
  Open = 'OPEN',
  Verwerkt = 'VERWERKT'
}

export type TaakUrl = {
  __typename?: 'TaakUrl';
  uri: Scalars['String']['output'];
};

export type TaakV2 = {
  __typename?: 'TaakV2';
  eigenaar: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  identificatie: TaakIdentificatie;
  koppeling: TaakKoppeling;
  ogonebetaling?: Maybe<OgoneBetaling>;
  portaalformulier?: Maybe<TaakForm>;
  soort: TaakSoort;
  status: TaakStatus;
  titel: Scalars['String']['output'];
  url?: Maybe<TaakUrl>;
  verloopdatum?: Maybe<Scalars['ZonedDateTime']['output']>;
};

export type ThemasPage = {
  __typename?: 'ThemasPage';
  /**  The elements on this page */
  content: Array<OpenProductThema>;
  /**  The requested page number */
  number: Scalars['Int']['output'];
  /**  The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  /**  The requested page size */
  size: Scalars['Int']['output'];
  /**  The total number of elements */
  totalElements: Scalars['Int']['output'];
  /**  The total number of available pages */
  totalPages: Scalars['Int']['output'];
};

export type UpdateProductRequestInput = {
  dataobject?: InputMaybe<Scalars['JSON']['input']>;
  uuid: Scalars['UUID']['input'];
  verbruiksobject?: InputMaybe<Scalars['JSON']['input']>;
};

export type Zaak = {
  __typename?: 'Zaak';
  besluiten: Array<Besluit>;
  documenten: Array<Document>;
  einddatum?: Maybe<Scalars['Date']['output']>;
  identificatie: Scalars['String']['output'];
  omschrijving: Scalars['String']['output'];
  resultaat?: Maybe<ZaakResultaat>;
  startdatum: Scalars['Date']['output'];
  status?: Maybe<ZaakStatus>;
  statusGeschiedenis: Array<ZaakStatus>;
  statussen: Array<StatusType>;
  url: Scalars['String']['output'];
  uuid: Scalars['UUID']['output'];
  zaakdetails: ZaakDetails;
  zaaktype: ZaakType;
};

export type ZaakDetails = {
  __typename?: 'ZaakDetails';
  data: Array<Scalars['JSON']['output']>;
  zaak: Scalars['String']['output'];
};

export type ZaakPage = {
  __typename?: 'ZaakPage';
  /**  The elements on this page */
  content: Array<Zaak>;
  /**  The requested page number */
  number: Scalars['Int']['output'];
  /**  The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  /**  The requested page size */
  size: Scalars['Int']['output'];
  /**  The total number of elements */
  totalElements: Scalars['Int']['output'];
  /**  The total number of available pages */
  totalPages: Scalars['Int']['output'];
};

export type ZaakResultaat = {
  __typename?: 'ZaakResultaat';
  resultaattype: ResultaatType;
  toelichting?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
  uuid: Scalars['UUID']['output'];
  zaak: Scalars['String']['output'];
};

export type ZaakStatus = {
  __typename?: 'ZaakStatus';
  datumStatusGezet: Scalars['String']['output'];
  statustype: ZaakStatusType;
  substatussen: Array<ZaakSubStatus>;
  url: Scalars['String']['output'];
  uuid: Scalars['UUID']['output'];
  zaak: Scalars['String']['output'];
};

export type ZaakStatusType = {
  __typename?: 'ZaakStatusType';
  isEindstatus: Scalars['Boolean']['output'];
  omschrijving: Scalars['String']['output'];
  omschrijvingGeneriek?: Maybe<Scalars['String']['output']>;
};

export type ZaakSubStatus = {
  __typename?: 'ZaakSubStatus';
  doelgroep: ZaakSubStatusDoelgroep;
  omschrijving: Scalars['String']['output'];
  status?: Maybe<Scalars['String']['output']>;
  tijdstip: Scalars['String']['output'];
  uuid: Scalars['UUID']['output'];
  zaak: Scalars['String']['output'];
};

export enum ZaakSubStatusDoelgroep {
  Betrokkenen = 'BETROKKENEN',
  GeenDoelgroep = 'GEEN_DOELGROEP',
  Intern = 'INTERN'
}

export type ZaakType = {
  __typename?: 'ZaakType';
  identificatie: Scalars['String']['output'];
  omschrijving: Scalars['String']['output'];
  omschrijvingGeneriek?: Maybe<Scalars['String']['output']>;
};

export type FormulierFieldsFragment = { __typename?: 'TaakFormulierV2', value: string };

export type OpenProductFieldsFragment = { __typename?: 'OpenProductProduct', uuid: any, url?: string | null, naam: string, startDatum?: any | null, eindDatum?: any | null, gepubliceerd?: boolean | null, aanmaakDatum: any, updateDatum: any, prijs?: number | null, status: OpenProductToegestaneStatus, frequentie: OpenProductFrequentie, verbruiksobject?: any | null, dataobject?: any | null, decisions: Array<any>, producttype: { __typename?: 'OpenProductProductProductType', code: string, uniformeProductNaam: string, toegestaneStatussen: Array<OpenProductToegestaneStatus> }, documenten: Array<{ __typename?: 'OpenProductUrl', url: string }>, acties?: Array<{ __typename?: 'OpenProductActie', uuid: any, naam: string, productTypeUuid?: any | null }> | null };

export type CreateUserDigitaleAdresMutationVariables = Exact<{
  digitaleAdresRequest: DigitaleAdresRequestInput;
}>;


export type CreateUserDigitaleAdresMutation = { __typename?: 'Mutation', createUserDigitaleAdres?: { __typename?: 'DigitaleAdresResponse', uuid: any, waarde: string, type: DigitaleAdresType, omschrijving: string, referentie: string } | null };

export type DeleteUserDigitaleAdresMutationVariables = Exact<{
  digitaleAdresId: Scalars['UUID']['input'];
}>;


export type DeleteUserDigitaleAdresMutation = { __typename?: 'Mutation', deleteUserDigitaleAdres?: boolean | null };

export type DoDirectPaymentMutationVariables = Exact<{
  amount: Scalars['PositiveFloat']['input'];
  identifier: Scalars['String']['input'];
  langId?: InputMaybe<Scalars['String']['input']>;
  orderId: Scalars['String']['input'];
  reference: Scalars['String']['input'];
  returnUrl?: InputMaybe<Scalars['String']['input']>;
}>;


export type DoDirectPaymentMutation = { __typename?: 'Mutation', doDirectPayment: { __typename?: 'DirectPaymentResponse', redirectUrl: string } };

export type GenerateOgonePaymentMutationVariables = Exact<{
  amount: Scalars['PositiveFloat']['input'];
  failureUrl?: InputMaybe<Scalars['String']['input']>;
  langId?: InputMaybe<Scalars['String']['input']>;
  orderId: Scalars['String']['input'];
  pspId: Scalars['String']['input'];
  reference: Scalars['String']['input'];
  successUrl?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
}>;


export type GenerateOgonePaymentMutation = { __typename?: 'Mutation', generateOgonePayment: { __typename?: 'OgonePayment', formAction: string, formFields: Array<{ __typename?: 'PaymentField', name: string, value: string }> } };

export type SubmitTaakV2MutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  submission: Scalars['JSON']['input'];
}>;


export type SubmitTaakV2Mutation = { __typename?: 'Mutation', submitTaakV2: { __typename?: 'TaakV2', id: any, titel: string, status: TaakStatus, verloopdatum?: any | null, portaalformulier?: { __typename?: 'TaakForm', data?: any | null, formulier: { __typename?: 'TaakFormulierV2', soort: string, value: string } } | null } };

export type UpdateUserDigitaleAdresMutationVariables = Exact<{
  digitaleAdresRequest: DigitaleAdresRequestInput;
}>;


export type UpdateUserDigitaleAdresMutation = { __typename?: 'Mutation', updateUserDigitaleAdres?: { __typename?: 'DigitaleAdresResponse', uuid: any, waarde: string, type: DigitaleAdresType, omschrijving: string, referentie: string } | null };

export type UpdateProductVerbruiksObjectMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  submission: Scalars['JSON']['input'];
}>;


export type UpdateProductVerbruiksObjectMutation = { __typename?: 'Mutation', updateProductVerbruiksObject: { __typename?: 'ProductVerbruiksObject', id?: any | null, data?: any | null, productInstantie: string, soort?: string | null } };

export type GetBerichtQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetBerichtQuery = { __typename?: 'Query', getBericht?: { __typename?: 'Bericht', id?: any | null, berichtTekst: string, berichtType: BerichtType, einddatumHandelingstermijn: any, geopend: boolean, handelingsperspectief: BerichtHandelingsperspectief, onderwerp: string, publicatiedatum: any, referentie: string, identificatie: { __typename?: 'BerichtIdentificatie', type: string, value: string }, documenten: Array<{ __typename?: 'Document', uuid: any, documentapi: string, identificatie?: string | null, creatiedatum?: string | null, titel?: string | null, formaat?: string | null, bestandsnaam?: string | null, bestandsomvang?: number | null }> } | null };

export type GetBerichtenQueryVariables = Exact<{
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  onderwerp?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetBerichtenQuery = { __typename?: 'Query', getBerichten: { __typename?: 'BerichtenPage', totalElements: number, totalPages: number, content: Array<{ __typename?: 'Bericht', id?: any | null, einddatumHandelingstermijn: any, publicatiedatum: any, geopend: boolean, onderwerp: string }> } };

export type GetUnopenedBerichtenCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnopenedBerichtenCountQuery = { __typename?: 'Query', getUnopenedBerichtenCount: number };

export type GetBedrijfQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBedrijfQuery = { __typename?: 'Query', getBedrijf?: { __typename?: 'MaatschappelijkeActiviteit', naam: string, kvkNummer: string, embedded?: { __typename?: 'Embedded', eigenaar: { __typename?: 'Eigenaar', rechtsvorm: string }, hoofdvestiging: { __typename?: 'Hoofdvestiging', adressen?: Array<{ __typename?: 'Adres', straatnaam?: string | null, huisnummer?: number | null, postcode: string, plaats: string } | null> | null } } | null } | null };

export type GetDirectPaymentStatusQueryVariables = Exact<{
  identifier: Scalars['String']['input'];
  hostedCheckoutId: Scalars['String']['input'];
}>;


export type GetDirectPaymentStatusQuery = { __typename?: 'Query', getDirectPaymentStatus: { __typename?: 'DirectPaymentStatus', status?: DirectPaymentStatusCategory | null } };

export type GetDocumentenQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetDocumentenQuery = { __typename?: 'Query', getZaak: { __typename?: 'Zaak', zaaktype: { __typename?: 'ZaakType', identificatie: string }, documenten: Array<{ __typename?: 'Document', documentapi: string, bestandsnaam?: string | null, bestandsomvang?: number | null, creatiedatum?: string | null, formaat?: string | null, identificatie?: string | null, titel?: string | null, uuid: any }> } };

export type GetFormDefinitionByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetFormDefinitionByIdQuery = { __typename?: 'Query', getFormDefinitionById?: { __typename?: 'FormDefinition', formDefinition: any } | null };

export type GetFormDefinitionByObjectenApiUrlQueryVariables = Exact<{
  url: Scalars['String']['input'];
}>;


export type GetFormDefinitionByObjectenApiUrlQuery = { __typename?: 'Query', getFormDefinitionByObjectenApiUrl?: { __typename?: 'FormDefinition', formDefinition: any } | null };

export type GetFormDefinitionByNameQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type GetFormDefinitionByNameQuery = { __typename?: 'Query', getFormDefinitionByName?: { __typename?: 'FormDefinition', formDefinition: any } | null };

export type GetPortaalFormulierByIdV2QueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetPortaalFormulierByIdV2Query = { __typename?: 'Query', getTaakByIdV2?: { __typename?: 'TaakV2', id: any, titel: string, status: TaakStatus, verloopdatum?: any | null, portaalformulier?: { __typename?: 'TaakForm', data?: any | null, formulier: { __typename?: 'TaakFormulierV2', soort: string, value: string } } | null } | null };

export type GetGemachtigdeV2QueryVariables = Exact<{ [key: string]: never; }>;


export type GetGemachtigdeV2Query = { __typename?: 'Query', getGemachtigdeV2?: { __typename?: 'GemachtigdeV2', persoon?: { __typename?: 'BrpPersoon', naam: { __typename?: 'BrpNaam', voornamen?: string | null, officialLastName?: string | null } } | null, bedrijf?: { __typename?: 'MaatschappelijkeActiviteit', naam: string } | null } | null };

export type GetOpenProductHoofdThemasByProductenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOpenProductHoofdThemasByProductenQuery = { __typename?: 'Query', getOpenProductHoofdThemasByProducten: Array<{ __typename?: 'OpenProductThema', uuid: any, naam: string }> };

export type GetOpenProductThemaTakenQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
  pageSize?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetOpenProductThemaTakenQuery = { __typename?: 'Query', getOpenProductThemaTaken: Array<{ __typename?: 'TaakV2', id: any, soort: TaakSoort, titel: string, status: TaakStatus, verloopdatum?: any | null, koppeling: { __typename?: 'TaakKoppeling', registratie: string, value?: string | null }, url?: { __typename?: 'TaakUrl', uri: string } | null, portaalformulier?: { __typename?: 'TaakForm', formulier: { __typename?: 'TaakFormulierV2', soort: string, value: string } } | null }> };

export type GetOpenProductThemaZakenQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  isOpen?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetOpenProductThemaZakenQuery = { __typename?: 'Query', getOpenProductThemaZaken: Array<{ __typename?: 'Zaak', uuid: any, omschrijving: string, identificatie: string, startdatum: any, zaaktype: { __typename?: 'ZaakType', identificatie: string }, status?: { __typename?: 'ZaakStatus', statustype: { __typename?: 'ZaakStatusType', isEindstatus: boolean } } | null }> };

export type GetOpenProductQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetOpenProductQuery = { __typename?: 'Query', getOpenProduct?: { __typename?: 'OpenProductProduct', uuid: any, url?: string | null, naam: string, startDatum?: any | null, eindDatum?: any | null, gepubliceerd?: boolean | null, aanmaakDatum: any, updateDatum: any, prijs?: number | null, status: OpenProductToegestaneStatus, frequentie: OpenProductFrequentie, verbruiksobject?: any | null, dataobject?: any | null, decisions: Array<any>, zaken?: Array<{ __typename?: 'Zaak', uuid: any, omschrijving: string, identificatie: string, startdatum: any, zaaktype: { __typename?: 'ZaakType', identificatie: string }, status?: { __typename?: 'ZaakStatus', statustype: { __typename?: 'ZaakStatusType', isEindstatus: boolean } } | null }> | null, taken?: Array<{ __typename?: 'TaakV2', id: any, soort: TaakSoort, titel: string, status: TaakStatus, verloopdatum?: any | null, koppeling: { __typename?: 'TaakKoppeling', registratie: string, value?: string | null }, url?: { __typename?: 'TaakUrl', uri: string } | null, portaalformulier?: { __typename?: 'TaakForm', formulier: { __typename?: 'TaakFormulierV2', soort: string, value: string } } | null, ogonebetaling?: { __typename?: 'OgoneBetaling', bedrag: any, betaalkenmerk: string, pspid: string } | null }> | null, producttype: { __typename?: 'OpenProductProductProductType', code: string, uniformeProductNaam: string, toegestaneStatussen: Array<OpenProductToegestaneStatus> }, documenten: Array<{ __typename?: 'OpenProductUrl', url: string }>, acties?: Array<{ __typename?: 'OpenProductActie', uuid: any, naam: string, productTypeUuid?: any | null }> | null } | null };

export type GetOpenProductenQueryVariables = Exact<{
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  productTypeCode?: InputMaybe<Scalars['String']['input']>;
  productTypeId?: InputMaybe<Scalars['String']['input']>;
  productTypeCodes?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  productTypeIds?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type GetOpenProductenQuery = { __typename?: 'Query', getOpenProducten: { __typename?: 'ProductenPage', number: number, size: number, totalElements: number, numberOfElements: number, totalPages: number, content: Array<{ __typename?: 'OpenProductProduct', uuid: any, url?: string | null, naam: string, startDatum?: any | null, eindDatum?: any | null, gepubliceerd?: boolean | null, aanmaakDatum: any, updateDatum: any, prijs?: number | null, status: OpenProductToegestaneStatus, frequentie: OpenProductFrequentie, verbruiksobject?: any | null, dataobject?: any | null, decisions: Array<any>, producttype: { __typename?: 'OpenProductProductProductType', code: string, uniformeProductNaam: string, toegestaneStatussen: Array<OpenProductToegestaneStatus> }, documenten: Array<{ __typename?: 'OpenProductUrl', url: string }>, acties?: Array<{ __typename?: 'OpenProductActie', uuid: any, naam: string, productTypeUuid?: any | null }> | null }> } };

export type GetPersoonV2QueryVariables = Exact<{ [key: string]: never; }>;


export type GetPersoonV2Query = { __typename?: 'Query', getPersoonV2?: { __typename?: 'BrpPersoon', burgerservicenummer: string, bewonersAantal?: number | null, geheimhoudingPersoonsgegevens?: boolean | null, geslacht?: { __typename?: 'BrpCodeOmschrijving', omschrijving?: string | null } | null, naam: { __typename?: 'BrpNaam', voornamen?: string | null, officialLastName?: string | null }, verblijfplaats?: { __typename?: 'BrpVerblijfplaats', verblijfadres?: { __typename?: 'Brp2Adres', officieleStraatnaam?: string | null, huisnummer?: number | null, huisletter?: string | null, huisnummertoevoeging?: string | null, postcode?: string | null, woonplaats?: string | null } | null, datumVan?: { __typename?: 'BrpDatum', datum?: any | null, langFormaat?: string | null, type?: string | null } | null } | null, geboorte?: { __typename?: 'BrpDatumLandPlaats', datum?: { __typename?: 'BrpDatum', datum?: any | null, langFormaat?: string | null, type?: string | null } | null, land?: { __typename?: 'BrpCodeOmschrijving', code?: string | null, omschrijving?: string | null } | null, plaats?: { __typename?: 'BrpCodeOmschrijving', code?: string | null, omschrijving?: string | null } | null } | null, nationaliteiten: Array<{ __typename?: 'BrpNationaliteit', nationaliteit?: { __typename?: 'BrpCodeOmschrijving', code?: string | null, omschrijving?: string | null } | null }> } | null };

export type GetProductTakenQueryVariables = Exact<{
  productName: Scalars['String']['input'];
  pageSize?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetProductTakenQuery = { __typename?: 'Query', getProductTaken: Array<{ __typename?: 'TaakV2', id: any, soort: TaakSoort, titel: string, status: TaakStatus, verloopdatum?: any | null, koppeling: { __typename?: 'TaakKoppeling', registratie: string, value?: string | null }, url?: { __typename?: 'TaakUrl', uri: string } | null, portaalformulier?: { __typename?: 'TaakForm', formulier: { __typename?: 'TaakFormulierV2', soort: string, value: string } } | null }> };

export type GetProductVerbruiksObjectenQueryVariables = Exact<{
  productId: Scalars['UUID']['input'];
}>;


export type GetProductVerbruiksObjectenQuery = { __typename?: 'Query', getProductVerbruiksObjecten: Array<{ __typename?: 'ProductVerbruiksObject', id?: any | null, soort?: string | null, productInstantie: string, data?: any | null }> };

export type GetProductZakenQueryVariables = Exact<{
  productName: Scalars['String']['input'];
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  isOpen?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetProductZakenQuery = { __typename?: 'Query', getProductZaken: Array<{ __typename?: 'Zaak', uuid: any, omschrijving: string, identificatie: string, startdatum: any, zaaktype: { __typename?: 'ZaakType', identificatie: string }, status?: { __typename?: 'ZaakStatus', statustype: { __typename?: 'ZaakStatusType', isEindstatus: boolean } } | null }> };

export type GetProductQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetProductQuery = { __typename?: 'Query', getProduct?: { __typename?: 'Product', id?: any | null, naam: string, status: string, geldigVan: any, geldigTot?: any | null, verbruiksobjecten: Array<{ __typename?: 'ProductVerbruiksObject', id?: any | null, soort?: string | null, data?: any | null }>, productDetails?: { __typename?: 'ProductDetails', id?: any | null, data: Array<any> } | null, zaken: Array<{ __typename?: 'Zaak', uuid: any, omschrijving: string, identificatie: string, startdatum: any, zaaktype: { __typename?: 'ZaakType', identificatie: string }, status?: { __typename?: 'ZaakStatus', statustype: { __typename?: 'ZaakStatusType', isEindstatus: boolean } } | null }>, taken: Array<{ __typename?: 'TaakV2', id: any, soort: TaakSoort, titel: string, status: TaakStatus, verloopdatum?: any | null, koppeling: { __typename?: 'TaakKoppeling', registratie: string, value?: string | null }, url?: { __typename?: 'TaakUrl', uri: string } | null, portaalformulier?: { __typename?: 'TaakForm', formulier: { __typename?: 'TaakFormulierV2', soort: string, value: string } } | null, ogonebetaling?: { __typename?: 'OgoneBetaling', bedrag: any, betaalkenmerk: string, pspid: string } | null }> } | null };

export type GetProductenQueryVariables = Exact<{
  productName: Scalars['String']['input'];
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetProductenQuery = { __typename?: 'Query', getProducten: { __typename?: 'ProductPage', totalElements: number, totalPages: number, content: Array<{ __typename?: 'Product', id?: any | null, naam: string, status: string, geldigVan: any, geldigTot?: any | null, productType?: { __typename?: 'ProductType', id?: any | null, naam: string, zaaktypen: Array<any> } | null }> } };

export type GetTaakByIdV2QueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetTaakByIdV2Query = { __typename?: 'Query', getTaakByIdV2?: { __typename?: 'TaakV2', id: any, soort: TaakSoort, titel: string, status: TaakStatus, verloopdatum?: any | null, koppeling: { __typename?: 'TaakKoppeling', registratie: string, value?: string | null }, url?: { __typename?: 'TaakUrl', uri: string } | null, portaalformulier?: { __typename?: 'TaakForm', data?: any | null, formulier: { __typename?: 'TaakFormulierV2', soort: string, value: string } } | null } | null };

export type GetTakenV2QueryVariables = Exact<{
  zaakId?: InputMaybe<Scalars['UUID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetTakenV2Query = { __typename?: 'Query', getTakenV2: { __typename?: 'TaakPageV2', totalElements: number, totalPages: number, content: Array<{ __typename?: 'TaakV2', id: any, soort: TaakSoort, titel: string, status: TaakStatus, verloopdatum?: any | null, koppeling: { __typename?: 'TaakKoppeling', registratie: string, value?: string | null }, url?: { __typename?: 'TaakUrl', uri: string } | null, portaalformulier?: { __typename?: 'TaakForm', formulier: { __typename?: 'TaakFormulierV2', soort: string, value: string } } | null, ogonebetaling?: { __typename?: 'OgoneBetaling', bedrag: any, betaalkenmerk: string, pspid: string } | null }> } };

export type GetUserDigitaleAdressenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserDigitaleAdressenQuery = { __typename?: 'Query', getUserDigitaleAdressen?: Array<{ __typename?: 'DigitaleAdresResponse', uuid: any, waarde: string, type: DigitaleAdresType, omschrijving: string, referentie: string }> | null };

export type GetUserKlantContactenQueryVariables = Exact<{
  identificatorType: OnderwerpObjectIndentificatorType;
  identificatorId: Scalars['UUID']['input'];
}>;


export type GetUserKlantContactenQuery = { __typename?: 'Query', getUserKlantContacten: Array<{ __typename?: 'OpenKlant2Klantcontact', uuid: string, inhoud: string, kanaal: string, onderwerp: string, plaatsgevondenOp: string }> };

export type GetZaakQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetZaakQuery = { __typename?: 'Query', getZaak: { __typename?: 'Zaak', uuid: any, url: string, omschrijving: string, identificatie: string, startdatum: any, zaaktype: { __typename?: 'ZaakType', identificatie: string, omschrijving: string }, status?: { __typename?: 'ZaakStatus', datumStatusGezet: string, statustype: { __typename?: 'ZaakStatusType', omschrijving: string, isEindstatus: boolean }, substatussen: Array<{ __typename?: 'ZaakSubStatus', uuid: any, omschrijving: string, tijdstip: string }> } | null, statusGeschiedenis: Array<{ __typename?: 'ZaakStatus', datumStatusGezet: string, statustype: { __typename?: 'ZaakStatusType', omschrijving: string, isEindstatus: boolean }, substatussen: Array<{ __typename?: 'ZaakSubStatus', uuid: any, omschrijving: string, tijdstip: string }> }>, statussen: Array<{ __typename?: 'StatusType', omschrijving: string }>, documenten: Array<{ __typename?: 'Document', documentapi: string, bestandsnaam?: string | null, bestandsomvang?: number | null, creatiedatum?: string | null, formaat?: string | null, identificatie?: string | null, titel?: string | null, uuid: any }>, zaakdetails: { __typename?: 'ZaakDetails', data: Array<any>, zaak: string }, resultaat?: { __typename?: 'ZaakResultaat', toelichting?: string | null, resultaattype: { __typename?: 'ResultaatType', omschrijvingGeneriek?: string | null } } | null } };

export type GetZakenQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  zaakTypeUrl?: InputMaybe<Scalars['String']['input']>;
  isOpen?: InputMaybe<Scalars['Boolean']['input']>;
  identificatie?: InputMaybe<Scalars['String']['input']>;
  identificatieContains?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetZakenQuery = { __typename?: 'Query', getZaken: { __typename?: 'ZaakPage', totalElements: number, totalPages: number, content: Array<{ __typename?: 'Zaak', uuid: any, omschrijving: string, identificatie: string, startdatum: any, zaaktype: { __typename?: 'ZaakType', identificatie: string, omschrijving: string }, status?: { __typename?: 'ZaakStatus', statustype: { __typename?: 'ZaakStatusType', isEindstatus: boolean, omschrijving: string } } | null }> } };

export const FormulierFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FormulierFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaakFormulierV2"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]} as unknown as DocumentNode<FormulierFieldsFragment, unknown>;
export const OpenProductFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"openProductFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OpenProductProduct"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"naam"}},{"kind":"Field","name":{"kind":"Name","value":"startDatum"}},{"kind":"Field","name":{"kind":"Name","value":"eindDatum"}},{"kind":"Field","name":{"kind":"Name","value":"gepubliceerd"}},{"kind":"Field","name":{"kind":"Name","value":"aanmaakDatum"}},{"kind":"Field","name":{"kind":"Name","value":"updateDatum"}},{"kind":"Field","name":{"kind":"Name","value":"producttype"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"uniformeProductNaam"}},{"kind":"Field","name":{"kind":"Name","value":"toegestaneStatussen"}}]}},{"kind":"Field","name":{"kind":"Name","value":"prijs"}},{"kind":"Field","name":{"kind":"Name","value":"gepubliceerd"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"documenten"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"frequentie"}},{"kind":"Field","name":{"kind":"Name","value":"verbruiksobject"}},{"kind":"Field","name":{"kind":"Name","value":"dataobject"}},{"kind":"Field","name":{"kind":"Name","value":"decisions"}},{"kind":"Field","name":{"kind":"Name","value":"acties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"naam"}},{"kind":"Field","name":{"kind":"Name","value":"productTypeUuid"}}]}}]}}]} as unknown as DocumentNode<OpenProductFieldsFragment, unknown>;
export const CreateUserDigitaleAdresDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUserDigitaleAdres"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"digitaleAdresRequest"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DigitaleAdresRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUserDigitaleAdres"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"digitaleAdresRequest"},"value":{"kind":"Variable","name":{"kind":"Name","value":"digitaleAdresRequest"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"waarde"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"omschrijving"}},{"kind":"Field","name":{"kind":"Name","value":"referentie"}}]}}]}}]} as unknown as DocumentNode<CreateUserDigitaleAdresMutation, CreateUserDigitaleAdresMutationVariables>;
export const DeleteUserDigitaleAdresDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUserDigitaleAdres"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"digitaleAdresId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUserDigitaleAdres"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"digitaleAdresId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"digitaleAdresId"}}}]}]}}]} as unknown as DocumentNode<DeleteUserDigitaleAdresMutation, DeleteUserDigitaleAdresMutationVariables>;
export const DoDirectPaymentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DoDirectPayment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PositiveFloat"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"identifier"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"langId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reference"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"returnUrl"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"doDirectPayment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paymentRequest"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"identifier"},"value":{"kind":"Variable","name":{"kind":"Name","value":"identifier"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"langId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"langId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"reference"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reference"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"returnUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"returnUrl"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"redirectUrl"}}]}}]}}]} as unknown as DocumentNode<DoDirectPaymentMutation, DoDirectPaymentMutationVariables>;
export const GenerateOgonePaymentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GenerateOgonePayment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PositiveFloat"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"failureUrl"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"langId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pspId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reference"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"successUrl"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateOgonePayment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paymentRequest"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"failureUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"failureUrl"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"langId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"langId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pspId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pspId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"reference"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reference"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"successUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"successUrl"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formAction"}},{"kind":"Field","name":{"kind":"Name","value":"formFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<GenerateOgonePaymentMutation, GenerateOgonePaymentMutationVariables>;
export const SubmitTaakV2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubmitTaakV2"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"submission"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JSON"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitTaakV2"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"submission"},"value":{"kind":"Variable","name":{"kind":"Name","value":"submission"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"portaalformulier"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formulier"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"soort"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}},{"kind":"Field","name":{"kind":"Name","value":"titel"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"verloopdatum"}}]}}]}}]} as unknown as DocumentNode<SubmitTaakV2Mutation, SubmitTaakV2MutationVariables>;
export const UpdateUserDigitaleAdresDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserDigitaleAdres"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"digitaleAdresRequest"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DigitaleAdresRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserDigitaleAdres"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"digitaleAdresRequest"},"value":{"kind":"Variable","name":{"kind":"Name","value":"digitaleAdresRequest"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"waarde"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"omschrijving"}},{"kind":"Field","name":{"kind":"Name","value":"referentie"}}]}}]}}]} as unknown as DocumentNode<UpdateUserDigitaleAdresMutation, UpdateUserDigitaleAdresMutationVariables>;
export const UpdateProductVerbruiksObjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProductVerbruiksObject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"submission"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JSON"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProductVerbruiksObject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"submission"},"value":{"kind":"Variable","name":{"kind":"Name","value":"submission"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"productInstantie"}},{"kind":"Field","name":{"kind":"Name","value":"soort"}}]}}]}}]} as unknown as DocumentNode<UpdateProductVerbruiksObjectMutation, UpdateProductVerbruiksObjectMutationVariables>;
export const GetBerichtDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBericht"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBericht"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"berichtTekst"}},{"kind":"Field","name":{"kind":"Name","value":"berichtType"}},{"kind":"Field","name":{"kind":"Name","value":"einddatumHandelingstermijn"}},{"kind":"Field","name":{"kind":"Name","value":"geopend"}},{"kind":"Field","name":{"kind":"Name","value":"handelingsperspectief"}},{"kind":"Field","name":{"kind":"Name","value":"identificatie"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"documenten"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"documentapi"}},{"kind":"Field","name":{"kind":"Name","value":"identificatie"}},{"kind":"Field","name":{"kind":"Name","value":"creatiedatum"}},{"kind":"Field","name":{"kind":"Name","value":"titel"}},{"kind":"Field","name":{"kind":"Name","value":"formaat"}},{"kind":"Field","name":{"kind":"Name","value":"bestandsnaam"}},{"kind":"Field","name":{"kind":"Name","value":"bestandsomvang"}}]}},{"kind":"Field","name":{"kind":"Name","value":"onderwerp"}},{"kind":"Field","name":{"kind":"Name","value":"publicatiedatum"}},{"kind":"Field","name":{"kind":"Name","value":"referentie"}}]}}]}}]} as unknown as DocumentNode<GetBerichtQuery, GetBerichtQueryVariables>;
export const GetBerichtenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBerichten"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"onderwerp"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBerichten"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"onderwerp"},"value":{"kind":"Variable","name":{"kind":"Name","value":"onderwerp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"einddatumHandelingstermijn"}},{"kind":"Field","name":{"kind":"Name","value":"publicatiedatum"}},{"kind":"Field","name":{"kind":"Name","value":"geopend"}},{"kind":"Field","name":{"kind":"Name","value":"onderwerp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalElements"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]} as unknown as DocumentNode<GetBerichtenQuery, GetBerichtenQueryVariables>;
export const GetUnopenedBerichtenCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUnopenedBerichtenCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUnopenedBerichtenCount"}}]}}]} as unknown as DocumentNode<GetUnopenedBerichtenCountQuery, GetUnopenedBerichtenCountQueryVariables>;
export const GetBedrijfDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBedrijf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBedrijf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"naam"}},{"kind":"Field","name":{"kind":"Name","value":"kvkNummer"}},{"kind":"Field","name":{"kind":"Name","value":"embedded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eigenaar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rechtsvorm"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hoofdvestiging"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adressen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"straatnaam"}},{"kind":"Field","name":{"kind":"Name","value":"huisnummer"}},{"kind":"Field","name":{"kind":"Name","value":"postcode"}},{"kind":"Field","name":{"kind":"Name","value":"plaats"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetBedrijfQuery, GetBedrijfQueryVariables>;
export const GetDirectPaymentStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDirectPaymentStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"identifier"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostedCheckoutId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getDirectPaymentStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"identifier"},"value":{"kind":"Variable","name":{"kind":"Name","value":"identifier"}}},{"kind":"Argument","name":{"kind":"Name","value":"hostedCheckoutId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostedCheckoutId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<GetDirectPaymentStatusQuery, GetDirectPaymentStatusQueryVariables>;
export const GetDocumentenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDocumenten"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getZaak"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"zaaktype"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"identificatie"}}]}},{"kind":"Field","name":{"kind":"Name","value":"documenten"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentapi"}},{"kind":"Field","name":{"kind":"Name","value":"bestandsnaam"}},{"kind":"Field","name":{"kind":"Name","value":"bestandsomvang"}},{"kind":"Field","name":{"kind":"Name","value":"creatiedatum"}},{"kind":"Field","name":{"kind":"Name","value":"formaat"}},{"kind":"Field","name":{"kind":"Name","value":"identificatie"}},{"kind":"Field","name":{"kind":"Name","value":"titel"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}}]}}]}}]} as unknown as DocumentNode<GetDocumentenQuery, GetDocumentenQueryVariables>;
export const GetFormDefinitionByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFormDefinitionById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFormDefinitionById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formDefinition"}}]}}]}}]} as unknown as DocumentNode<GetFormDefinitionByIdQuery, GetFormDefinitionByIdQueryVariables>;
export const GetFormDefinitionByObjectenApiUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFormDefinitionByObjectenApiUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFormDefinitionByObjectenApiUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formDefinition"}}]}}]}}]} as unknown as DocumentNode<GetFormDefinitionByObjectenApiUrlQuery, GetFormDefinitionByObjectenApiUrlQueryVariables>;
export const GetFormDefinitionByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFormDefinitionByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFormDefinitionByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formDefinition"}}]}}]}}]} as unknown as DocumentNode<GetFormDefinitionByNameQuery, GetFormDefinitionByNameQueryVariables>;
export const GetPortaalFormulierByIdV2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPortaalFormulierByIdV2"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTaakByIdV2"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"portaalformulier"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formulier"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"soort"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}},{"kind":"Field","name":{"kind":"Name","value":"titel"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"verloopdatum"}}]}}]}}]} as unknown as DocumentNode<GetPortaalFormulierByIdV2Query, GetPortaalFormulierByIdV2QueryVariables>;
export const GetGemachtigdeV2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGemachtigdeV2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGemachtigdeV2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"persoon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"naam"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voornamen"}},{"kind":"Field","name":{"kind":"Name","value":"officialLastName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"bedrijf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"naam"}}]}}]}}]}}]} as unknown as DocumentNode<GetGemachtigdeV2Query, GetGemachtigdeV2QueryVariables>;
export const GetOpenProductHoofdThemasByProductenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getOpenProductHoofdThemasByProducten"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOpenProductHoofdThemasByProducten"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"naam"}}]}}]}}]} as unknown as DocumentNode<GetOpenProductHoofdThemasByProductenQuery, GetOpenProductHoofdThemasByProductenQueryVariables>;
export const GetOpenProductThemaTakenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getOpenProductThemaTaken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOpenProductThemaTaken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"soort"}},{"kind":"Field","name":{"kind":"Name","value":"koppeling"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registratie"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"url"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"portaalformulier"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formulier"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"soort"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"titel"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"verloopdatum"}}]}}]}}]} as unknown as DocumentNode<GetOpenProductThemaTakenQuery, GetOpenProductThemaTakenQueryVariables>;
export const GetOpenProductThemaZakenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getOpenProductThemaZaken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isOpen"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOpenProductThemaZaken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"isOpen"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isOpen"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"omschrijving"}},{"kind":"Field","name":{"kind":"Name","value":"identificatie"}},{"kind":"Field","name":{"kind":"Name","value":"zaaktype"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"identificatie"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startdatum"}},{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statustype"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isEindstatus"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetOpenProductThemaZakenQuery, GetOpenProductThemaZakenQueryVariables>;
export const GetOpenProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOpenProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOpenProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"openProductFields"}},{"kind":"Field","name":{"kind":"Name","value":"zaken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"omschrijving"}},{"kind":"Field","name":{"kind":"Name","value":"identificatie"}},{"kind":"Field","name":{"kind":"Name","value":"zaaktype"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"identificatie"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startdatum"}},{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statustype"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isEindstatus"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"taken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"soort"}},{"kind":"Field","name":{"kind":"Name","value":"koppeling"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registratie"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"url"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"portaalformulier"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formulier"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"soort"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"ogonebetaling"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bedrag"}},{"kind":"Field","name":{"kind":"Name","value":"betaalkenmerk"}},{"kind":"Field","name":{"kind":"Name","value":"pspid"}}]}},{"kind":"Field","name":{"kind":"Name","value":"titel"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"verloopdatum"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"openProductFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OpenProductProduct"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"naam"}},{"kind":"Field","name":{"kind":"Name","value":"startDatum"}},{"kind":"Field","name":{"kind":"Name","value":"eindDatum"}},{"kind":"Field","name":{"kind":"Name","value":"gepubliceerd"}},{"kind":"Field","name":{"kind":"Name","value":"aanmaakDatum"}},{"kind":"Field","name":{"kind":"Name","value":"updateDatum"}},{"kind":"Field","name":{"kind":"Name","value":"producttype"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"uniformeProductNaam"}},{"kind":"Field","name":{"kind":"Name","value":"toegestaneStatussen"}}]}},{"kind":"Field","name":{"kind":"Name","value":"prijs"}},{"kind":"Field","name":{"kind":"Name","value":"gepubliceerd"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"documenten"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"frequentie"}},{"kind":"Field","name":{"kind":"Name","value":"verbruiksobject"}},{"kind":"Field","name":{"kind":"Name","value":"dataobject"}},{"kind":"Field","name":{"kind":"Name","value":"decisions"}},{"kind":"Field","name":{"kind":"Name","value":"acties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"naam"}},{"kind":"Field","name":{"kind":"Name","value":"productTypeUuid"}}]}}]}}]} as unknown as DocumentNode<GetOpenProductQuery, GetOpenProductQueryVariables>;
export const GetOpenProductenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOpenProducten"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productTypeCode"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productTypeId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productTypeCodes"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productTypeIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOpenProducten"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"productTypeCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productTypeCode"}}},{"kind":"Argument","name":{"kind":"Name","value":"productTypeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productTypeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"productTypeCodes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productTypeCodes"}}},{"kind":"Argument","name":{"kind":"Name","value":"productTypeIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productTypeIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"totalElements"}},{"kind":"Field","name":{"kind":"Name","value":"numberOfElements"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"openProductFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"openProductFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OpenProductProduct"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"naam"}},{"kind":"Field","name":{"kind":"Name","value":"startDatum"}},{"kind":"Field","name":{"kind":"Name","value":"eindDatum"}},{"kind":"Field","name":{"kind":"Name","value":"gepubliceerd"}},{"kind":"Field","name":{"kind":"Name","value":"aanmaakDatum"}},{"kind":"Field","name":{"kind":"Name","value":"updateDatum"}},{"kind":"Field","name":{"kind":"Name","value":"producttype"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"uniformeProductNaam"}},{"kind":"Field","name":{"kind":"Name","value":"toegestaneStatussen"}}]}},{"kind":"Field","name":{"kind":"Name","value":"prijs"}},{"kind":"Field","name":{"kind":"Name","value":"gepubliceerd"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"documenten"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"frequentie"}},{"kind":"Field","name":{"kind":"Name","value":"verbruiksobject"}},{"kind":"Field","name":{"kind":"Name","value":"dataobject"}},{"kind":"Field","name":{"kind":"Name","value":"decisions"}},{"kind":"Field","name":{"kind":"Name","value":"acties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"naam"}},{"kind":"Field","name":{"kind":"Name","value":"productTypeUuid"}}]}}]}}]} as unknown as DocumentNode<GetOpenProductenQuery, GetOpenProductenQueryVariables>;
export const GetPersoonV2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPersoonV2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPersoonV2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"burgerservicenummer"}},{"kind":"Field","name":{"kind":"Name","value":"geslacht"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"omschrijving"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bewonersAantal"}},{"kind":"Field","name":{"kind":"Name","value":"geheimhoudingPersoonsgegevens"}},{"kind":"Field","name":{"kind":"Name","value":"naam"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voornamen"}},{"kind":"Field","name":{"kind":"Name","value":"officialLastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"verblijfplaats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verblijfadres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"officieleStraatnaam"}},{"kind":"Field","name":{"kind":"Name","value":"huisnummer"}},{"kind":"Field","name":{"kind":"Name","value":"huisletter"}},{"kind":"Field","name":{"kind":"Name","value":"huisnummertoevoeging"}},{"kind":"Field","name":{"kind":"Name","value":"postcode"}},{"kind":"Field","name":{"kind":"Name","value":"woonplaats"}}]}},{"kind":"Field","name":{"kind":"Name","value":"datumVan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"datum"}},{"kind":"Field","name":{"kind":"Name","value":"langFormaat"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"geboorte"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"datum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"datum"}},{"kind":"Field","name":{"kind":"Name","value":"langFormaat"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"land"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"omschrijving"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plaats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"omschrijving"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"nationaliteiten"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nationaliteit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"omschrijving"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPersoonV2Query, GetPersoonV2QueryVariables>;
export const GetProductTakenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductTaken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProductTaken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productName"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"soort"}},{"kind":"Field","name":{"kind":"Name","value":"koppeling"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registratie"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"url"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"portaalformulier"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formulier"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"soort"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"titel"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"verloopdatum"}}]}}]}}]} as unknown as DocumentNode<GetProductTakenQuery, GetProductTakenQueryVariables>;
export const GetProductVerbruiksObjectenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductVerbruiksObjecten"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProductVerbruiksObjecten"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"soort"}},{"kind":"Field","name":{"kind":"Name","value":"productInstantie"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]} as unknown as DocumentNode<GetProductVerbruiksObjectenQuery, GetProductVerbruiksObjectenQueryVariables>;
export const GetProductZakenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductZaken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isOpen"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProductZaken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productName"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"isOpen"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isOpen"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"omschrijving"}},{"kind":"Field","name":{"kind":"Name","value":"identificatie"}},{"kind":"Field","name":{"kind":"Name","value":"zaaktype"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"identificatie"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startdatum"}},{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statustype"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isEindstatus"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProductZakenQuery, GetProductZakenQueryVariables>;
export const GetProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"verbruiksobjecten"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"soort"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}},{"kind":"Field","name":{"kind":"Name","value":"productDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}},{"kind":"Field","name":{"kind":"Name","value":"naam"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"geldigVan"}},{"kind":"Field","name":{"kind":"Name","value":"geldigTot"}},{"kind":"Field","name":{"kind":"Name","value":"zaken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"omschrijving"}},{"kind":"Field","name":{"kind":"Name","value":"identificatie"}},{"kind":"Field","name":{"kind":"Name","value":"zaaktype"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"identificatie"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startdatum"}},{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statustype"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isEindstatus"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"taken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"soort"}},{"kind":"Field","name":{"kind":"Name","value":"koppeling"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registratie"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"url"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"portaalformulier"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formulier"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"soort"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"titel"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"verloopdatum"}},{"kind":"Field","name":{"kind":"Name","value":"ogonebetaling"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bedrag"}},{"kind":"Field","name":{"kind":"Name","value":"betaalkenmerk"}},{"kind":"Field","name":{"kind":"Name","value":"pspid"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProductQuery, GetProductQueryVariables>;
export const GetProductenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProducten"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProducten"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productName"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"productType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"naam"}},{"kind":"Field","name":{"kind":"Name","value":"zaaktypen"}}]}},{"kind":"Field","name":{"kind":"Name","value":"naam"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"geldigVan"}},{"kind":"Field","name":{"kind":"Name","value":"geldigTot"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalElements"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]} as unknown as DocumentNode<GetProductenQuery, GetProductenQueryVariables>;
export const GetTaakByIdV2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTaakByIdV2"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTaakByIdV2"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"soort"}},{"kind":"Field","name":{"kind":"Name","value":"koppeling"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registratie"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"url"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"portaalformulier"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formulier"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"soort"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}},{"kind":"Field","name":{"kind":"Name","value":"titel"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"verloopdatum"}}]}}]}}]} as unknown as DocumentNode<GetTaakByIdV2Query, GetTaakByIdV2QueryVariables>;
export const GetTakenV2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTakenV2"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"zaakId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTakenV2"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"zaakUUID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"zaakId"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"soort"}},{"kind":"Field","name":{"kind":"Name","value":"koppeling"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registratie"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"url"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"portaalformulier"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formulier"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"soort"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"ogonebetaling"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bedrag"}},{"kind":"Field","name":{"kind":"Name","value":"betaalkenmerk"}},{"kind":"Field","name":{"kind":"Name","value":"pspid"}}]}},{"kind":"Field","name":{"kind":"Name","value":"titel"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"verloopdatum"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalElements"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]} as unknown as DocumentNode<GetTakenV2Query, GetTakenV2QueryVariables>;
export const GetUserDigitaleAdressenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserDigitaleAdressen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserDigitaleAdressen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"waarde"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"omschrijving"}},{"kind":"Field","name":{"kind":"Name","value":"referentie"}}]}}]}}]} as unknown as DocumentNode<GetUserDigitaleAdressenQuery, GetUserDigitaleAdressenQueryVariables>;
export const GetUserKlantContactenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserKlantContacten"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"identificatorType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OnderwerpObjectIndentificatorType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"identificatorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserKlantContacten"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"identificatorType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"identificatorType"}}},{"kind":"Argument","name":{"kind":"Name","value":"identificatorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"identificatorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"inhoud"}},{"kind":"Field","name":{"kind":"Name","value":"kanaal"}},{"kind":"Field","name":{"kind":"Name","value":"onderwerp"}},{"kind":"Field","name":{"kind":"Name","value":"plaatsgevondenOp"}}]}}]}}]} as unknown as DocumentNode<GetUserKlantContactenQuery, GetUserKlantContactenQueryVariables>;
export const GetZaakDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetZaak"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getZaak"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"omschrijving"}},{"kind":"Field","name":{"kind":"Name","value":"identificatie"}},{"kind":"Field","name":{"kind":"Name","value":"zaaktype"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"identificatie"}},{"kind":"Field","name":{"kind":"Name","value":"omschrijving"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startdatum"}},{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"datumStatusGezet"}},{"kind":"Field","name":{"kind":"Name","value":"statustype"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"omschrijving"}},{"kind":"Field","name":{"kind":"Name","value":"isEindstatus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"substatussen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"omschrijving"}},{"kind":"Field","name":{"kind":"Name","value":"tijdstip"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"statusGeschiedenis"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"datumStatusGezet"}},{"kind":"Field","name":{"kind":"Name","value":"statustype"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"omschrijving"}},{"kind":"Field","name":{"kind":"Name","value":"isEindstatus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"substatussen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"omschrijving"}},{"kind":"Field","name":{"kind":"Name","value":"tijdstip"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"statussen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"omschrijving"}}]}},{"kind":"Field","name":{"kind":"Name","value":"documenten"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentapi"}},{"kind":"Field","name":{"kind":"Name","value":"bestandsnaam"}},{"kind":"Field","name":{"kind":"Name","value":"bestandsomvang"}},{"kind":"Field","name":{"kind":"Name","value":"creatiedatum"}},{"kind":"Field","name":{"kind":"Name","value":"formaat"}},{"kind":"Field","name":{"kind":"Name","value":"identificatie"}},{"kind":"Field","name":{"kind":"Name","value":"titel"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}},{"kind":"Field","name":{"kind":"Name","value":"zaakdetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"zaak"}}]}},{"kind":"Field","name":{"kind":"Name","value":"resultaat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"toelichting"}},{"kind":"Field","name":{"kind":"Name","value":"resultaattype"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"omschrijvingGeneriek"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetZaakQuery, GetZaakQueryVariables>;
export const GetZakenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetZaken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"zaakTypeUrl"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isOpen"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"identificatie"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"identificatieContains"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getZaken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"zaakTypeUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"zaakTypeUrl"}}},{"kind":"Argument","name":{"kind":"Name","value":"isOpen"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isOpen"}}},{"kind":"Argument","name":{"kind":"Name","value":"identificatie"},"value":{"kind":"Variable","name":{"kind":"Name","value":"identificatie"}}},{"kind":"Argument","name":{"kind":"Name","value":"identificatieContains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"identificatieContains"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"omschrijving"}},{"kind":"Field","name":{"kind":"Name","value":"identificatie"}},{"kind":"Field","name":{"kind":"Name","value":"zaaktype"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"identificatie"}},{"kind":"Field","name":{"kind":"Name","value":"omschrijving"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startdatum"}},{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statustype"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isEindstatus"}},{"kind":"Field","name":{"kind":"Name","value":"omschrijving"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalElements"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]} as unknown as DocumentNode<GetZakenQuery, GetZakenQueryVariables>;