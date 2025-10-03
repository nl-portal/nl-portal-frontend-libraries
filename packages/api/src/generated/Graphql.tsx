import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  JSON: { input: any; output: any; }
  LocalDateTime: { input: any; output: any; }
  UUID: { input: any; output: any; }
  ZonedDateTime: { input: any; output: any; }
};

export type ActiesPage = {
  __typename?: 'ActiesPage';
  /** The elements on this page */
  content: Array<OpenProductActie>;
  /** The requested page number */
  number: Scalars['Int']['output'];
  /** The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  /** The requested page size */
  size: Scalars['Int']['output'];
  /** The total number of elements */
  totalElements: Scalars['Int']['output'];
  /** The total number of available pages */
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
  einddatumHandelingstermijn: Scalars['LocalDateTime']['output'];
  geopend: Scalars['Boolean']['output'];
  handelingsperspectief: BerichtHandelingsperspectief;
  id?: Maybe<Scalars['UUID']['output']>;
  identificatie: BerichtIdentificatie;
  onderwerp: Scalars['String']['output'];
  publicatiedatum: Scalars['LocalDateTime']['output'];
  referentie?: Maybe<Scalars['String']['output']>;
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
  /** The elements on this page */
  content: Array<Bericht>;
  /** The requested page number */
  number: Scalars['Int']['output'];
  /** The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  /** The requested page size */
  size: Scalars['Int']['output'];
  /** The total number of elements */
  totalElements: Scalars['Int']['output'];
  /** The total number of available pages */
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
  aanmaakdatum?: Maybe<Scalars['LocalDateTime']['output']>;
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
  /** The elements on this page */
  content: Array<Besluit>;
  /** The requested page number */
  number: Scalars['Int']['output'];
  /** The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  /** The requested page size */
  size: Scalars['Int']['output'];
  /** The total number of elements */
  totalElements: Scalars['Int']['output'];
  /** The total number of available pages */
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
  /** The elements on this page */
  content: Array<OpenProductBestand>;
  /** The requested page number */
  number: Scalars['Int']['output'];
  /** The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  /** The requested page size */
  size: Scalars['Int']['output'];
  /** The total number of elements */
  totalElements: Scalars['Int']['output'];
  /** The total number of available pages */
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
  /** The elements on this page */
  content: Array<OpenProductContact>;
  /** The requested page number */
  number: Scalars['Int']['output'];
  /** The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  /** The requested page size */
  size: Scalars['Int']['output'];
  /** The total number of elements */
  totalElements: Scalars['Int']['output'];
  /** The total number of available pages */
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
  amount: Scalars['Float']['input'];
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
  status: DirectPaymentStatusCategory;
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
  adressen?: Maybe<Array<Adres>>;
  eersteHandelsnaam: Scalars['String']['output'];
  indCommercieleVestiging: Scalars['String']['output'];
  indHoofdvestiging: Scalars['String']['output'];
  kvkNummer: Scalars['String']['output'];
  totaalWerkzamePersonen: Scalars['Int']['output'];
  vestigingsnummer: Scalars['String']['output'];
};

export type LinksPage = {
  __typename?: 'LinksPage';
  /** The elements on this page */
  content: Array<OpenProductLink>;
  /** The requested page number */
  number: Scalars['Int']['output'];
  /** The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  /** The requested page size */
  size: Scalars['Int']['output'];
  /** The total number of elements */
  totalElements: Scalars['Int']['output'];
  /** The total number of available pages */
  totalPages: Scalars['Int']['output'];
};

export type LocatiesPage = {
  __typename?: 'LocatiesPage';
  /** The elements on this page */
  content: Array<OpenProductLocatie>;
  /** The requested page number */
  number: Scalars['Int']['output'];
  /** The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  /** The requested page size */
  size: Scalars['Int']['output'];
  /** The total number of elements */
  totalElements: Scalars['Int']['output'];
  /** The total number of available pages */
  totalPages: Scalars['Int']['output'];
};

export type MaatschappelijkeActiviteit = {
  __typename?: 'MaatschappelijkeActiviteit';
  embedded?: Maybe<Embedded>;
  formeleRegistratiedatum?: Maybe<Scalars['String']['output']>;
  handelsnamen?: Maybe<Array<HandelsNaam>>;
  indNonMailing?: Maybe<Scalars['String']['output']>;
  kvkNummer: Scalars['String']['output'];
  materieleRegistratie?: Maybe<MaterieleRegistratie>;
  naam: Scalars['String']['output'];
  sbiActiviteiten?: Maybe<Array<SbiActiviteit>>;
  statutaireNaam?: Maybe<Scalars['String']['output']>;
  totaalWerkzamePersonen?: Maybe<Scalars['Int']['output']>;
};

export type MaterieleRegistratie = {
  __typename?: 'MaterieleRegistratie';
  datumAanvang: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create DigitaleAdres for User */
  createUserDigitaleAdres?: Maybe<DigitaleAdresResponse>;
  /** Create Partij for user */
  createUserPartij?: Maybe<PartijResponse>;
  /** Delete DigitaleAdres of User by Id */
  deleteUserDigitaleAdres?: Maybe<Scalars['Boolean']['output']>;
  /** Do Worldline Direct payment */
  doDirectPayment: DirectPaymentResponse;
  /** Create Ogone payment with hash and fields */
  generateOgonePayment: OgonePayment;
  /** Submit a task */
  submitTaakV2: TaakV2;
  /** Update product */
  updateProduct?: Maybe<OpenProductProduct>;
  /** Update product verbruiks object */
  updateProductVerbruiksObject: ProductVerbruiksObject;
  /** Update DigitaleAdres of User */
  updateUserDigitaleAdres?: Maybe<DigitaleAdresResponse>;
  /** Update user Partij */
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
  bedrag: Scalars['Float']['output'];
  betaalkenmerk: Scalars['String']['output'];
  pspid: Scalars['String']['output'];
};

export type OgonePayment = {
  __typename?: 'OgonePayment';
  formAction: Scalars['String']['output'];
  formFields: Array<PaymentField>;
};

export type OgonePaymentRequestInput = {
  amount: Scalars['Float']['input'];
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

/** A Type that represents a Klantinteracties API Partij object */
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
  mapping: Scalars['JSON']['output'];
  naam: Scalars['String']['output'];
  productTypeUuid?: Maybe<Scalars['UUID']['output']>;
  url: Scalars['String']['output'];
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
  bedrag: Scalars['Float']['output'];
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
  dataObjectSchema: OpenProductSchema;
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
  verbruiksObjectSchema: OpenProductSchema;
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
  /** UUID of the hoofdthema, which this thema is related to. */
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
  /** The elements on this page */
  content: Array<OpenProductOrganisatie>;
  /** The requested page number */
  number: Scalars['Int']['output'];
  /** The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  /** The requested page size */
  size: Scalars['Int']['output'];
  /** The total number of elements */
  totalElements: Scalars['Int']['output'];
  /** The total number of available pages */
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
  /** The elements on this page */
  content: Array<OpenProductPrijs>;
  /** The requested page number */
  number: Scalars['Int']['output'];
  /** The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  /** The requested page size */
  size: Scalars['Int']['output'];
  /** The total number of elements */
  totalElements: Scalars['Int']['output'];
  /** The total number of available pages */
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
  /** The elements on this page */
  content: Array<Product>;
  /** The requested page number */
  number: Scalars['Int']['output'];
  /** The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  /** The requested page size */
  size: Scalars['Int']['output'];
  /** The total number of elements */
  totalElements: Scalars['Int']['output'];
  /** The total number of available pages */
  totalPages: Scalars['Int']['output'];
};

export type ProductType = {
  __typename?: 'ProductType';
  /** Get list of available beslistabellen, with their object configurations */
  beslistabelMappings?: Maybe<Array<Scalars['String']['output']>>;
  eigenschappen?: Maybe<Scalars['JSON']['output']>;
  id?: Maybe<Scalars['UUID']['output']>;
  naam: Scalars['String']['output'];
  omschrijving?: Maybe<Scalars['String']['output']>;
  parameters?: Maybe<Scalars['JSON']['output']>;
  /** Get list of available forms to prefill, with their object configurations */
  prefillMappings?: Maybe<Scalars['JSON']['output']>;
  productSubType?: Maybe<Scalars['String']['output']>;
  zaaktypen: Array<Scalars['UUID']['output']>;
};

export type ProductTypesPage = {
  __typename?: 'ProductTypesPage';
  /** The elements on this page */
  content: Array<OpenProductProductType>;
  /** The requested page number */
  number: Scalars['Int']['output'];
  /** The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  /** The requested page size */
  size: Scalars['Int']['output'];
  /** The total number of elements */
  totalElements: Scalars['Int']['output'];
  /** The total number of available pages */
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
  /** The elements on this page */
  content: Array<OpenProductProduct>;
  /** The requested page number */
  number: Scalars['Int']['output'];
  /** The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  /** The requested page size */
  size: Scalars['Int']['output'];
  /** The total number of elements */
  totalElements: Scalars['Int']['output'];
  /** The total number of available pages */
  totalPages: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  /**
   * find all form definitions from repository
   * @deprecated This method is not used by the NL Portal frontend and is not being replaced.
   */
  allFormDefinitions: Array<FormDefinition>;
  /** Find the Partij of the authenticated user. */
  findUserPartij?: Maybe<OpenKlant2Partij>;
  /** Gets the bedrijf data */
  getBedrijf?: Maybe<MaatschappelijkeActiviteit>;
  /** Gets a single Bericht by Id */
  getBericht?: Maybe<Bericht>;
  /**
   *
   *         Returns a paginated list of all Berichten
   *         Could partial search on 'onderwerp'
   *
   */
  getBerichten: BerichtenPage;
  /** Get all besluit by id */
  getBesluit: Besluit;
  /** Get all besluit audit trails by id */
  getBesluitAuditTrail: BesluitAuditTrail;
  /** Get all besluit audit trails */
  getBesluitAuditTrails: Array<BesluitAuditTrail>;
  /** Get all besluit document by id */
  getBesluitDocument: BesluitDocument;
  /** Get all besluit documents */
  getBesluitDocumenten: Array<BesluitDocument>;
  /** Get all besluiten */
  getBesluiten: BesluitPage;
  /** Gets the number of people living in the same house of the adresseerbaarObjectIdentificatie */
  getBewonersAantalV2?: Maybe<Scalars['Int']['output']>;
  /**
   *
   *         Get Decision by key and json as source
   *         Don't use it directly but via custom queries
   *
   */
  getDecision: Array<Scalars['JSON']['output']>;
  getDirectPaymentStatus: DirectPaymentStatus;
  /** Gets a document content by id as base64 encoded */
  getDocumentContent: DocumentContent;
  /**
   * find single form definition from repository or Objecten API
   * @deprecated Replaced by getFormDefinitionByName and getFormDefinitionByObjectenApiUrl, replace with getFormDefinitionByName or getFormDefinitionByObjectenApiUrl
   */
  getFormDefinitionById?: Maybe<FormDefinition>;
  /** find single form definition from repository */
  getFormDefinitionByName?: Maybe<FormDefinition>;
  /** find single form definition from the Objecten API */
  getFormDefinitionByObjectenApiUrl?: Maybe<FormDefinition>;
  /** Gets the data of the gemachtigde */
  getGemachtigdeV2: GemachtigdeV2;
  /** Get a Open product type by id */
  getOpenProduct?: Maybe<OpenProductProduct>;
  /** Get a actie */
  getOpenProductActie?: Maybe<OpenProductActie>;
  /** Get decision by actie naam */
  getOpenProductActieDecision: Array<Scalars['JSON']['output']>;
  /** Get all acties */
  getOpenProductActies: ActiesPage;
  /** Get a bestand */
  getOpenProductBestand?: Maybe<OpenProductBestand>;
  /** Get all bestanden */
  getOpenProductBestanden: BestandenPage;
  /** Get a contact */
  getOpenProductContact?: Maybe<OpenProductContact>;
  /** Get all contacten */
  getOpenProductContacten: ContactenPage;
  /** Get all hoofd themas */
  getOpenProductHoofdThemas: Array<OpenProductThema>;
  /** Get all hoofd themas by producten */
  getOpenProductHoofdThemasByProducten: Array<OpenProductThema>;
  /** Get a link */
  getOpenProductLink?: Maybe<OpenProductLink>;
  /** Get all links */
  getOpenProductLinks: LinksPage;
  /** Get a locatie */
  getOpenProductLocatie?: Maybe<OpenProductLocatie>;
  /** Get all locaties */
  getOpenProductLocaties: LocatiesPage;
  /** Get a organisatie */
  getOpenProductOrganisatie?: Maybe<OpenProductOrganisatie>;
  /** Get all organisaties */
  getOpenProductOrganisaties: OrganisatiesPage;
  /** Get a prijs */
  getOpenProductPrijs?: Maybe<OpenProductPrijs>;
  /** Get all prijzen */
  getOpenProductPrijzen: PrijzenPage;
  /** Get a thema */
  getOpenProductThema?: Maybe<OpenProductThema>;
  /** Get thema hierarchy */
  getOpenProductThemaHierarchy: Array<OpenProductThemaHierarchy>;
  /** Get taken of a thema, including their parent themas */
  getOpenProductThemaTaken: Array<TaakV2>;
  /** Get zaken of a thema, including their parent themas */
  getOpenProductThemaZaken: Array<Zaak>;
  /** Get all themas */
  getOpenProductThemas: ThemasPage;
  /** Get all themas hierarchy */
  getOpenProductThemasHierarchy: Array<OpenProductThemaHierarchy>;
  /** Get a Open product type by id */
  getOpenProductType?: Maybe<OpenProductProductType>;
  /** Get all Open product types  */
  getOpenProductTypes: ProductTypesPage;
  /**
   *
   *         Get all Open producten
   *         The allowed statussen:
   *         - initieel
   *         - gereed
   *         - actief
   *         - ingetrokken
   *         - geweigerd
   *         - verlopen
   *
   */
  getOpenProducten: ProductenPage;
  /** Get a Open producten type by thema id */
  getOpenProductenByThema: Array<OpenProductProduct>;
  /** Gets the persoon data */
  getPersoonV2?: Maybe<BrpPersoon>;
  /** Get product by id */
  getProduct?: Maybe<Product>;
  /**
   *
   *         Get Product Decision by key. Don't use it till it is configured in ProductType
   *
   */
  getProductDecision: Array<Scalars['JSON']['output']>;
  /** Get list of taken by product name  */
  getProductTaken: Array<TaakV2>;
  /** Get productType by name */
  getProductType?: Maybe<ProductType>;
  /** Get productTypes where the user has products */
  getProductTypes: Array<ProductType>;
  /** Get list of verbruiksobjecten of product */
  getProductVerbruiksObjecten: Array<ProductVerbruiksObject>;
  /**
   *
   *         Get list of zaken by product name or productTypeId
   *         isOpen is optional, when not available, all zaken will be returned
   *         isOpen is true, only zaken without enddate will be returned
   *         isOpen is false, only zaken with an enddate will be returned
   *
   */
  getProductZaken: Array<Zaak>;
  /**
   *
   *         Get list of products by product name or productTypeId
   *         subProductType, is optional. It search for the subProductType in the products
   *
   */
  getProducten: ProductPage;
  /** Get task by id V2 */
  getTaakByIdV2?: Maybe<TaakV2>;
  /** Get a list of tasks. Optional filter for zaak V2 */
  getTakenV2: TaakPageV2;
  /** Returns the total amount of unopened Berichten */
  getUnopenedBerichtenCount: Scalars['Int']['output'];
  /**
   * Get DigitaleAdresen of authenticated user.
   * @deprecated Use getUserDigitaleAdressen instead
   */
  getUserDigitaleAdresen?: Maybe<Array<DigitaleAdresResponse>>;
  /** Get DigitaleAdressen of authenticated user. */
  getUserDigitaleAdressen?: Maybe<Array<DigitaleAdresResponse>>;
  /** Get KlantContact by id of authenticated user. */
  getUserKlantContact?: Maybe<OpenKlant2Klantcontact>;
  /**
   *
   *         Get KlantContacten of authenticated user and optional filter on .
   *         identificatorType, like zaak or product
   *         identificatorId, the uuid of the zaak or product
   *
   */
  getUserKlantContacten: Array<OpenKlant2Klantcontact>;
  /** Get Partij by Id for authenticated user. */
  getUserPartij?: Maybe<OpenKlant2Partij>;
  /** Gets a zaak by id */
  getZaak: Zaak;
  /**
   *
   *         Gets all zaken for the user
   *         isOpen is optional, when not available, all zaken will be returned
   *         isOpen is true, only zaken without enddate will be returned
   *         isOpen is false, only zaken with an enddate will be returned
   *         omschrijving: partial search of this property. Since OpenZaak 1.18.0
   *         identificatieContains: partial search of this property. Since OpenZaak 1.18.0
   *
   */
  getZaken: ZaakPage;
  /**
   *
   *         Prefill data to start a form.
   *
   */
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
  productTypeCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  productTypeId?: InputMaybe<Scalars['String']['input']>;
  productTypeIds?: InputMaybe<Array<Scalars['String']['input']>>;
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
  /** The elements on this page */
  content: Array<TaakV2>;
  /** The requested page number */
  number: Scalars['Int']['output'];
  /** The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  /** The requested page size */
  size: Scalars['Int']['output'];
  /** The total number of elements */
  totalElements: Scalars['Int']['output'];
  /** The total number of available pages */
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
  verloopdatum?: Maybe<Scalars['LocalDateTime']['output']>;
};

export type ThemasPage = {
  __typename?: 'ThemasPage';
  /** The elements on this page */
  content: Array<OpenProductThema>;
  /** The requested page number */
  number: Scalars['Int']['output'];
  /** The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  /** The requested page size */
  size: Scalars['Int']['output'];
  /** The total number of elements */
  totalElements: Scalars['Int']['output'];
  /** The total number of available pages */
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
  /** The elements on this page */
  content: Array<Zaak>;
  /** The requested page number */
  number: Scalars['Int']['output'];
  /** The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  /** The requested page size */
  size: Scalars['Int']['output'];
  /** The total number of elements */
  totalElements: Scalars['Int']['output'];
  /** The total number of available pages */
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

export type CreateUserDigitaleAdresMutationVariables = Exact<{
  digitaleAdresRequest: DigitaleAdresRequestInput;
}>;


export type CreateUserDigitaleAdresMutation = { __typename?: 'Mutation', createUserDigitaleAdres?: { __typename?: 'DigitaleAdresResponse', uuid: any, waarde: string, type: DigitaleAdresType, omschrijving: string, referentie: string } | null };

export type DeleteUserDigitaleAdresMutationVariables = Exact<{
  digitaleAdresId: Scalars['UUID']['input'];
}>;


export type DeleteUserDigitaleAdresMutation = { __typename?: 'Mutation', deleteUserDigitaleAdres?: boolean | null };

export type DoDirectPaymentMutationVariables = Exact<{
  amount: Scalars['Float']['input'];
  identifier: Scalars['String']['input'];
  langId?: InputMaybe<Scalars['String']['input']>;
  orderId: Scalars['String']['input'];
  reference: Scalars['String']['input'];
  returnUrl?: InputMaybe<Scalars['String']['input']>;
}>;


export type DoDirectPaymentMutation = { __typename?: 'Mutation', doDirectPayment: { __typename?: 'DirectPaymentResponse', redirectUrl: string } };

export type GenerateOgonePaymentMutationVariables = Exact<{
  amount: Scalars['Float']['input'];
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


export type GetBerichtQuery = { __typename?: 'Query', getBericht?: { __typename?: 'Bericht', id?: any | null, berichtTekst: string, berichtType: BerichtType, einddatumHandelingstermijn: any, geopend: boolean, handelingsperspectief: BerichtHandelingsperspectief, onderwerp: string, publicatiedatum: any, referentie?: string | null, identificatie: { __typename?: 'BerichtIdentificatie', type: string, value: string }, documenten: Array<{ __typename?: 'Document', uuid: any, documentapi: string, identificatie?: string | null, creatiedatum?: string | null, titel?: string | null, formaat?: string | null, bestandsnaam?: string | null, bestandsomvang?: number | null }> } | null };

export type GetBerichtenQueryVariables = Exact<{
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  onderwerp?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetBerichtenQuery = { __typename?: 'Query', getBerichten: { __typename?: 'BerichtenPage', totalElements: number, totalPages: number, content: Array<{ __typename?: 'Bericht', id?: any | null, einddatumHandelingstermijn: any, publicatiedatum: any, geopend: boolean, onderwerp: string }> } };

export type GetUnopenedBerichtenCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnopenedBerichtenCountQuery = { __typename?: 'Query', getUnopenedBerichtenCount: number };

export type GetBedrijfQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBedrijfQuery = { __typename?: 'Query', getBedrijf?: { __typename?: 'MaatschappelijkeActiviteit', naam: string, kvkNummer: string, embedded?: { __typename?: 'Embedded', eigenaar: { __typename?: 'Eigenaar', rechtsvorm: string }, hoofdvestiging: { __typename?: 'Hoofdvestiging', adressen?: Array<{ __typename?: 'Adres', straatnaam?: string | null, huisnummer?: number | null, postcode: string, plaats: string }> | null } } | null } | null };

export type GetDirectPaymentStatusQueryVariables = Exact<{
  identifier: Scalars['String']['input'];
  hostedCheckoutId: Scalars['String']['input'];
}>;


export type GetDirectPaymentStatusQuery = { __typename?: 'Query', getDirectPaymentStatus: { __typename?: 'DirectPaymentStatus', status: DirectPaymentStatusCategory } };

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


export type GetGemachtigdeV2Query = { __typename?: 'Query', getGemachtigdeV2: { __typename?: 'GemachtigdeV2', persoon?: { __typename?: 'BrpPersoon', naam: { __typename?: 'BrpNaam', voornamen?: string | null, officialLastName?: string | null } } | null, bedrijf?: { __typename?: 'MaatschappelijkeActiviteit', naam: string } | null } };

export type GetOpenProductenByThemaQueryVariables = Exact<{
  themaId: Scalars['UUID']['input'];
}>;


export type GetOpenProductenByThemaQuery = { __typename?: 'Query', getOpenProductenByThema: Array<{ __typename?: 'OpenProductProduct', uuid: any, naam: string, startDatum?: any | null, eindDatum?: any | null, taken?: Array<{ __typename?: 'TaakV2', id: any, titel: string, verloopdatum?: any | null, koppeling: { __typename?: 'TaakKoppeling', registratie: string, value?: string | null } }> | null, zaken?: Array<{ __typename?: 'Zaak', uuid: any, omschrijving: string, identificatie: string, status?: { __typename?: 'ZaakStatus', statustype: { __typename?: 'ZaakStatusType', isEindstatus: boolean } } | null, zaaktype: { __typename?: 'ZaakType', identificatie: string } }> | null }> };

export type GetOpenProductHoofdThemasQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOpenProductHoofdThemasQuery = { __typename?: 'Query', getOpenProductHoofdThemas: Array<{ __typename?: 'OpenProductThema', uuid: any, naam: string }> };

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


export type GetOpenProductQuery = { __typename?: 'Query', getOpenProduct?: { __typename?: 'OpenProductProduct', uuid: any, url?: string | null, naam: string, startDatum?: any | null, gepubliceerd?: boolean | null, aanmaakDatum: any, prijs?: number | null, status: OpenProductToegestaneStatus, frequentie: OpenProductFrequentie, verbruiksobject?: any | null, dataobject?: any | null, decisions: Array<any>, producttype: { __typename?: 'OpenProductProductProductType', code: string, uniformeProductNaam: string, toegestaneStatussen: Array<OpenProductToegestaneStatus> }, documenten: Array<{ __typename?: 'OpenProductUrl', url: string }>, zaken?: Array<{ __typename?: 'Zaak', uuid: any, omschrijving: string, identificatie: string, startdatum: any, zaaktype: { __typename?: 'ZaakType', identificatie: string }, status?: { __typename?: 'ZaakStatus', statustype: { __typename?: 'ZaakStatusType', isEindstatus: boolean } } | null }> | null, taken?: Array<{ __typename?: 'TaakV2', id: any, soort: TaakSoort, titel: string, status: TaakStatus, verloopdatum?: any | null, koppeling: { __typename?: 'TaakKoppeling', registratie: string, value?: string | null }, url?: { __typename?: 'TaakUrl', uri: string } | null, portaalformulier?: { __typename?: 'TaakForm', formulier: { __typename?: 'TaakFormulierV2', soort: string, value: string } } | null, ogonebetaling?: { __typename?: 'OgoneBetaling', bedrag: number, betaalkenmerk: string, pspid: string } | null }> | null } | null };

export type GetOpenProductenQueryVariables = Exact<{
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  productTypeCode?: InputMaybe<Scalars['String']['input']>;
  productTypeId?: InputMaybe<Scalars['String']['input']>;
  productTypeCodes?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  productTypeIds?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type GetOpenProductenQuery = { __typename?: 'Query', getOpenProducten: { __typename?: 'ProductenPage', number: number, size: number, totalElements: number, numberOfElements: number, totalPages: number, content: Array<{ __typename?: 'OpenProductProduct', uuid: any, url?: string | null, naam: string, startDatum?: any | null, gepubliceerd?: boolean | null, aanmaakDatum: any, prijs?: number | null, status: OpenProductToegestaneStatus, frequentie: OpenProductFrequentie, verbruiksobject?: any | null, dataobject?: any | null, producttype: { __typename?: 'OpenProductProductProductType', code: string, uniformeProductNaam: string, toegestaneStatussen: Array<OpenProductToegestaneStatus> }, documenten: Array<{ __typename?: 'OpenProductUrl', url: string }> }> } };

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


export type GetProductQuery = { __typename?: 'Query', getProduct?: { __typename?: 'Product', id?: any | null, naam: string, status: string, geldigVan: any, geldigTot?: any | null, verbruiksobjecten: Array<{ __typename?: 'ProductVerbruiksObject', id?: any | null, soort?: string | null, data?: any | null }>, productDetails?: { __typename?: 'ProductDetails', id?: any | null, data: Array<any> } | null, zaken: Array<{ __typename?: 'Zaak', uuid: any, omschrijving: string, identificatie: string, startdatum: any, zaaktype: { __typename?: 'ZaakType', identificatie: string }, status?: { __typename?: 'ZaakStatus', statustype: { __typename?: 'ZaakStatusType', isEindstatus: boolean } } | null }>, taken: Array<{ __typename?: 'TaakV2', id: any, soort: TaakSoort, titel: string, status: TaakStatus, verloopdatum?: any | null, koppeling: { __typename?: 'TaakKoppeling', registratie: string, value?: string | null }, url?: { __typename?: 'TaakUrl', uri: string } | null, portaalformulier?: { __typename?: 'TaakForm', formulier: { __typename?: 'TaakFormulierV2', soort: string, value: string } } | null, ogonebetaling?: { __typename?: 'OgoneBetaling', bedrag: number, betaalkenmerk: string, pspid: string } | null }> } | null };

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


export type GetTakenV2Query = { __typename?: 'Query', getTakenV2: { __typename?: 'TaakPageV2', totalElements: number, totalPages: number, content: Array<{ __typename?: 'TaakV2', id: any, soort: TaakSoort, titel: string, status: TaakStatus, verloopdatum?: any | null, koppeling: { __typename?: 'TaakKoppeling', registratie: string, value?: string | null }, url?: { __typename?: 'TaakUrl', uri: string } | null, portaalformulier?: { __typename?: 'TaakForm', formulier: { __typename?: 'TaakFormulierV2', soort: string, value: string } } | null, ogonebetaling?: { __typename?: 'OgoneBetaling', bedrag: number, betaalkenmerk: string, pspid: string } | null }> } };

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


export type GetZakenQuery = { __typename?: 'Query', getZaken: { __typename?: 'ZaakPage', totalElements: number, totalPages: number, content: Array<{ __typename?: 'Zaak', uuid: any, omschrijving: string, identificatie: string, startdatum: any, zaaktype: { __typename?: 'ZaakType', identificatie: string }, status?: { __typename?: 'ZaakStatus', statustype: { __typename?: 'ZaakStatusType', isEindstatus: boolean } } | null }> } };

export const FormulierFieldsFragmentDoc = gql`
    fragment FormulierFields on TaakFormulierV2 {
  value
}
    `;
export const CreateUserDigitaleAdresDocument = gql`
    mutation CreateUserDigitaleAdres($digitaleAdresRequest: DigitaleAdresRequestInput!) {
  createUserDigitaleAdres(digitaleAdresRequest: $digitaleAdresRequest) {
    uuid
    waarde
    type
    omschrijving
    referentie
  }
}
    `;
export type CreateUserDigitaleAdresMutationFn = Apollo.MutationFunction<CreateUserDigitaleAdresMutation, CreateUserDigitaleAdresMutationVariables>;

/**
 * __useCreateUserDigitaleAdresMutation__
 *
 * To run a mutation, you first call `useCreateUserDigitaleAdresMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserDigitaleAdresMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserDigitaleAdresMutation, { data, loading, error }] = useCreateUserDigitaleAdresMutation({
 *   variables: {
 *      digitaleAdresRequest: // value for 'digitaleAdresRequest'
 *   },
 * });
 */
export function useCreateUserDigitaleAdresMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserDigitaleAdresMutation, CreateUserDigitaleAdresMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserDigitaleAdresMutation, CreateUserDigitaleAdresMutationVariables>(CreateUserDigitaleAdresDocument, options);
      }
export type CreateUserDigitaleAdresMutationHookResult = ReturnType<typeof useCreateUserDigitaleAdresMutation>;
export type CreateUserDigitaleAdresMutationResult = Apollo.MutationResult<CreateUserDigitaleAdresMutation>;
export type CreateUserDigitaleAdresMutationOptions = Apollo.BaseMutationOptions<CreateUserDigitaleAdresMutation, CreateUserDigitaleAdresMutationVariables>;
export const DeleteUserDigitaleAdresDocument = gql`
    mutation DeleteUserDigitaleAdres($digitaleAdresId: UUID!) {
  deleteUserDigitaleAdres(digitaleAdresId: $digitaleAdresId)
}
    `;
export type DeleteUserDigitaleAdresMutationFn = Apollo.MutationFunction<DeleteUserDigitaleAdresMutation, DeleteUserDigitaleAdresMutationVariables>;

/**
 * __useDeleteUserDigitaleAdresMutation__
 *
 * To run a mutation, you first call `useDeleteUserDigitaleAdresMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserDigitaleAdresMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserDigitaleAdresMutation, { data, loading, error }] = useDeleteUserDigitaleAdresMutation({
 *   variables: {
 *      digitaleAdresId: // value for 'digitaleAdresId'
 *   },
 * });
 */
export function useDeleteUserDigitaleAdresMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserDigitaleAdresMutation, DeleteUserDigitaleAdresMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserDigitaleAdresMutation, DeleteUserDigitaleAdresMutationVariables>(DeleteUserDigitaleAdresDocument, options);
      }
export type DeleteUserDigitaleAdresMutationHookResult = ReturnType<typeof useDeleteUserDigitaleAdresMutation>;
export type DeleteUserDigitaleAdresMutationResult = Apollo.MutationResult<DeleteUserDigitaleAdresMutation>;
export type DeleteUserDigitaleAdresMutationOptions = Apollo.BaseMutationOptions<DeleteUserDigitaleAdresMutation, DeleteUserDigitaleAdresMutationVariables>;
export const DoDirectPaymentDocument = gql`
    mutation DoDirectPayment($amount: Float!, $identifier: String!, $langId: String, $orderId: String!, $reference: String!, $returnUrl: String) {
  doDirectPayment(
    paymentRequest: {amount: $amount, identifier: $identifier, langId: $langId, orderId: $orderId, reference: $reference, returnUrl: $returnUrl}
  ) {
    redirectUrl
  }
}
    `;
export type DoDirectPaymentMutationFn = Apollo.MutationFunction<DoDirectPaymentMutation, DoDirectPaymentMutationVariables>;

/**
 * __useDoDirectPaymentMutation__
 *
 * To run a mutation, you first call `useDoDirectPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDoDirectPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [doDirectPaymentMutation, { data, loading, error }] = useDoDirectPaymentMutation({
 *   variables: {
 *      amount: // value for 'amount'
 *      identifier: // value for 'identifier'
 *      langId: // value for 'langId'
 *      orderId: // value for 'orderId'
 *      reference: // value for 'reference'
 *      returnUrl: // value for 'returnUrl'
 *   },
 * });
 */
export function useDoDirectPaymentMutation(baseOptions?: Apollo.MutationHookOptions<DoDirectPaymentMutation, DoDirectPaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DoDirectPaymentMutation, DoDirectPaymentMutationVariables>(DoDirectPaymentDocument, options);
      }
export type DoDirectPaymentMutationHookResult = ReturnType<typeof useDoDirectPaymentMutation>;
export type DoDirectPaymentMutationResult = Apollo.MutationResult<DoDirectPaymentMutation>;
export type DoDirectPaymentMutationOptions = Apollo.BaseMutationOptions<DoDirectPaymentMutation, DoDirectPaymentMutationVariables>;
export const GenerateOgonePaymentDocument = gql`
    mutation GenerateOgonePayment($amount: Float!, $failureUrl: String, $langId: String, $orderId: String!, $pspId: String!, $reference: String!, $successUrl: String, $title: String) {
  generateOgonePayment(
    paymentRequest: {amount: $amount, failureUrl: $failureUrl, langId: $langId, orderId: $orderId, pspId: $pspId, reference: $reference, successUrl: $successUrl, title: $title}
  ) {
    formAction
    formFields {
      name
      value
    }
  }
}
    `;
export type GenerateOgonePaymentMutationFn = Apollo.MutationFunction<GenerateOgonePaymentMutation, GenerateOgonePaymentMutationVariables>;

/**
 * __useGenerateOgonePaymentMutation__
 *
 * To run a mutation, you first call `useGenerateOgonePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateOgonePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateOgonePaymentMutation, { data, loading, error }] = useGenerateOgonePaymentMutation({
 *   variables: {
 *      amount: // value for 'amount'
 *      failureUrl: // value for 'failureUrl'
 *      langId: // value for 'langId'
 *      orderId: // value for 'orderId'
 *      pspId: // value for 'pspId'
 *      reference: // value for 'reference'
 *      successUrl: // value for 'successUrl'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useGenerateOgonePaymentMutation(baseOptions?: Apollo.MutationHookOptions<GenerateOgonePaymentMutation, GenerateOgonePaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateOgonePaymentMutation, GenerateOgonePaymentMutationVariables>(GenerateOgonePaymentDocument, options);
      }
export type GenerateOgonePaymentMutationHookResult = ReturnType<typeof useGenerateOgonePaymentMutation>;
export type GenerateOgonePaymentMutationResult = Apollo.MutationResult<GenerateOgonePaymentMutation>;
export type GenerateOgonePaymentMutationOptions = Apollo.BaseMutationOptions<GenerateOgonePaymentMutation, GenerateOgonePaymentMutationVariables>;
export const SubmitTaakV2Document = gql`
    mutation SubmitTaakV2($id: UUID!, $submission: JSON!) {
  submitTaakV2(id: $id, submission: $submission) {
    id
    portaalformulier {
      formulier {
        soort
        value
      }
      data
    }
    titel
    status
    verloopdatum
  }
}
    `;
export type SubmitTaakV2MutationFn = Apollo.MutationFunction<SubmitTaakV2Mutation, SubmitTaakV2MutationVariables>;

/**
 * __useSubmitTaakV2Mutation__
 *
 * To run a mutation, you first call `useSubmitTaakV2Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitTaakV2Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitTaakV2Mutation, { data, loading, error }] = useSubmitTaakV2Mutation({
 *   variables: {
 *      id: // value for 'id'
 *      submission: // value for 'submission'
 *   },
 * });
 */
export function useSubmitTaakV2Mutation(baseOptions?: Apollo.MutationHookOptions<SubmitTaakV2Mutation, SubmitTaakV2MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitTaakV2Mutation, SubmitTaakV2MutationVariables>(SubmitTaakV2Document, options);
      }
export type SubmitTaakV2MutationHookResult = ReturnType<typeof useSubmitTaakV2Mutation>;
export type SubmitTaakV2MutationResult = Apollo.MutationResult<SubmitTaakV2Mutation>;
export type SubmitTaakV2MutationOptions = Apollo.BaseMutationOptions<SubmitTaakV2Mutation, SubmitTaakV2MutationVariables>;
export const UpdateUserDigitaleAdresDocument = gql`
    mutation UpdateUserDigitaleAdres($digitaleAdresRequest: DigitaleAdresRequestInput!) {
  updateUserDigitaleAdres(digitaleAdresRequest: $digitaleAdresRequest) {
    uuid
    waarde
    type
    omschrijving
    referentie
  }
}
    `;
export type UpdateUserDigitaleAdresMutationFn = Apollo.MutationFunction<UpdateUserDigitaleAdresMutation, UpdateUserDigitaleAdresMutationVariables>;

/**
 * __useUpdateUserDigitaleAdresMutation__
 *
 * To run a mutation, you first call `useUpdateUserDigitaleAdresMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserDigitaleAdresMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserDigitaleAdresMutation, { data, loading, error }] = useUpdateUserDigitaleAdresMutation({
 *   variables: {
 *      digitaleAdresRequest: // value for 'digitaleAdresRequest'
 *   },
 * });
 */
export function useUpdateUserDigitaleAdresMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserDigitaleAdresMutation, UpdateUserDigitaleAdresMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserDigitaleAdresMutation, UpdateUserDigitaleAdresMutationVariables>(UpdateUserDigitaleAdresDocument, options);
      }
export type UpdateUserDigitaleAdresMutationHookResult = ReturnType<typeof useUpdateUserDigitaleAdresMutation>;
export type UpdateUserDigitaleAdresMutationResult = Apollo.MutationResult<UpdateUserDigitaleAdresMutation>;
export type UpdateUserDigitaleAdresMutationOptions = Apollo.BaseMutationOptions<UpdateUserDigitaleAdresMutation, UpdateUserDigitaleAdresMutationVariables>;
export const UpdateProductVerbruiksObjectDocument = gql`
    mutation UpdateProductVerbruiksObject($id: UUID!, $submission: JSON!) {
  updateProductVerbruiksObject(id: $id, submission: $submission) {
    id
    data
    productInstantie
    soort
  }
}
    `;
export type UpdateProductVerbruiksObjectMutationFn = Apollo.MutationFunction<UpdateProductVerbruiksObjectMutation, UpdateProductVerbruiksObjectMutationVariables>;

/**
 * __useUpdateProductVerbruiksObjectMutation__
 *
 * To run a mutation, you first call `useUpdateProductVerbruiksObjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductVerbruiksObjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductVerbruiksObjectMutation, { data, loading, error }] = useUpdateProductVerbruiksObjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *      submission: // value for 'submission'
 *   },
 * });
 */
export function useUpdateProductVerbruiksObjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductVerbruiksObjectMutation, UpdateProductVerbruiksObjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductVerbruiksObjectMutation, UpdateProductVerbruiksObjectMutationVariables>(UpdateProductVerbruiksObjectDocument, options);
      }
export type UpdateProductVerbruiksObjectMutationHookResult = ReturnType<typeof useUpdateProductVerbruiksObjectMutation>;
export type UpdateProductVerbruiksObjectMutationResult = Apollo.MutationResult<UpdateProductVerbruiksObjectMutation>;
export type UpdateProductVerbruiksObjectMutationOptions = Apollo.BaseMutationOptions<UpdateProductVerbruiksObjectMutation, UpdateProductVerbruiksObjectMutationVariables>;
export const GetBerichtDocument = gql`
    query GetBericht($id: UUID!) {
  getBericht(id: $id) {
    id
    berichtTekst
    berichtType
    einddatumHandelingstermijn
    geopend
    handelingsperspectief
    identificatie {
      type
      value
    }
    documenten {
      uuid
      documentapi
      identificatie
      creatiedatum
      titel
      formaat
      bestandsnaam
      bestandsomvang
    }
    onderwerp
    publicatiedatum
    referentie
  }
}
    `;

/**
 * __useGetBerichtQuery__
 *
 * To run a query within a React component, call `useGetBerichtQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBerichtQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBerichtQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBerichtQuery(baseOptions: Apollo.QueryHookOptions<GetBerichtQuery, GetBerichtQueryVariables> & ({ variables: GetBerichtQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBerichtQuery, GetBerichtQueryVariables>(GetBerichtDocument, options);
      }
export function useGetBerichtLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBerichtQuery, GetBerichtQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBerichtQuery, GetBerichtQueryVariables>(GetBerichtDocument, options);
        }
export function useGetBerichtSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBerichtQuery, GetBerichtQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBerichtQuery, GetBerichtQueryVariables>(GetBerichtDocument, options);
        }
export type GetBerichtQueryHookResult = ReturnType<typeof useGetBerichtQuery>;
export type GetBerichtLazyQueryHookResult = ReturnType<typeof useGetBerichtLazyQuery>;
export type GetBerichtSuspenseQueryHookResult = ReturnType<typeof useGetBerichtSuspenseQuery>;
export type GetBerichtQueryResult = Apollo.QueryResult<GetBerichtQuery, GetBerichtQueryVariables>;
export const GetBerichtenDocument = gql`
    query GetBerichten($pageNumber: Int, $pageSize: Int, $onderwerp: String) {
  getBerichten(
    pageNumber: $pageNumber
    pageSize: $pageSize
    onderwerp: $onderwerp
  ) {
    content {
      id
      einddatumHandelingstermijn
      publicatiedatum
      geopend
      onderwerp
    }
    totalElements
    totalPages
  }
}
    `;

/**
 * __useGetBerichtenQuery__
 *
 * To run a query within a React component, call `useGetBerichtenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBerichtenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBerichtenQuery({
 *   variables: {
 *      pageNumber: // value for 'pageNumber'
 *      pageSize: // value for 'pageSize'
 *      onderwerp: // value for 'onderwerp'
 *   },
 * });
 */
export function useGetBerichtenQuery(baseOptions?: Apollo.QueryHookOptions<GetBerichtenQuery, GetBerichtenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBerichtenQuery, GetBerichtenQueryVariables>(GetBerichtenDocument, options);
      }
export function useGetBerichtenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBerichtenQuery, GetBerichtenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBerichtenQuery, GetBerichtenQueryVariables>(GetBerichtenDocument, options);
        }
export function useGetBerichtenSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBerichtenQuery, GetBerichtenQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBerichtenQuery, GetBerichtenQueryVariables>(GetBerichtenDocument, options);
        }
export type GetBerichtenQueryHookResult = ReturnType<typeof useGetBerichtenQuery>;
export type GetBerichtenLazyQueryHookResult = ReturnType<typeof useGetBerichtenLazyQuery>;
export type GetBerichtenSuspenseQueryHookResult = ReturnType<typeof useGetBerichtenSuspenseQuery>;
export type GetBerichtenQueryResult = Apollo.QueryResult<GetBerichtenQuery, GetBerichtenQueryVariables>;
export const GetUnopenedBerichtenCountDocument = gql`
    query GetUnopenedBerichtenCount {
  getUnopenedBerichtenCount
}
    `;

/**
 * __useGetUnopenedBerichtenCountQuery__
 *
 * To run a query within a React component, call `useGetUnopenedBerichtenCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnopenedBerichtenCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnopenedBerichtenCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUnopenedBerichtenCountQuery(baseOptions?: Apollo.QueryHookOptions<GetUnopenedBerichtenCountQuery, GetUnopenedBerichtenCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUnopenedBerichtenCountQuery, GetUnopenedBerichtenCountQueryVariables>(GetUnopenedBerichtenCountDocument, options);
      }
export function useGetUnopenedBerichtenCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUnopenedBerichtenCountQuery, GetUnopenedBerichtenCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUnopenedBerichtenCountQuery, GetUnopenedBerichtenCountQueryVariables>(GetUnopenedBerichtenCountDocument, options);
        }
export function useGetUnopenedBerichtenCountSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUnopenedBerichtenCountQuery, GetUnopenedBerichtenCountQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUnopenedBerichtenCountQuery, GetUnopenedBerichtenCountQueryVariables>(GetUnopenedBerichtenCountDocument, options);
        }
export type GetUnopenedBerichtenCountQueryHookResult = ReturnType<typeof useGetUnopenedBerichtenCountQuery>;
export type GetUnopenedBerichtenCountLazyQueryHookResult = ReturnType<typeof useGetUnopenedBerichtenCountLazyQuery>;
export type GetUnopenedBerichtenCountSuspenseQueryHookResult = ReturnType<typeof useGetUnopenedBerichtenCountSuspenseQuery>;
export type GetUnopenedBerichtenCountQueryResult = Apollo.QueryResult<GetUnopenedBerichtenCountQuery, GetUnopenedBerichtenCountQueryVariables>;
export const GetBedrijfDocument = gql`
    query GetBedrijf {
  getBedrijf {
    naam
    kvkNummer
    embedded {
      eigenaar {
        rechtsvorm
      }
      hoofdvestiging {
        adressen {
          straatnaam
          huisnummer
          postcode
          plaats
        }
      }
    }
  }
}
    `;

/**
 * __useGetBedrijfQuery__
 *
 * To run a query within a React component, call `useGetBedrijfQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBedrijfQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBedrijfQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBedrijfQuery(baseOptions?: Apollo.QueryHookOptions<GetBedrijfQuery, GetBedrijfQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBedrijfQuery, GetBedrijfQueryVariables>(GetBedrijfDocument, options);
      }
export function useGetBedrijfLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBedrijfQuery, GetBedrijfQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBedrijfQuery, GetBedrijfQueryVariables>(GetBedrijfDocument, options);
        }
export function useGetBedrijfSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBedrijfQuery, GetBedrijfQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBedrijfQuery, GetBedrijfQueryVariables>(GetBedrijfDocument, options);
        }
export type GetBedrijfQueryHookResult = ReturnType<typeof useGetBedrijfQuery>;
export type GetBedrijfLazyQueryHookResult = ReturnType<typeof useGetBedrijfLazyQuery>;
export type GetBedrijfSuspenseQueryHookResult = ReturnType<typeof useGetBedrijfSuspenseQuery>;
export type GetBedrijfQueryResult = Apollo.QueryResult<GetBedrijfQuery, GetBedrijfQueryVariables>;
export const GetDirectPaymentStatusDocument = gql`
    query GetDirectPaymentStatus($identifier: String!, $hostedCheckoutId: String!) {
  getDirectPaymentStatus(
    identifier: $identifier
    hostedCheckoutId: $hostedCheckoutId
  ) {
    status
  }
}
    `;

/**
 * __useGetDirectPaymentStatusQuery__
 *
 * To run a query within a React component, call `useGetDirectPaymentStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDirectPaymentStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDirectPaymentStatusQuery({
 *   variables: {
 *      identifier: // value for 'identifier'
 *      hostedCheckoutId: // value for 'hostedCheckoutId'
 *   },
 * });
 */
export function useGetDirectPaymentStatusQuery(baseOptions: Apollo.QueryHookOptions<GetDirectPaymentStatusQuery, GetDirectPaymentStatusQueryVariables> & ({ variables: GetDirectPaymentStatusQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDirectPaymentStatusQuery, GetDirectPaymentStatusQueryVariables>(GetDirectPaymentStatusDocument, options);
      }
export function useGetDirectPaymentStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDirectPaymentStatusQuery, GetDirectPaymentStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDirectPaymentStatusQuery, GetDirectPaymentStatusQueryVariables>(GetDirectPaymentStatusDocument, options);
        }
export function useGetDirectPaymentStatusSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDirectPaymentStatusQuery, GetDirectPaymentStatusQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDirectPaymentStatusQuery, GetDirectPaymentStatusQueryVariables>(GetDirectPaymentStatusDocument, options);
        }
export type GetDirectPaymentStatusQueryHookResult = ReturnType<typeof useGetDirectPaymentStatusQuery>;
export type GetDirectPaymentStatusLazyQueryHookResult = ReturnType<typeof useGetDirectPaymentStatusLazyQuery>;
export type GetDirectPaymentStatusSuspenseQueryHookResult = ReturnType<typeof useGetDirectPaymentStatusSuspenseQuery>;
export type GetDirectPaymentStatusQueryResult = Apollo.QueryResult<GetDirectPaymentStatusQuery, GetDirectPaymentStatusQueryVariables>;
export const GetDocumentenDocument = gql`
    query GetDocumenten($id: UUID!) {
  getZaak(id: $id) {
    zaaktype {
      identificatie
    }
    documenten {
      documentapi
      bestandsnaam
      bestandsomvang
      creatiedatum
      formaat
      identificatie
      titel
      uuid
    }
  }
}
    `;

/**
 * __useGetDocumentenQuery__
 *
 * To run a query within a React component, call `useGetDocumentenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDocumentenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDocumentenQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDocumentenQuery(baseOptions: Apollo.QueryHookOptions<GetDocumentenQuery, GetDocumentenQueryVariables> & ({ variables: GetDocumentenQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDocumentenQuery, GetDocumentenQueryVariables>(GetDocumentenDocument, options);
      }
export function useGetDocumentenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDocumentenQuery, GetDocumentenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDocumentenQuery, GetDocumentenQueryVariables>(GetDocumentenDocument, options);
        }
export function useGetDocumentenSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDocumentenQuery, GetDocumentenQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDocumentenQuery, GetDocumentenQueryVariables>(GetDocumentenDocument, options);
        }
export type GetDocumentenQueryHookResult = ReturnType<typeof useGetDocumentenQuery>;
export type GetDocumentenLazyQueryHookResult = ReturnType<typeof useGetDocumentenLazyQuery>;
export type GetDocumentenSuspenseQueryHookResult = ReturnType<typeof useGetDocumentenSuspenseQuery>;
export type GetDocumentenQueryResult = Apollo.QueryResult<GetDocumentenQuery, GetDocumentenQueryVariables>;
export const GetFormDefinitionByIdDocument = gql`
    query GetFormDefinitionById($id: String!) {
  getFormDefinitionById(id: $id) {
    formDefinition
  }
}
    `;

/**
 * __useGetFormDefinitionByIdQuery__
 *
 * To run a query within a React component, call `useGetFormDefinitionByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFormDefinitionByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFormDefinitionByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetFormDefinitionByIdQuery(baseOptions: Apollo.QueryHookOptions<GetFormDefinitionByIdQuery, GetFormDefinitionByIdQueryVariables> & ({ variables: GetFormDefinitionByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFormDefinitionByIdQuery, GetFormDefinitionByIdQueryVariables>(GetFormDefinitionByIdDocument, options);
      }
export function useGetFormDefinitionByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFormDefinitionByIdQuery, GetFormDefinitionByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFormDefinitionByIdQuery, GetFormDefinitionByIdQueryVariables>(GetFormDefinitionByIdDocument, options);
        }
export function useGetFormDefinitionByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetFormDefinitionByIdQuery, GetFormDefinitionByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFormDefinitionByIdQuery, GetFormDefinitionByIdQueryVariables>(GetFormDefinitionByIdDocument, options);
        }
export type GetFormDefinitionByIdQueryHookResult = ReturnType<typeof useGetFormDefinitionByIdQuery>;
export type GetFormDefinitionByIdLazyQueryHookResult = ReturnType<typeof useGetFormDefinitionByIdLazyQuery>;
export type GetFormDefinitionByIdSuspenseQueryHookResult = ReturnType<typeof useGetFormDefinitionByIdSuspenseQuery>;
export type GetFormDefinitionByIdQueryResult = Apollo.QueryResult<GetFormDefinitionByIdQuery, GetFormDefinitionByIdQueryVariables>;
export const GetFormDefinitionByObjectenApiUrlDocument = gql`
    query GetFormDefinitionByObjectenApiUrl($url: String!) {
  getFormDefinitionByObjectenApiUrl(url: $url) {
    formDefinition
  }
}
    `;

/**
 * __useGetFormDefinitionByObjectenApiUrlQuery__
 *
 * To run a query within a React component, call `useGetFormDefinitionByObjectenApiUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFormDefinitionByObjectenApiUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFormDefinitionByObjectenApiUrlQuery({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useGetFormDefinitionByObjectenApiUrlQuery(baseOptions: Apollo.QueryHookOptions<GetFormDefinitionByObjectenApiUrlQuery, GetFormDefinitionByObjectenApiUrlQueryVariables> & ({ variables: GetFormDefinitionByObjectenApiUrlQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFormDefinitionByObjectenApiUrlQuery, GetFormDefinitionByObjectenApiUrlQueryVariables>(GetFormDefinitionByObjectenApiUrlDocument, options);
      }
export function useGetFormDefinitionByObjectenApiUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFormDefinitionByObjectenApiUrlQuery, GetFormDefinitionByObjectenApiUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFormDefinitionByObjectenApiUrlQuery, GetFormDefinitionByObjectenApiUrlQueryVariables>(GetFormDefinitionByObjectenApiUrlDocument, options);
        }
export function useGetFormDefinitionByObjectenApiUrlSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetFormDefinitionByObjectenApiUrlQuery, GetFormDefinitionByObjectenApiUrlQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFormDefinitionByObjectenApiUrlQuery, GetFormDefinitionByObjectenApiUrlQueryVariables>(GetFormDefinitionByObjectenApiUrlDocument, options);
        }
export type GetFormDefinitionByObjectenApiUrlQueryHookResult = ReturnType<typeof useGetFormDefinitionByObjectenApiUrlQuery>;
export type GetFormDefinitionByObjectenApiUrlLazyQueryHookResult = ReturnType<typeof useGetFormDefinitionByObjectenApiUrlLazyQuery>;
export type GetFormDefinitionByObjectenApiUrlSuspenseQueryHookResult = ReturnType<typeof useGetFormDefinitionByObjectenApiUrlSuspenseQuery>;
export type GetFormDefinitionByObjectenApiUrlQueryResult = Apollo.QueryResult<GetFormDefinitionByObjectenApiUrlQuery, GetFormDefinitionByObjectenApiUrlQueryVariables>;
export const GetFormDefinitionByNameDocument = gql`
    query GetFormDefinitionByName($name: String!) {
  getFormDefinitionByName(name: $name) {
    formDefinition
  }
}
    `;

/**
 * __useGetFormDefinitionByNameQuery__
 *
 * To run a query within a React component, call `useGetFormDefinitionByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFormDefinitionByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFormDefinitionByNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetFormDefinitionByNameQuery(baseOptions: Apollo.QueryHookOptions<GetFormDefinitionByNameQuery, GetFormDefinitionByNameQueryVariables> & ({ variables: GetFormDefinitionByNameQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFormDefinitionByNameQuery, GetFormDefinitionByNameQueryVariables>(GetFormDefinitionByNameDocument, options);
      }
export function useGetFormDefinitionByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFormDefinitionByNameQuery, GetFormDefinitionByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFormDefinitionByNameQuery, GetFormDefinitionByNameQueryVariables>(GetFormDefinitionByNameDocument, options);
        }
export function useGetFormDefinitionByNameSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetFormDefinitionByNameQuery, GetFormDefinitionByNameQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFormDefinitionByNameQuery, GetFormDefinitionByNameQueryVariables>(GetFormDefinitionByNameDocument, options);
        }
export type GetFormDefinitionByNameQueryHookResult = ReturnType<typeof useGetFormDefinitionByNameQuery>;
export type GetFormDefinitionByNameLazyQueryHookResult = ReturnType<typeof useGetFormDefinitionByNameLazyQuery>;
export type GetFormDefinitionByNameSuspenseQueryHookResult = ReturnType<typeof useGetFormDefinitionByNameSuspenseQuery>;
export type GetFormDefinitionByNameQueryResult = Apollo.QueryResult<GetFormDefinitionByNameQuery, GetFormDefinitionByNameQueryVariables>;
export const GetPortaalFormulierByIdV2Document = gql`
    query GetPortaalFormulierByIdV2($id: UUID!) {
  getTaakByIdV2(id: $id) {
    id
    portaalformulier {
      formulier {
        soort
        value
      }
      data
    }
    titel
    status
    verloopdatum
  }
}
    `;

/**
 * __useGetPortaalFormulierByIdV2Query__
 *
 * To run a query within a React component, call `useGetPortaalFormulierByIdV2Query` and pass it any options that fit your needs.
 * When your component renders, `useGetPortaalFormulierByIdV2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPortaalFormulierByIdV2Query({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPortaalFormulierByIdV2Query(baseOptions: Apollo.QueryHookOptions<GetPortaalFormulierByIdV2Query, GetPortaalFormulierByIdV2QueryVariables> & ({ variables: GetPortaalFormulierByIdV2QueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPortaalFormulierByIdV2Query, GetPortaalFormulierByIdV2QueryVariables>(GetPortaalFormulierByIdV2Document, options);
      }
export function useGetPortaalFormulierByIdV2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPortaalFormulierByIdV2Query, GetPortaalFormulierByIdV2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPortaalFormulierByIdV2Query, GetPortaalFormulierByIdV2QueryVariables>(GetPortaalFormulierByIdV2Document, options);
        }
export function useGetPortaalFormulierByIdV2SuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPortaalFormulierByIdV2Query, GetPortaalFormulierByIdV2QueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPortaalFormulierByIdV2Query, GetPortaalFormulierByIdV2QueryVariables>(GetPortaalFormulierByIdV2Document, options);
        }
export type GetPortaalFormulierByIdV2QueryHookResult = ReturnType<typeof useGetPortaalFormulierByIdV2Query>;
export type GetPortaalFormulierByIdV2LazyQueryHookResult = ReturnType<typeof useGetPortaalFormulierByIdV2LazyQuery>;
export type GetPortaalFormulierByIdV2SuspenseQueryHookResult = ReturnType<typeof useGetPortaalFormulierByIdV2SuspenseQuery>;
export type GetPortaalFormulierByIdV2QueryResult = Apollo.QueryResult<GetPortaalFormulierByIdV2Query, GetPortaalFormulierByIdV2QueryVariables>;
export const GetGemachtigdeV2Document = gql`
    query GetGemachtigdeV2 {
  getGemachtigdeV2 {
    persoon {
      naam {
        voornamen
        officialLastName
      }
    }
    bedrijf {
      naam
    }
  }
}
    `;

/**
 * __useGetGemachtigdeV2Query__
 *
 * To run a query within a React component, call `useGetGemachtigdeV2Query` and pass it any options that fit your needs.
 * When your component renders, `useGetGemachtigdeV2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGemachtigdeV2Query({
 *   variables: {
 *   },
 * });
 */
export function useGetGemachtigdeV2Query(baseOptions?: Apollo.QueryHookOptions<GetGemachtigdeV2Query, GetGemachtigdeV2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGemachtigdeV2Query, GetGemachtigdeV2QueryVariables>(GetGemachtigdeV2Document, options);
      }
export function useGetGemachtigdeV2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGemachtigdeV2Query, GetGemachtigdeV2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGemachtigdeV2Query, GetGemachtigdeV2QueryVariables>(GetGemachtigdeV2Document, options);
        }
export function useGetGemachtigdeV2SuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetGemachtigdeV2Query, GetGemachtigdeV2QueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGemachtigdeV2Query, GetGemachtigdeV2QueryVariables>(GetGemachtigdeV2Document, options);
        }
export type GetGemachtigdeV2QueryHookResult = ReturnType<typeof useGetGemachtigdeV2Query>;
export type GetGemachtigdeV2LazyQueryHookResult = ReturnType<typeof useGetGemachtigdeV2LazyQuery>;
export type GetGemachtigdeV2SuspenseQueryHookResult = ReturnType<typeof useGetGemachtigdeV2SuspenseQuery>;
export type GetGemachtigdeV2QueryResult = Apollo.QueryResult<GetGemachtigdeV2Query, GetGemachtigdeV2QueryVariables>;
export const GetOpenProductenByThemaDocument = gql`
    query getOpenProductenByThema($themaId: UUID!) {
  getOpenProductenByThema(themaId: $themaId) {
    uuid
    naam
    startDatum
    eindDatum
    taken {
      id
      titel
      verloopdatum
      koppeling {
        registratie
        value
      }
    }
    zaken {
      uuid
      omschrijving
      identificatie
      status {
        statustype {
          isEindstatus
        }
      }
      zaaktype {
        identificatie
      }
    }
  }
}
    `;

/**
 * __useGetOpenProductenByThemaQuery__
 *
 * To run a query within a React component, call `useGetOpenProductenByThemaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOpenProductenByThemaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOpenProductenByThemaQuery({
 *   variables: {
 *      themaId: // value for 'themaId'
 *   },
 * });
 */
export function useGetOpenProductenByThemaQuery(baseOptions: Apollo.QueryHookOptions<GetOpenProductenByThemaQuery, GetOpenProductenByThemaQueryVariables> & ({ variables: GetOpenProductenByThemaQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOpenProductenByThemaQuery, GetOpenProductenByThemaQueryVariables>(GetOpenProductenByThemaDocument, options);
      }
export function useGetOpenProductenByThemaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOpenProductenByThemaQuery, GetOpenProductenByThemaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOpenProductenByThemaQuery, GetOpenProductenByThemaQueryVariables>(GetOpenProductenByThemaDocument, options);
        }
export function useGetOpenProductenByThemaSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOpenProductenByThemaQuery, GetOpenProductenByThemaQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOpenProductenByThemaQuery, GetOpenProductenByThemaQueryVariables>(GetOpenProductenByThemaDocument, options);
        }
export type GetOpenProductenByThemaQueryHookResult = ReturnType<typeof useGetOpenProductenByThemaQuery>;
export type GetOpenProductenByThemaLazyQueryHookResult = ReturnType<typeof useGetOpenProductenByThemaLazyQuery>;
export type GetOpenProductenByThemaSuspenseQueryHookResult = ReturnType<typeof useGetOpenProductenByThemaSuspenseQuery>;
export type GetOpenProductenByThemaQueryResult = Apollo.QueryResult<GetOpenProductenByThemaQuery, GetOpenProductenByThemaQueryVariables>;
export const GetOpenProductHoofdThemasDocument = gql`
    query getOpenProductHoofdThemas {
  getOpenProductHoofdThemas {
    uuid
    naam
  }
}
    `;

/**
 * __useGetOpenProductHoofdThemasQuery__
 *
 * To run a query within a React component, call `useGetOpenProductHoofdThemasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOpenProductHoofdThemasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOpenProductHoofdThemasQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOpenProductHoofdThemasQuery(baseOptions?: Apollo.QueryHookOptions<GetOpenProductHoofdThemasQuery, GetOpenProductHoofdThemasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOpenProductHoofdThemasQuery, GetOpenProductHoofdThemasQueryVariables>(GetOpenProductHoofdThemasDocument, options);
      }
export function useGetOpenProductHoofdThemasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOpenProductHoofdThemasQuery, GetOpenProductHoofdThemasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOpenProductHoofdThemasQuery, GetOpenProductHoofdThemasQueryVariables>(GetOpenProductHoofdThemasDocument, options);
        }
export function useGetOpenProductHoofdThemasSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOpenProductHoofdThemasQuery, GetOpenProductHoofdThemasQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOpenProductHoofdThemasQuery, GetOpenProductHoofdThemasQueryVariables>(GetOpenProductHoofdThemasDocument, options);
        }
export type GetOpenProductHoofdThemasQueryHookResult = ReturnType<typeof useGetOpenProductHoofdThemasQuery>;
export type GetOpenProductHoofdThemasLazyQueryHookResult = ReturnType<typeof useGetOpenProductHoofdThemasLazyQuery>;
export type GetOpenProductHoofdThemasSuspenseQueryHookResult = ReturnType<typeof useGetOpenProductHoofdThemasSuspenseQuery>;
export type GetOpenProductHoofdThemasQueryResult = Apollo.QueryResult<GetOpenProductHoofdThemasQuery, GetOpenProductHoofdThemasQueryVariables>;
export const GetOpenProductThemaTakenDocument = gql`
    query getOpenProductThemaTaken($id: UUID!, $pageSize: Int) {
  getOpenProductThemaTaken(id: $id, pageSize: $pageSize) {
    id
    soort
    koppeling {
      registratie
      value
    }
    url {
      uri
    }
    portaalformulier {
      formulier {
        soort
        value
      }
    }
    titel
    status
    verloopdatum
  }
}
    `;

/**
 * __useGetOpenProductThemaTakenQuery__
 *
 * To run a query within a React component, call `useGetOpenProductThemaTakenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOpenProductThemaTakenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOpenProductThemaTakenQuery({
 *   variables: {
 *      id: // value for 'id'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useGetOpenProductThemaTakenQuery(baseOptions: Apollo.QueryHookOptions<GetOpenProductThemaTakenQuery, GetOpenProductThemaTakenQueryVariables> & ({ variables: GetOpenProductThemaTakenQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOpenProductThemaTakenQuery, GetOpenProductThemaTakenQueryVariables>(GetOpenProductThemaTakenDocument, options);
      }
export function useGetOpenProductThemaTakenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOpenProductThemaTakenQuery, GetOpenProductThemaTakenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOpenProductThemaTakenQuery, GetOpenProductThemaTakenQueryVariables>(GetOpenProductThemaTakenDocument, options);
        }
export function useGetOpenProductThemaTakenSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOpenProductThemaTakenQuery, GetOpenProductThemaTakenQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOpenProductThemaTakenQuery, GetOpenProductThemaTakenQueryVariables>(GetOpenProductThemaTakenDocument, options);
        }
export type GetOpenProductThemaTakenQueryHookResult = ReturnType<typeof useGetOpenProductThemaTakenQuery>;
export type GetOpenProductThemaTakenLazyQueryHookResult = ReturnType<typeof useGetOpenProductThemaTakenLazyQuery>;
export type GetOpenProductThemaTakenSuspenseQueryHookResult = ReturnType<typeof useGetOpenProductThemaTakenSuspenseQuery>;
export type GetOpenProductThemaTakenQueryResult = Apollo.QueryResult<GetOpenProductThemaTakenQuery, GetOpenProductThemaTakenQueryVariables>;
export const GetOpenProductThemaZakenDocument = gql`
    query getOpenProductThemaZaken($id: UUID!, $pageSize: Int, $isOpen: Boolean) {
  getOpenProductThemaZaken(id: $id, pageSize: $pageSize, isOpen: $isOpen) {
    uuid
    omschrijving
    identificatie
    zaaktype {
      identificatie
    }
    startdatum
    status {
      statustype {
        isEindstatus
      }
    }
  }
}
    `;

/**
 * __useGetOpenProductThemaZakenQuery__
 *
 * To run a query within a React component, call `useGetOpenProductThemaZakenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOpenProductThemaZakenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOpenProductThemaZakenQuery({
 *   variables: {
 *      id: // value for 'id'
 *      pageSize: // value for 'pageSize'
 *      isOpen: // value for 'isOpen'
 *   },
 * });
 */
export function useGetOpenProductThemaZakenQuery(baseOptions: Apollo.QueryHookOptions<GetOpenProductThemaZakenQuery, GetOpenProductThemaZakenQueryVariables> & ({ variables: GetOpenProductThemaZakenQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOpenProductThemaZakenQuery, GetOpenProductThemaZakenQueryVariables>(GetOpenProductThemaZakenDocument, options);
      }
export function useGetOpenProductThemaZakenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOpenProductThemaZakenQuery, GetOpenProductThemaZakenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOpenProductThemaZakenQuery, GetOpenProductThemaZakenQueryVariables>(GetOpenProductThemaZakenDocument, options);
        }
export function useGetOpenProductThemaZakenSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOpenProductThemaZakenQuery, GetOpenProductThemaZakenQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOpenProductThemaZakenQuery, GetOpenProductThemaZakenQueryVariables>(GetOpenProductThemaZakenDocument, options);
        }
export type GetOpenProductThemaZakenQueryHookResult = ReturnType<typeof useGetOpenProductThemaZakenQuery>;
export type GetOpenProductThemaZakenLazyQueryHookResult = ReturnType<typeof useGetOpenProductThemaZakenLazyQuery>;
export type GetOpenProductThemaZakenSuspenseQueryHookResult = ReturnType<typeof useGetOpenProductThemaZakenSuspenseQuery>;
export type GetOpenProductThemaZakenQueryResult = Apollo.QueryResult<GetOpenProductThemaZakenQuery, GetOpenProductThemaZakenQueryVariables>;
export const GetOpenProductDocument = gql`
    query GetOpenProduct($id: UUID!) {
  getOpenProduct(id: $id) {
    uuid
    url
    naam
    startDatum
    gepubliceerd
    aanmaakDatum
    producttype {
      code
      uniformeProductNaam
      toegestaneStatussen
    }
    prijs
    gepubliceerd
    status
    documenten {
      url
    }
    frequentie
    verbruiksobject
    dataobject
    decisions
    zaken {
      uuid
      omschrijving
      identificatie
      zaaktype {
        identificatie
      }
      startdatum
      status {
        statustype {
          isEindstatus
        }
      }
    }
    taken {
      id
      soort
      koppeling {
        registratie
        value
      }
      url {
        uri
      }
      portaalformulier {
        formulier {
          soort
          value
        }
      }
      ogonebetaling {
        bedrag
        betaalkenmerk
        pspid
      }
      titel
      status
      verloopdatum
    }
  }
}
    `;

/**
 * __useGetOpenProductQuery__
 *
 * To run a query within a React component, call `useGetOpenProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOpenProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOpenProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOpenProductQuery(baseOptions: Apollo.QueryHookOptions<GetOpenProductQuery, GetOpenProductQueryVariables> & ({ variables: GetOpenProductQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOpenProductQuery, GetOpenProductQueryVariables>(GetOpenProductDocument, options);
      }
export function useGetOpenProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOpenProductQuery, GetOpenProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOpenProductQuery, GetOpenProductQueryVariables>(GetOpenProductDocument, options);
        }
export function useGetOpenProductSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOpenProductQuery, GetOpenProductQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOpenProductQuery, GetOpenProductQueryVariables>(GetOpenProductDocument, options);
        }
export type GetOpenProductQueryHookResult = ReturnType<typeof useGetOpenProductQuery>;
export type GetOpenProductLazyQueryHookResult = ReturnType<typeof useGetOpenProductLazyQuery>;
export type GetOpenProductSuspenseQueryHookResult = ReturnType<typeof useGetOpenProductSuspenseQuery>;
export type GetOpenProductQueryResult = Apollo.QueryResult<GetOpenProductQuery, GetOpenProductQueryVariables>;
export const GetOpenProductenDocument = gql`
    query GetOpenProducten($pageNumber: Int, $pageSize: Int, $status: String, $productTypeCode: String, $productTypeId: String, $productTypeCodes: [String!], $productTypeIds: [String!]) {
  getOpenProducten(
    pageNumber: $pageNumber
    pageSize: $pageSize
    status: $status
    productTypeCode: $productTypeCode
    productTypeId: $productTypeId
    productTypeCodes: $productTypeCodes
    productTypeIds: $productTypeIds
  ) {
    number
    size
    totalElements
    numberOfElements
    totalPages
    content {
      uuid
      url
      naam
      startDatum
      gepubliceerd
      aanmaakDatum
      producttype {
        code
        uniformeProductNaam
        toegestaneStatussen
      }
      prijs
      gepubliceerd
      status
      documenten {
        url
      }
      frequentie
      verbruiksobject
      dataobject
    }
  }
}
    `;

/**
 * __useGetOpenProductenQuery__
 *
 * To run a query within a React component, call `useGetOpenProductenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOpenProductenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOpenProductenQuery({
 *   variables: {
 *      pageNumber: // value for 'pageNumber'
 *      pageSize: // value for 'pageSize'
 *      status: // value for 'status'
 *      productTypeCode: // value for 'productTypeCode'
 *      productTypeId: // value for 'productTypeId'
 *      productTypeCodes: // value for 'productTypeCodes'
 *      productTypeIds: // value for 'productTypeIds'
 *   },
 * });
 */
export function useGetOpenProductenQuery(baseOptions?: Apollo.QueryHookOptions<GetOpenProductenQuery, GetOpenProductenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOpenProductenQuery, GetOpenProductenQueryVariables>(GetOpenProductenDocument, options);
      }
export function useGetOpenProductenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOpenProductenQuery, GetOpenProductenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOpenProductenQuery, GetOpenProductenQueryVariables>(GetOpenProductenDocument, options);
        }
export function useGetOpenProductenSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOpenProductenQuery, GetOpenProductenQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOpenProductenQuery, GetOpenProductenQueryVariables>(GetOpenProductenDocument, options);
        }
export type GetOpenProductenQueryHookResult = ReturnType<typeof useGetOpenProductenQuery>;
export type GetOpenProductenLazyQueryHookResult = ReturnType<typeof useGetOpenProductenLazyQuery>;
export type GetOpenProductenSuspenseQueryHookResult = ReturnType<typeof useGetOpenProductenSuspenseQuery>;
export type GetOpenProductenQueryResult = Apollo.QueryResult<GetOpenProductenQuery, GetOpenProductenQueryVariables>;
export const GetPersoonV2Document = gql`
    query GetPersoonV2 {
  getPersoonV2 {
    burgerservicenummer
    geslacht {
      omschrijving
    }
    bewonersAantal
    geheimhoudingPersoonsgegevens
    naam {
      voornamen
      officialLastName
    }
    verblijfplaats {
      verblijfadres {
        officieleStraatnaam
        huisnummer
        huisletter
        huisnummertoevoeging
        postcode
        woonplaats
      }
      datumVan {
        datum
        langFormaat
        type
      }
    }
    geboorte {
      datum {
        datum
        langFormaat
        type
      }
      land {
        code
        omschrijving
      }
      plaats {
        code
        omschrijving
      }
    }
    nationaliteiten {
      nationaliteit {
        code
        omschrijving
      }
    }
  }
}
    `;

/**
 * __useGetPersoonV2Query__
 *
 * To run a query within a React component, call `useGetPersoonV2Query` and pass it any options that fit your needs.
 * When your component renders, `useGetPersoonV2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPersoonV2Query({
 *   variables: {
 *   },
 * });
 */
export function useGetPersoonV2Query(baseOptions?: Apollo.QueryHookOptions<GetPersoonV2Query, GetPersoonV2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPersoonV2Query, GetPersoonV2QueryVariables>(GetPersoonV2Document, options);
      }
export function useGetPersoonV2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPersoonV2Query, GetPersoonV2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPersoonV2Query, GetPersoonV2QueryVariables>(GetPersoonV2Document, options);
        }
export function useGetPersoonV2SuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPersoonV2Query, GetPersoonV2QueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPersoonV2Query, GetPersoonV2QueryVariables>(GetPersoonV2Document, options);
        }
export type GetPersoonV2QueryHookResult = ReturnType<typeof useGetPersoonV2Query>;
export type GetPersoonV2LazyQueryHookResult = ReturnType<typeof useGetPersoonV2LazyQuery>;
export type GetPersoonV2SuspenseQueryHookResult = ReturnType<typeof useGetPersoonV2SuspenseQuery>;
export type GetPersoonV2QueryResult = Apollo.QueryResult<GetPersoonV2Query, GetPersoonV2QueryVariables>;
export const GetProductTakenDocument = gql`
    query GetProductTaken($productName: String!, $pageSize: Int) {
  getProductTaken(productName: $productName, pageSize: $pageSize) {
    id
    soort
    koppeling {
      registratie
      value
    }
    url {
      uri
    }
    portaalformulier {
      formulier {
        soort
        value
      }
    }
    titel
    status
    verloopdatum
  }
}
    `;

/**
 * __useGetProductTakenQuery__
 *
 * To run a query within a React component, call `useGetProductTakenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductTakenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductTakenQuery({
 *   variables: {
 *      productName: // value for 'productName'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useGetProductTakenQuery(baseOptions: Apollo.QueryHookOptions<GetProductTakenQuery, GetProductTakenQueryVariables> & ({ variables: GetProductTakenQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductTakenQuery, GetProductTakenQueryVariables>(GetProductTakenDocument, options);
      }
export function useGetProductTakenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductTakenQuery, GetProductTakenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductTakenQuery, GetProductTakenQueryVariables>(GetProductTakenDocument, options);
        }
export function useGetProductTakenSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProductTakenQuery, GetProductTakenQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductTakenQuery, GetProductTakenQueryVariables>(GetProductTakenDocument, options);
        }
export type GetProductTakenQueryHookResult = ReturnType<typeof useGetProductTakenQuery>;
export type GetProductTakenLazyQueryHookResult = ReturnType<typeof useGetProductTakenLazyQuery>;
export type GetProductTakenSuspenseQueryHookResult = ReturnType<typeof useGetProductTakenSuspenseQuery>;
export type GetProductTakenQueryResult = Apollo.QueryResult<GetProductTakenQuery, GetProductTakenQueryVariables>;
export const GetProductVerbruiksObjectenDocument = gql`
    query GetProductVerbruiksObjecten($productId: UUID!) {
  getProductVerbruiksObjecten(productId: $productId) {
    id
    soort
    productInstantie
    data
  }
}
    `;

/**
 * __useGetProductVerbruiksObjectenQuery__
 *
 * To run a query within a React component, call `useGetProductVerbruiksObjectenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductVerbruiksObjectenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductVerbruiksObjectenQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetProductVerbruiksObjectenQuery(baseOptions: Apollo.QueryHookOptions<GetProductVerbruiksObjectenQuery, GetProductVerbruiksObjectenQueryVariables> & ({ variables: GetProductVerbruiksObjectenQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductVerbruiksObjectenQuery, GetProductVerbruiksObjectenQueryVariables>(GetProductVerbruiksObjectenDocument, options);
      }
export function useGetProductVerbruiksObjectenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductVerbruiksObjectenQuery, GetProductVerbruiksObjectenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductVerbruiksObjectenQuery, GetProductVerbruiksObjectenQueryVariables>(GetProductVerbruiksObjectenDocument, options);
        }
export function useGetProductVerbruiksObjectenSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProductVerbruiksObjectenQuery, GetProductVerbruiksObjectenQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductVerbruiksObjectenQuery, GetProductVerbruiksObjectenQueryVariables>(GetProductVerbruiksObjectenDocument, options);
        }
export type GetProductVerbruiksObjectenQueryHookResult = ReturnType<typeof useGetProductVerbruiksObjectenQuery>;
export type GetProductVerbruiksObjectenLazyQueryHookResult = ReturnType<typeof useGetProductVerbruiksObjectenLazyQuery>;
export type GetProductVerbruiksObjectenSuspenseQueryHookResult = ReturnType<typeof useGetProductVerbruiksObjectenSuspenseQuery>;
export type GetProductVerbruiksObjectenQueryResult = Apollo.QueryResult<GetProductVerbruiksObjectenQuery, GetProductVerbruiksObjectenQueryVariables>;
export const GetProductZakenDocument = gql`
    query GetProductZaken($productName: String!, $pageSize: Int, $isOpen: Boolean) {
  getProductZaken(productName: $productName, pageSize: $pageSize, isOpen: $isOpen) {
    uuid
    omschrijving
    identificatie
    zaaktype {
      identificatie
    }
    startdatum
    status {
      statustype {
        isEindstatus
      }
    }
  }
}
    `;

/**
 * __useGetProductZakenQuery__
 *
 * To run a query within a React component, call `useGetProductZakenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductZakenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductZakenQuery({
 *   variables: {
 *      productName: // value for 'productName'
 *      pageSize: // value for 'pageSize'
 *      isOpen: // value for 'isOpen'
 *   },
 * });
 */
export function useGetProductZakenQuery(baseOptions: Apollo.QueryHookOptions<GetProductZakenQuery, GetProductZakenQueryVariables> & ({ variables: GetProductZakenQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductZakenQuery, GetProductZakenQueryVariables>(GetProductZakenDocument, options);
      }
export function useGetProductZakenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductZakenQuery, GetProductZakenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductZakenQuery, GetProductZakenQueryVariables>(GetProductZakenDocument, options);
        }
export function useGetProductZakenSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProductZakenQuery, GetProductZakenQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductZakenQuery, GetProductZakenQueryVariables>(GetProductZakenDocument, options);
        }
export type GetProductZakenQueryHookResult = ReturnType<typeof useGetProductZakenQuery>;
export type GetProductZakenLazyQueryHookResult = ReturnType<typeof useGetProductZakenLazyQuery>;
export type GetProductZakenSuspenseQueryHookResult = ReturnType<typeof useGetProductZakenSuspenseQuery>;
export type GetProductZakenQueryResult = Apollo.QueryResult<GetProductZakenQuery, GetProductZakenQueryVariables>;
export const GetProductDocument = gql`
    query GetProduct($id: UUID!) {
  getProduct(id: $id) {
    id
    verbruiksobjecten {
      id
      soort
      data
    }
    productDetails {
      id
      data
    }
    naam
    status
    geldigVan
    geldigTot
    zaken {
      uuid
      omschrijving
      identificatie
      zaaktype {
        identificatie
      }
      startdatum
      status {
        statustype {
          isEindstatus
        }
      }
    }
    taken {
      id
      soort
      koppeling {
        registratie
        value
      }
      url {
        uri
      }
      portaalformulier {
        formulier {
          soort
          value
        }
      }
      titel
      status
      verloopdatum
      ogonebetaling {
        bedrag
        betaalkenmerk
        pspid
      }
    }
  }
}
    `;

/**
 * __useGetProductQuery__
 *
 * To run a query within a React component, call `useGetProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProductQuery(baseOptions: Apollo.QueryHookOptions<GetProductQuery, GetProductQueryVariables> & ({ variables: GetProductQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options);
      }
export function useGetProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options);
        }
export function useGetProductSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options);
        }
export type GetProductQueryHookResult = ReturnType<typeof useGetProductQuery>;
export type GetProductLazyQueryHookResult = ReturnType<typeof useGetProductLazyQuery>;
export type GetProductSuspenseQueryHookResult = ReturnType<typeof useGetProductSuspenseQuery>;
export type GetProductQueryResult = Apollo.QueryResult<GetProductQuery, GetProductQueryVariables>;
export const GetProductenDocument = gql`
    query GetProducten($productName: String!, $pageNumber: Int, $pageSize: Int) {
  getProducten(
    productName: $productName
    pageNumber: $pageNumber
    pageSize: $pageSize
  ) {
    content {
      id
      productType {
        id
        naam
        zaaktypen
      }
      naam
      status
      geldigVan
      geldigTot
    }
    totalElements
    totalPages
  }
}
    `;

/**
 * __useGetProductenQuery__
 *
 * To run a query within a React component, call `useGetProductenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductenQuery({
 *   variables: {
 *      productName: // value for 'productName'
 *      pageNumber: // value for 'pageNumber'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useGetProductenQuery(baseOptions: Apollo.QueryHookOptions<GetProductenQuery, GetProductenQueryVariables> & ({ variables: GetProductenQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductenQuery, GetProductenQueryVariables>(GetProductenDocument, options);
      }
export function useGetProductenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductenQuery, GetProductenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductenQuery, GetProductenQueryVariables>(GetProductenDocument, options);
        }
export function useGetProductenSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProductenQuery, GetProductenQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductenQuery, GetProductenQueryVariables>(GetProductenDocument, options);
        }
export type GetProductenQueryHookResult = ReturnType<typeof useGetProductenQuery>;
export type GetProductenLazyQueryHookResult = ReturnType<typeof useGetProductenLazyQuery>;
export type GetProductenSuspenseQueryHookResult = ReturnType<typeof useGetProductenSuspenseQuery>;
export type GetProductenQueryResult = Apollo.QueryResult<GetProductenQuery, GetProductenQueryVariables>;
export const GetTaakByIdV2Document = gql`
    query GetTaakByIdV2($id: UUID!) {
  getTaakByIdV2(id: $id) {
    id
    soort
    koppeling {
      registratie
      value
    }
    url {
      uri
    }
    portaalformulier {
      formulier {
        soort
        value
      }
      data
    }
    titel
    status
    verloopdatum
  }
}
    `;

/**
 * __useGetTaakByIdV2Query__
 *
 * To run a query within a React component, call `useGetTaakByIdV2Query` and pass it any options that fit your needs.
 * When your component renders, `useGetTaakByIdV2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaakByIdV2Query({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTaakByIdV2Query(baseOptions: Apollo.QueryHookOptions<GetTaakByIdV2Query, GetTaakByIdV2QueryVariables> & ({ variables: GetTaakByIdV2QueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTaakByIdV2Query, GetTaakByIdV2QueryVariables>(GetTaakByIdV2Document, options);
      }
export function useGetTaakByIdV2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTaakByIdV2Query, GetTaakByIdV2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTaakByIdV2Query, GetTaakByIdV2QueryVariables>(GetTaakByIdV2Document, options);
        }
export function useGetTaakByIdV2SuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTaakByIdV2Query, GetTaakByIdV2QueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTaakByIdV2Query, GetTaakByIdV2QueryVariables>(GetTaakByIdV2Document, options);
        }
export type GetTaakByIdV2QueryHookResult = ReturnType<typeof useGetTaakByIdV2Query>;
export type GetTaakByIdV2LazyQueryHookResult = ReturnType<typeof useGetTaakByIdV2LazyQuery>;
export type GetTaakByIdV2SuspenseQueryHookResult = ReturnType<typeof useGetTaakByIdV2SuspenseQuery>;
export type GetTaakByIdV2QueryResult = Apollo.QueryResult<GetTaakByIdV2Query, GetTaakByIdV2QueryVariables>;
export const GetTakenV2Document = gql`
    query GetTakenV2($zaakId: UUID, $title: String, $pageNumber: Int, $pageSize: Int) {
  getTakenV2(
    zaakUUID: $zaakId
    title: $title
    pageNumber: $pageNumber
    pageSize: $pageSize
  ) {
    content {
      id
      soort
      koppeling {
        registratie
        value
      }
      url {
        uri
      }
      portaalformulier {
        formulier {
          soort
          value
        }
      }
      ogonebetaling {
        bedrag
        betaalkenmerk
        pspid
      }
      titel
      status
      verloopdatum
    }
    totalElements
    totalPages
  }
}
    `;

/**
 * __useGetTakenV2Query__
 *
 * To run a query within a React component, call `useGetTakenV2Query` and pass it any options that fit your needs.
 * When your component renders, `useGetTakenV2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTakenV2Query({
 *   variables: {
 *      zaakId: // value for 'zaakId'
 *      title: // value for 'title'
 *      pageNumber: // value for 'pageNumber'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useGetTakenV2Query(baseOptions?: Apollo.QueryHookOptions<GetTakenV2Query, GetTakenV2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTakenV2Query, GetTakenV2QueryVariables>(GetTakenV2Document, options);
      }
export function useGetTakenV2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTakenV2Query, GetTakenV2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTakenV2Query, GetTakenV2QueryVariables>(GetTakenV2Document, options);
        }
export function useGetTakenV2SuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTakenV2Query, GetTakenV2QueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTakenV2Query, GetTakenV2QueryVariables>(GetTakenV2Document, options);
        }
export type GetTakenV2QueryHookResult = ReturnType<typeof useGetTakenV2Query>;
export type GetTakenV2LazyQueryHookResult = ReturnType<typeof useGetTakenV2LazyQuery>;
export type GetTakenV2SuspenseQueryHookResult = ReturnType<typeof useGetTakenV2SuspenseQuery>;
export type GetTakenV2QueryResult = Apollo.QueryResult<GetTakenV2Query, GetTakenV2QueryVariables>;
export const GetUserDigitaleAdressenDocument = gql`
    query GetUserDigitaleAdressen {
  getUserDigitaleAdressen {
    uuid
    waarde
    type
    omschrijving
    referentie
  }
}
    `;

/**
 * __useGetUserDigitaleAdressenQuery__
 *
 * To run a query within a React component, call `useGetUserDigitaleAdressenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserDigitaleAdressenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserDigitaleAdressenQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserDigitaleAdressenQuery(baseOptions?: Apollo.QueryHookOptions<GetUserDigitaleAdressenQuery, GetUserDigitaleAdressenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserDigitaleAdressenQuery, GetUserDigitaleAdressenQueryVariables>(GetUserDigitaleAdressenDocument, options);
      }
export function useGetUserDigitaleAdressenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserDigitaleAdressenQuery, GetUserDigitaleAdressenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserDigitaleAdressenQuery, GetUserDigitaleAdressenQueryVariables>(GetUserDigitaleAdressenDocument, options);
        }
export function useGetUserDigitaleAdressenSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserDigitaleAdressenQuery, GetUserDigitaleAdressenQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserDigitaleAdressenQuery, GetUserDigitaleAdressenQueryVariables>(GetUserDigitaleAdressenDocument, options);
        }
export type GetUserDigitaleAdressenQueryHookResult = ReturnType<typeof useGetUserDigitaleAdressenQuery>;
export type GetUserDigitaleAdressenLazyQueryHookResult = ReturnType<typeof useGetUserDigitaleAdressenLazyQuery>;
export type GetUserDigitaleAdressenSuspenseQueryHookResult = ReturnType<typeof useGetUserDigitaleAdressenSuspenseQuery>;
export type GetUserDigitaleAdressenQueryResult = Apollo.QueryResult<GetUserDigitaleAdressenQuery, GetUserDigitaleAdressenQueryVariables>;
export const GetUserKlantContactenDocument = gql`
    query GetUserKlantContacten($identificatorType: OnderwerpObjectIndentificatorType!, $identificatorId: UUID!) {
  getUserKlantContacten(
    identificatorType: $identificatorType
    identificatorId: $identificatorId
  ) {
    uuid
    inhoud
    kanaal
    onderwerp
    plaatsgevondenOp
  }
}
    `;

/**
 * __useGetUserKlantContactenQuery__
 *
 * To run a query within a React component, call `useGetUserKlantContactenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserKlantContactenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserKlantContactenQuery({
 *   variables: {
 *      identificatorType: // value for 'identificatorType'
 *      identificatorId: // value for 'identificatorId'
 *   },
 * });
 */
export function useGetUserKlantContactenQuery(baseOptions: Apollo.QueryHookOptions<GetUserKlantContactenQuery, GetUserKlantContactenQueryVariables> & ({ variables: GetUserKlantContactenQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserKlantContactenQuery, GetUserKlantContactenQueryVariables>(GetUserKlantContactenDocument, options);
      }
export function useGetUserKlantContactenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserKlantContactenQuery, GetUserKlantContactenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserKlantContactenQuery, GetUserKlantContactenQueryVariables>(GetUserKlantContactenDocument, options);
        }
export function useGetUserKlantContactenSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserKlantContactenQuery, GetUserKlantContactenQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserKlantContactenQuery, GetUserKlantContactenQueryVariables>(GetUserKlantContactenDocument, options);
        }
export type GetUserKlantContactenQueryHookResult = ReturnType<typeof useGetUserKlantContactenQuery>;
export type GetUserKlantContactenLazyQueryHookResult = ReturnType<typeof useGetUserKlantContactenLazyQuery>;
export type GetUserKlantContactenSuspenseQueryHookResult = ReturnType<typeof useGetUserKlantContactenSuspenseQuery>;
export type GetUserKlantContactenQueryResult = Apollo.QueryResult<GetUserKlantContactenQuery, GetUserKlantContactenQueryVariables>;
export const GetZaakDocument = gql`
    query GetZaak($id: UUID!) {
  getZaak(id: $id) {
    uuid
    url
    omschrijving
    identificatie
    zaaktype {
      identificatie
      omschrijving
    }
    startdatum
    status {
      datumStatusGezet
      statustype {
        omschrijving
        isEindstatus
      }
      substatussen {
        uuid
        omschrijving
        tijdstip
      }
    }
    statusGeschiedenis {
      datumStatusGezet
      statustype {
        omschrijving
        isEindstatus
      }
      substatussen {
        uuid
        omschrijving
        tijdstip
      }
    }
    statussen {
      omschrijving
    }
    documenten {
      documentapi
      bestandsnaam
      bestandsomvang
      creatiedatum
      formaat
      identificatie
      titel
      uuid
    }
    zaakdetails {
      data
      zaak
    }
    resultaat {
      toelichting
      resultaattype {
        omschrijvingGeneriek
      }
    }
  }
}
    `;

/**
 * __useGetZaakQuery__
 *
 * To run a query within a React component, call `useGetZaakQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetZaakQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetZaakQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetZaakQuery(baseOptions: Apollo.QueryHookOptions<GetZaakQuery, GetZaakQueryVariables> & ({ variables: GetZaakQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetZaakQuery, GetZaakQueryVariables>(GetZaakDocument, options);
      }
export function useGetZaakLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetZaakQuery, GetZaakQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetZaakQuery, GetZaakQueryVariables>(GetZaakDocument, options);
        }
export function useGetZaakSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetZaakQuery, GetZaakQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetZaakQuery, GetZaakQueryVariables>(GetZaakDocument, options);
        }
export type GetZaakQueryHookResult = ReturnType<typeof useGetZaakQuery>;
export type GetZaakLazyQueryHookResult = ReturnType<typeof useGetZaakLazyQuery>;
export type GetZaakSuspenseQueryHookResult = ReturnType<typeof useGetZaakSuspenseQuery>;
export type GetZaakQueryResult = Apollo.QueryResult<GetZaakQuery, GetZaakQueryVariables>;
export const GetZakenDocument = gql`
    query GetZaken($page: Int, $pageSize: Int, $zaakTypeUrl: String, $isOpen: Boolean, $identificatie: String, $identificatieContains: String) {
  getZaken(
    page: $page
    pageSize: $pageSize
    zaakTypeUrl: $zaakTypeUrl
    isOpen: $isOpen
    identificatie: $identificatie
    identificatieContains: $identificatieContains
  ) {
    content {
      uuid
      omschrijving
      identificatie
      zaaktype {
        identificatie
      }
      startdatum
      status {
        statustype {
          isEindstatus
        }
      }
    }
    totalElements
    totalPages
  }
}
    `;

/**
 * __useGetZakenQuery__
 *
 * To run a query within a React component, call `useGetZakenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetZakenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetZakenQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      zaakTypeUrl: // value for 'zaakTypeUrl'
 *      isOpen: // value for 'isOpen'
 *      identificatie: // value for 'identificatie'
 *      identificatieContains: // value for 'identificatieContains'
 *   },
 * });
 */
export function useGetZakenQuery(baseOptions?: Apollo.QueryHookOptions<GetZakenQuery, GetZakenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetZakenQuery, GetZakenQueryVariables>(GetZakenDocument, options);
      }
export function useGetZakenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetZakenQuery, GetZakenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetZakenQuery, GetZakenQueryVariables>(GetZakenDocument, options);
        }
export function useGetZakenSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetZakenQuery, GetZakenQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetZakenQuery, GetZakenQueryVariables>(GetZakenDocument, options);
        }
export type GetZakenQueryHookResult = ReturnType<typeof useGetZakenQuery>;
export type GetZakenLazyQueryHookResult = ReturnType<typeof useGetZakenLazyQuery>;
export type GetZakenSuspenseQueryHookResult = ReturnType<typeof useGetZakenSuspenseQuery>;
export type GetZakenQueryResult = Apollo.QueryResult<GetZakenQuery, GetZakenQueryVariables>;