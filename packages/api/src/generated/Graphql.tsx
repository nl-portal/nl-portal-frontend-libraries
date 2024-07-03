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
};

export type Adres = {
  __typename?: 'Adres';
  huisnummer: Scalars['Int']['output'];
  indAfgeschermd: Scalars['String']['output'];
  land: Scalars['String']['output'];
  plaats: Scalars['String']['output'];
  postbusnummer: Scalars['Int']['output'];
  postcode: Scalars['String']['output'];
  straatnaam: Scalars['String']['output'];
  type: Scalars['String']['output'];
  volledigAdres: Scalars['String']['output'];
};

export type AutomatischIncassoResponse = {
  __typename?: 'AutomatischIncassoResponse';
  iban?: Maybe<Scalars['String']['output']>;
  klantnummer?: Maybe<Scalars['Int']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type CaseCreated = {
  __typename?: 'CaseCreated';
  caseId: Scalars['UUID']['output'];
};

export type CaseDefinition = {
  __typename?: 'CaseDefinition';
  id: Scalars['String']['output'];
  schema: Scalars['JSON']['output'];
  statusDefinition: Array<Scalars['String']['output']>;
};

export type CaseInstance = {
  __typename?: 'CaseInstance';
  caseDefinitionId: Scalars['String']['output'];
  createdOn: Scalars['String']['output'];
  externalId?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  status?: Maybe<Status>;
  statusHistory?: Maybe<Array<HistoricStatus>>;
  submission: Scalars['JSON']['output'];
  userId: Scalars['String']['output'];
};

export type CaseInstanceOrderingInput = {
  createdOn: Sort;
};

export type ContactMoment = {
  __typename?: 'ContactMoment';
  bronorganisatie?: Maybe<Scalars['String']['output']>;
  initiatiefnemer?: Maybe<Scalars['String']['output']>;
  kanaal: Scalars['String']['output'];
  medewerker?: Maybe<Scalars['String']['output']>;
  registratiedatum: Scalars['String']['output'];
  tekst: Scalars['String']['output'];
  volgendContactmoment?: Maybe<Scalars['String']['output']>;
  voorkeurskanaal?: Maybe<Scalars['String']['output']>;
  voorkeurstaal?: Maybe<Scalars['String']['output']>;
  vorigContactmoment?: Maybe<Scalars['String']['output']>;
};

export type ContactMomentPage = {
  __typename?: 'ContactMomentPage';
  content: Array<ContactMoment>;
  number: Scalars['Int']['output'];
  /** The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  size: Scalars['Int']['output'];
  totalElements: Scalars['Int']['output'];
  /** The total number of available pages */
  totalPages: Scalars['Int']['output'];
};

export type Contract = {
  __typename?: 'Contract';
  automatischeIncasso: Array<AutomatischIncassoResponse>;
  beginDatum: Scalars['String']['output'];
  eindDatum?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  klanten: Array<NeaKlant>;
  taken: Array<TaakV2>;
  zakelijkRechten: Array<ZakelijkRecht>;
  zaken: Array<Zaak>;
};

export type ContractBeperkt = {
  __typename?: 'ContractBeperkt';
  adressen: Array<NeaAdres>;
  id: Scalars['Int']['output'];
};

export type ContractBeperktPage = {
  __typename?: 'ContractBeperktPage';
  content: Array<ContractBeperkt>;
  number: Scalars['Int']['output'];
  /** The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  size: Scalars['Int']['output'];
  totalElements: Scalars['Int']['output'];
  /** The total number of available pages */
  totalPages: Scalars['Int']['output'];
};

export type DmnResponse = {
  __typename?: 'DmnResponse';
  result: DmnResult;
};

export type DmnResult = {
  __typename?: 'DmnResult';
  type: Scalars['String']['output'];
  value: Scalars['String']['output'];
  valueInfo?: Maybe<Scalars['String']['output']>;
};

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

export type Form = {
  __typename?: 'Form';
  name: Scalars['String']['output'];
  uuid: Scalars['UUID']['output'];
};

export type FormDefinition = {
  __typename?: 'FormDefinition';
  formDefinition: Scalars['JSON']['output'];
};

export type Gemachtigde = {
  __typename?: 'Gemachtigde';
  bedrijf?: Maybe<MaatschappelijkeActiviteit>;
  persoon?: Maybe<PersoonNaam>;
};

export type HandelsNaam = {
  __typename?: 'HandelsNaam';
  naam: Scalars['String']['output'];
  volgorde: Scalars['Int']['output'];
};

export type HistoricStatus = {
  __typename?: 'HistoricStatus';
  createdOn: Scalars['String']['output'];
  status: Status;
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

export type KadastraalObject = {
  __typename?: 'KadastraalObject';
  aanduiding: Scalars['String']['output'];
  adressen: Array<NeaAdres>;
  identificatie: Scalars['String']['output'];
};

export type Klant = {
  __typename?: 'Klant';
  emailadres?: Maybe<Scalars['String']['output']>;
  telefoonnummer?: Maybe<Scalars['String']['output']>;
};

export type KlantUpdateInput = {
  emailadres?: InputMaybe<Scalars['String']['input']>;
  telefoonnummer?: InputMaybe<Scalars['String']['input']>;
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
  /** Create Ogone payment with hash and fields */
  generateOgonePayment: OgonePayment;
  /** Prefill data to start a form. Don't use it till it is configured in ProductType */
  prefill: PrefillResponse;
  /** Convert submission to json return resulting data */
  processSubmission: CaseCreated;
  /** Submit a task */
  submitTaak: Taak;
  /** Submit a task */
  submitTaakV2: TaakV2;
  /** Submit a task */
  submitTask: Taak;
  /** Updates the profile for the user */
  updateBurgerProfiel?: Maybe<Klant>;
  /** Update product verbruiks object */
  updateProductVerbruiksObject: ProductVerbruiksObject;
};


export type MutationGenerateOgonePaymentArgs = {
  paymentRequest: OgonePaymentRequestInput;
};


export type MutationPrefillArgs = {
  formulier: Scalars['String']['input'];
  parameters: Scalars['JSON']['input'];
  productName: Scalars['String']['input'];
  productTypeId?: InputMaybe<Scalars['UUID']['input']>;
  staticData?: InputMaybe<Scalars['JSON']['input']>;
};


export type MutationProcessSubmissionArgs = {
  caseDefinitionId: Scalars['String']['input'];
  initialStatus?: InputMaybe<Scalars['String']['input']>;
  submission: Scalars['JSON']['input'];
};


export type MutationSubmitTaakArgs = {
  id: Scalars['UUID']['input'];
  submission: Scalars['JSON']['input'];
};


export type MutationSubmitTaakV2Args = {
  id: Scalars['UUID']['input'];
  submission: Scalars['JSON']['input'];
  version: Scalars['String']['input'];
};


export type MutationSubmitTaskArgs = {
  id: Scalars['UUID']['input'];
  submission: Scalars['JSON']['input'];
};


export type MutationUpdateBurgerProfielArgs = {
  klant: KlantUpdateInput;
};


export type MutationUpdateProductVerbruiksObjectArgs = {
  id: Scalars['UUID']['input'];
  submission: Scalars['JSON']['input'];
};

export type NeaAdres = {
  __typename?: 'NeaAdres';
  adresBuitenland?: Maybe<NeaAdresBuitenland>;
  adresseerbaarObjectId?: Maybe<Scalars['String']['output']>;
  huisletter?: Maybe<Scalars['String']['output']>;
  huisnummer?: Maybe<Scalars['Int']['output']>;
  huisnummertoevoeging?: Maybe<Scalars['String']['output']>;
  land?: Maybe<Scalars['String']['output']>;
  nummeraanduidingId?: Maybe<Scalars['String']['output']>;
  postbusnummer?: Maybe<Scalars['String']['output']>;
  postcode?: Maybe<Scalars['String']['output']>;
  straatnaam?: Maybe<Scalars['String']['output']>;
  woonplaats?: Maybe<Scalars['String']['output']>;
};

export type NeaAdresBuitenland = {
  __typename?: 'NeaAdresBuitenland';
  land?: Maybe<Scalars['String']['output']>;
  postcodeWoonplaats?: Maybe<Scalars['String']['output']>;
  regio?: Maybe<Scalars['String']['output']>;
  straatnaamHuisnummer?: Maybe<Scalars['String']['output']>;
};

export type NeaKlant = {
  __typename?: 'NeaKlant';
  organisatie?: Maybe<Organisatie>;
  persoon?: Maybe<NeaPersoon>;
};

export type NeaPersoon = {
  __typename?: 'NeaPersoon';
  achterNaam: Scalars['String']['output'];
  correspondentieAdres?: Maybe<NeaAdres>;
  emailAdres?: Maybe<Scalars['String']['output']>;
  klantnummer: Scalars['Int']['output'];
  subjectId: Scalars['Int']['output'];
  telefoonNummer?: Maybe<Scalars['String']['output']>;
  verblijfAdres: NeaAdres;
  volledigeNaam: Scalars['String']['output'];
  voorNaam?: Maybe<Scalars['String']['output']>;
  voorletters?: Maybe<Scalars['String']['output']>;
  voorvoegselAchternaam?: Maybe<Scalars['String']['output']>;
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

export type Organisatie = {
  __typename?: 'Organisatie';
  bezoekAdres: NeaAdres;
  correspondentieAdres?: Maybe<NeaAdres>;
  klantnummer: Scalars['Int']['output'];
  kvkNummer?: Maybe<Scalars['String']['output']>;
  naam: Scalars['String']['output'];
  rsin?: Maybe<Scalars['String']['output']>;
  vestigingsnummer?: Maybe<Scalars['String']['output']>;
};

export type PaymentField = {
  __typename?: 'PaymentField';
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type Persoon = {
  __typename?: 'Persoon';
  bewonersAantal?: Maybe<Scalars['Int']['output']>;
  burgerservicenummer?: Maybe<Scalars['String']['output']>;
  geboorte?: Maybe<PersoonDatumLandPlaats>;
  geheimhoudingPersoonsgegevens?: Maybe<Scalars['Boolean']['output']>;
  geslachtsaanduiding?: Maybe<Scalars['String']['output']>;
  kinderen?: Maybe<Array<PersoonKind>>;
  naam?: Maybe<PersoonNaam>;
  nationaliteiten?: Maybe<Array<PersoonNationaliteiten>>;
  opschortingBijhouding?: Maybe<PersoonOpschortingBijhouding>;
  ouders?: Maybe<Array<PersoonOuder>>;
  partners?: Maybe<Array<PersoonPartner>>;
  reisdocumentnummers?: Maybe<Array<Scalars['String']['output']>>;
  verblijfplaats?: Maybe<PersoonVerblijfplaats>;
};

export type PersoonCodeOmschrijving = {
  __typename?: 'PersoonCodeOmschrijving';
  code?: Maybe<Scalars['String']['output']>;
  omschrijving?: Maybe<Scalars['String']['output']>;
};

export type PersoonDatum = {
  __typename?: 'PersoonDatum';
  dag?: Maybe<Scalars['Int']['output']>;
  datum?: Maybe<Scalars['String']['output']>;
  jaar?: Maybe<Scalars['Int']['output']>;
  maand?: Maybe<Scalars['Int']['output']>;
};

export type PersoonDatumLandPlaats = {
  __typename?: 'PersoonDatumLandPlaats';
  datum?: Maybe<PersoonDatum>;
  land?: Maybe<PersoonCodeOmschrijving>;
  plaats?: Maybe<PersoonCodeOmschrijving>;
};

export type PersoonKind = {
  __typename?: 'PersoonKind';
  burgerservicenummer?: Maybe<Scalars['String']['output']>;
  geboorte?: Maybe<PersoonDatumLandPlaats>;
  leeftijd?: Maybe<Scalars['Int']['output']>;
  naam?: Maybe<PersoonNaam>;
};

export type PersoonNaam = {
  __typename?: 'PersoonNaam';
  aanhef?: Maybe<Scalars['String']['output']>;
  geslachtsnaam?: Maybe<Scalars['String']['output']>;
  voorletters?: Maybe<Scalars['String']['output']>;
  voornamen?: Maybe<Scalars['String']['output']>;
  voorvoegsel?: Maybe<Scalars['String']['output']>;
};

export type PersoonNationaliteit = {
  __typename?: 'PersoonNationaliteit';
  code?: Maybe<Scalars['String']['output']>;
  omschrijving?: Maybe<Scalars['String']['output']>;
};

export type PersoonNationaliteiten = {
  __typename?: 'PersoonNationaliteiten';
  nationaliteit?: Maybe<PersoonNationaliteit>;
};

export type PersoonOpschortingBijhouding = {
  __typename?: 'PersoonOpschortingBijhouding';
  datum?: Maybe<PersoonDatum>;
  reden?: Maybe<Scalars['String']['output']>;
};

export type PersoonOuder = {
  __typename?: 'PersoonOuder';
  burgerservicenummer?: Maybe<Scalars['String']['output']>;
  datumIngangFamilierechtelijkeBetrekking?: Maybe<PersoonDatum>;
  geboorte?: Maybe<PersoonDatumLandPlaats>;
  geslachtsaanduiding?: Maybe<Scalars['String']['output']>;
  naam?: Maybe<PersoonNaam>;
  ouderAanduiding?: Maybe<Scalars['String']['output']>;
};

export type PersoonPartner = {
  __typename?: 'PersoonPartner';
  aangaanHuwelijkPartnerschap?: Maybe<PersoonDatumLandPlaats>;
  burgerservicenummer?: Maybe<Scalars['String']['output']>;
  datumIngangFamilierechtelijkeBetrekking?: Maybe<PersoonDatum>;
  geboorte?: Maybe<PersoonDatumLandPlaats>;
  geslachtsaanduiding?: Maybe<Scalars['String']['output']>;
  naam?: Maybe<PersoonNaam>;
  soortVerbintenis?: Maybe<Scalars['String']['output']>;
};

export type PersoonVerblijfplaats = {
  __typename?: 'PersoonVerblijfplaats';
  adresseerbaarObjectIdentificatie?: Maybe<Scalars['String']['output']>;
  datumAanvangAdreshouding?: Maybe<PersoonDatum>;
  datumIngangGeldigheid?: Maybe<PersoonDatum>;
  datumInschrijvingInGemeente?: Maybe<PersoonDatum>;
  datumVestigingInNederland?: Maybe<PersoonDatum>;
  huisletter?: Maybe<Scalars['String']['output']>;
  huisnummer?: Maybe<Scalars['String']['output']>;
  huisnummertoevoeging?: Maybe<Scalars['String']['output']>;
  postcode?: Maybe<Scalars['String']['output']>;
  straat?: Maybe<Scalars['String']['output']>;
  woonplaats?: Maybe<Scalars['String']['output']>;
};

export type PrefillResponse = {
  __typename?: 'PrefillResponse';
  formulierUrl?: Maybe<Scalars['String']['output']>;
  hash: Scalars['String']['output'];
  objectId: Scalars['UUID']['output'];
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
  content: Array<Product>;
  number: Scalars['Int']['output'];
  /** The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  size: Scalars['Int']['output'];
  totalElements: Scalars['Int']['output'];
  /** The total number of available pages */
  totalPages: Scalars['Int']['output'];
};

export type ProductType = {
  __typename?: 'ProductType';
  /** Get list of available beslistabellen */
  beslistabellen?: Maybe<Array<Scalars['String']['output']>>;
  eigenschappen?: Maybe<Scalars['JSON']['output']>;
  id?: Maybe<Scalars['UUID']['output']>;
  naam: Scalars['String']['output'];
  omschrijving?: Maybe<Scalars['String']['output']>;
  parameters?: Maybe<Scalars['JSON']['output']>;
  /** Get list of available forms to prefill, with their object configurations */
  prefillFormulieren?: Maybe<Scalars['JSON']['output']>;
  productSubType?: Maybe<Scalars['String']['output']>;
  zaaktypen: Array<Scalars['UUID']['output']>;
};

export type ProductVerbruiksObject = {
  __typename?: 'ProductVerbruiksObject';
  data?: Maybe<Scalars['JSON']['output']>;
  id?: Maybe<Scalars['UUID']['output']>;
  productInstantie: Scalars['String']['output'];
  soort?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  /** retrieves all available case definitions */
  allCaseDefinitions: Array<CaseDefinition>;
  /** retrieves all available case instances */
  allCaseInstances: Array<CaseInstance>;
  /**
   * find all form definitions from repository
   * @deprecated This method is not used by the NL Portal frontend and is not being replaced.
   */
  allFormDefinitions: Array<FormDefinition>;
  /** Check automatische incasso by klantnummer */
  getAutomatischeIncasso: AutomatischIncassoResponse;
  /** Gets the bedrijf data */
  getBedrijf?: Maybe<MaatschappelijkeActiviteit>;
  /** Gets the number of people living in the same house of the adresseerbaarObjectIdentificatie */
  getBewonersAantal?: Maybe<Scalars['Int']['output']>;
  /** Gets the profile for the user */
  getBurgerProfiel?: Maybe<Klant>;
  /** retrieves single case instance from repository */
  getCaseInstance?: Maybe<CaseInstance>;
  /** Gets a document content by id as base64 encoded */
  getDocumentContent: DocumentContent;
  /** Get erfpacht contract by UUID */
  getErfpachtContract: Contract;
  /** Gets all erfpacht contracten of user or rsin */
  getErfpachtContracten: ContractBeperktPage;
  /**
   * find single form definition from repository or Objecten API
   * @deprecated Replaced by getFormDefinitionByName and getFormDefinitionByObjectenApiUrl, replace with getFormDefinitionByName or getFormDefinitionByObjectenApiUrl
   */
  getFormDefinitionById?: Maybe<FormDefinition>;
  /** find single form definition from repository */
  getFormDefinitionByName?: Maybe<FormDefinition>;
  /** find single form definition from the Objecten API */
  getFormDefinitionByObjectenApiUrl?: Maybe<FormDefinition>;
  /** Gets the forms available to the user */
  getFormList: Array<Form>;
  /** Gets the data of the gemachtigde */
  getGemachtigde: Gemachtigde;
  /** Gets the contactmomenten of a klant */
  getKlantContactMomenten?: Maybe<ContactMomentPage>;
  /** Gets the contactmomenten of a object(zaak) */
  getObjectContactMomenten?: Maybe<ContactMomentPage>;
  /** Gets the persoon data */
  getPersoon?: Maybe<Persoon>;
  /** Get product by id */
  getProduct?: Maybe<Product>;
  /** Get Product Decision by key. Don't use it till it is configured in ProductType */
  getProductDecision: Array<DmnResponse>;
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
  /** Get task by id */
  getTaakById: Taak;
  /** Get task by id V2 */
  getTaakByIdV2: TaakV2;
  /** Get a list of tasks. Optional filter for zaak */
  getTaken: TaakPage;
  /** Get a list of tasks. Optional filter for zaak V2 */
  getTakenV2: TaakPageV2;
  /**
   * Get a list of tasks
   * @deprecated Replaced by getTaken
   */
  getTasks: TaakPage;
  /** Gets a zaak by id */
  getZaak: Zaak;
  /**
   *
   *         Gets all zaken for the user
   *         isOpen is optional, when not available, all zaken will be returned
   *         isOpen is true, only zaken without enddate will be returned
   *         isOpen is false, only zaken with an enddate will be returned
   *
   */
  getZaken: ZaakPage;
};


export type QueryAllCaseInstancesArgs = {
  orderBy: CaseInstanceOrderingInput;
};


export type QueryGetAutomatischeIncassoArgs = {
  klantnummer?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetBewonersAantalArgs = {
  adresseerbaarObjectIdentificatie: Scalars['String']['input'];
};


export type QueryGetCaseInstanceArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryGetDocumentContentArgs = {
  documentApi: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type QueryGetErfpachtContractArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetErfpachtContractenArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  rsin?: InputMaybe<Scalars['String']['input']>;
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


export type QueryGetKlantContactMomentenArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetObjectContactMomentenArgs = {
  objectUrl: Scalars['String']['input'];
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetProductArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryGetProductDecisionArgs = {
  key: Scalars['String']['input'];
  productId: Scalars['UUID']['input'];
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


export type QueryGetTaakByIdArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryGetTaakByIdV2Args = {
  id: Scalars['UUID']['input'];
};


export type QueryGetTakenArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  zaakUUID?: InputMaybe<Scalars['UUID']['input']>;
};


export type QueryGetTakenV2Args = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  zaakUUID?: InputMaybe<Scalars['UUID']['input']>;
};


export type QueryGetTasksArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetZaakArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryGetZakenArgs = {
  isOpen?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  zaakTypeUrl?: InputMaybe<Scalars['String']['input']>;
};

export type SbiActiviteit = {
  __typename?: 'SbiActiviteit';
  indHoofdactiviteit: Scalars['String']['output'];
  sbiCode: Scalars['String']['output'];
  sbiOmschrijving: Scalars['String']['output'];
};

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Status = {
  __typename?: 'Status';
  createdOn: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type StatusType = {
  __typename?: 'StatusType';
  isEindstatus?: Maybe<Scalars['Boolean']['output']>;
  omschrijving?: Maybe<Scalars['String']['output']>;
};

export type Taak = {
  __typename?: 'Taak';
  data: Scalars['JSON']['output'];
  date: Scalars['String']['output'];
  /** @deprecated Use formulier type/value */
  formId: Scalars['String']['output'];
  formulier: TaakFormulier;
  id: Scalars['UUID']['output'];
  identificatie: TaakIdentificatie;
  objectId: Scalars['UUID']['output'];
  status: TaakStatus;
  title: Scalars['String']['output'];
  verloopdatum?: Maybe<Scalars['LocalDateTime']['output']>;
  zaak?: Maybe<Scalars['String']['output']>;
};

export type TaakForm = {
  __typename?: 'TaakForm';
  data: Scalars['JSON']['output'];
  formulier: TaakFormulierV2;
};

export type TaakFormulier = {
  __typename?: 'TaakFormulier';
  /** @deprecated To support old formulier types */
  convertFormulierType: Scalars['String']['output'];
  /** Will return only 'portalid', 'objecturl', 'externalurl' */
  formuliertype: Scalars['String']['output'];
  value: Scalars['String']['output'];
};


export type TaakFormulierConvertFormulierTypeArgs = {
  formuliertype: Scalars['String']['input'];
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
  registratie: TaakKoppelingRegistratie;
  uuid: Scalars['UUID']['output'];
};

export enum TaakKoppelingRegistratie {
  Product = 'PRODUCT',
  Zaak = 'ZAAK'
}

export type TaakPage = {
  __typename?: 'TaakPage';
  content: Array<Taak>;
  number: Scalars['Int']['output'];
  /** The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  size: Scalars['Int']['output'];
  totalElements: Scalars['Int']['output'];
  /** The total number of available pages */
  totalPages: Scalars['Int']['output'];
};

export type TaakPageV2 = {
  __typename?: 'TaakPageV2';
  content: Array<TaakV2>;
  number: Scalars['Int']['output'];
  /** The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  size: Scalars['Int']['output'];
  totalElements: Scalars['Int']['output'];
  /** The total number of available pages */
  totalPages: Scalars['Int']['output'];
};

export enum TaakStatus {
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
  formtaak?: Maybe<TaakForm>;
  id: Scalars['UUID']['output'];
  identificatie: TaakIdentificatie;
  koppeling: TaakKoppeling;
  ogonebetaling?: Maybe<OgoneBetaling>;
  soort: Scalars['String']['output'];
  status: TaakStatus;
  titel: Scalars['String']['output'];
  url?: Maybe<TaakUrl>;
  verloopdatum?: Maybe<Scalars['LocalDateTime']['output']>;
  version?: Maybe<Scalars['String']['output']>;
};

export type Zaak = {
  __typename?: 'Zaak';
  documenten: Array<Document>;
  identificatie: Scalars['String']['output'];
  omschrijving: Scalars['String']['output'];
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
  content: Array<Zaak>;
  number: Scalars['Int']['output'];
  /** The number of elements on this page */
  numberOfElements: Scalars['Int']['output'];
  size: Scalars['Int']['output'];
  totalElements: Scalars['Int']['output'];
  /** The total number of available pages */
  totalPages: Scalars['Int']['output'];
};

export type ZaakStatus = {
  __typename?: 'ZaakStatus';
  datumStatusGezet: Scalars['String']['output'];
  statustype: ZaakStatusType;
  uuid: Scalars['UUID']['output'];
};

export type ZaakStatusType = {
  __typename?: 'ZaakStatusType';
  isEindstatus: Scalars['Boolean']['output'];
  omschrijving: Scalars['String']['output'];
};

export type ZaakType = {
  __typename?: 'ZaakType';
  identificatie: Scalars['String']['output'];
  omschrijving: Scalars['String']['output'];
};

export type ZakelijkRecht = {
  __typename?: 'ZakelijkRecht';
  id: Scalars['Int']['output'];
  kadastraalObjecten: Array<KadastraalObject>;
  naam: Scalars['String']['output'];
};

export type FormulierFieldsFragment = { __typename?: 'TaakFormulier', formuliertype: string, value: string };

export type SubmitTaskMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  submission: Scalars['JSON']['input'];
}>;


export type SubmitTaskMutation = { __typename?: 'Mutation', submitTask: { __typename?: 'Taak', id: any, objectId: any, formId: string, title: string, status: TaakStatus, date: string } };

export type UpdateBurgerProfielMutationVariables = Exact<{
  klant: KlantUpdateInput;
}>;


export type UpdateBurgerProfielMutation = { __typename?: 'Mutation', updateBurgerProfiel?: { __typename?: 'Klant', emailadres?: string | null, telefoonnummer?: string | null } | null };

export type UpdateProductVerbruiksObjectMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  submission: Scalars['JSON']['input'];
}>;


export type UpdateProductVerbruiksObjectMutation = { __typename?: 'Mutation', updateProductVerbruiksObject: { __typename?: 'ProductVerbruiksObject', id?: any | null, data?: any | null, productInstantie: string, soort?: string | null } };

export type GetBedrijfQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBedrijfQuery = { __typename?: 'Query', getBedrijf?: { __typename?: 'MaatschappelijkeActiviteit', naam: string, kvkNummer: string, embedded?: { __typename?: 'Embedded', eigenaar: { __typename?: 'Eigenaar', rechtsvorm: string }, hoofdvestiging: { __typename?: 'Hoofdvestiging', adressen?: Array<{ __typename?: 'Adres', straatnaam: string, huisnummer: number, postcode: string, plaats: string }> | null } } | null } | null };

export type GetBurgerProfielQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBurgerProfielQuery = { __typename?: 'Query', getBurgerProfiel?: { __typename?: 'Klant', emailadres?: string | null, telefoonnummer?: string | null } | null };

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

export type GetGemachtigdeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGemachtigdeQuery = { __typename?: 'Query', getGemachtigde: { __typename?: 'Gemachtigde', persoon?: { __typename?: 'PersoonNaam', aanhef?: string | null, voorletters?: string | null, voornamen?: string | null, voorvoegsel?: string | null, geslachtsnaam?: string | null } | null, bedrijf?: { __typename?: 'MaatschappelijkeActiviteit', naam: string } | null } };

export type GetKlantContactMomentenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetKlantContactMomentenQuery = { __typename?: 'Query', getKlantContactMomenten?: { __typename?: 'ContactMomentPage', content: Array<{ __typename?: 'ContactMoment', tekst: string, kanaal: string, registratiedatum: string }> } | null };

export type GetObjectContactMomentenQueryVariables = Exact<{
  objectUrl: Scalars['String']['input'];
}>;


export type GetObjectContactMomentenQuery = { __typename?: 'Query', getObjectContactMomenten?: { __typename?: 'ContactMomentPage', content: Array<{ __typename?: 'ContactMoment', tekst: string, kanaal: string, registratiedatum: string }> } | null };

export type GetPersoonDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPersoonDataQuery = { __typename?: 'Query', getPersoon?: { __typename?: 'Persoon', burgerservicenummer?: string | null, geslachtsaanduiding?: string | null, bewonersAantal?: number | null, naam?: { __typename?: 'PersoonNaam', aanhef?: string | null, voorletters?: string | null, voornamen?: string | null, voorvoegsel?: string | null, geslachtsnaam?: string | null } | null, verblijfplaats?: { __typename?: 'PersoonVerblijfplaats', straat?: string | null, huisnummer?: string | null, huisletter?: string | null, huisnummertoevoeging?: string | null, postcode?: string | null, woonplaats?: string | null } | null, geboorte?: { __typename?: 'PersoonDatumLandPlaats', datum?: { __typename?: 'PersoonDatum', datum?: string | null, jaar?: number | null, maand?: number | null, dag?: number | null } | null, land?: { __typename?: 'PersoonCodeOmschrijving', code?: string | null, omschrijving?: string | null } | null } | null, nationaliteiten?: Array<{ __typename?: 'PersoonNationaliteiten', nationaliteit?: { __typename?: 'PersoonNationaliteit', code?: string | null, omschrijving?: string | null } | null }> | null } | null };

export type GetPersoonQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPersoonQuery = { __typename?: 'Query', getPersoon?: { __typename?: 'Persoon', naam?: { __typename?: 'PersoonNaam', voornamen?: string | null, voorvoegsel?: string | null, geslachtsnaam?: string | null } | null } | null };

export type GetProductTakenQueryVariables = Exact<{
  productName: Scalars['String']['input'];
  pageSize?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetProductTakenQuery = { __typename?: 'Query', getProductTaken: Array<{ __typename?: 'TaakV2', id: any, soort: string, titel: string, status: TaakStatus, verloopdatum?: any | null, version?: string | null, koppeling: { __typename?: 'TaakKoppeling', registratie: TaakKoppelingRegistratie, uuid: any }, url?: { __typename?: 'TaakUrl', uri: string } | null, formtaak?: { __typename?: 'TaakForm', formulier: { __typename?: 'TaakFormulierV2', soort: string, value: string } } | null }> };

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


export type GetProductQuery = { __typename?: 'Query', getProduct?: { __typename?: 'Product', id?: any | null, naam: string, status: string, geldigVan: any, geldigTot?: any | null, verbruiksobjecten: Array<{ __typename?: 'ProductVerbruiksObject', id?: any | null, soort?: string | null, data?: any | null }>, productDetails?: { __typename?: 'ProductDetails', id?: any | null, data: Array<any> } | null, zaken: Array<{ __typename?: 'Zaak', uuid: any, omschrijving: string, identificatie: string, startdatum: any, zaaktype: { __typename?: 'ZaakType', identificatie: string }, status?: { __typename?: 'ZaakStatus', statustype: { __typename?: 'ZaakStatusType', isEindstatus: boolean } } | null }>, taken: Array<{ __typename?: 'TaakV2', id: any, soort: string, titel: string, status: TaakStatus, verloopdatum?: any | null, version?: string | null, koppeling: { __typename?: 'TaakKoppeling', registratie: TaakKoppelingRegistratie, uuid: any }, url?: { __typename?: 'TaakUrl', uri: string } | null, formtaak?: { __typename?: 'TaakForm', formulier: { __typename?: 'TaakFormulierV2', soort: string, value: string } } | null }> } | null };

export type GetProductenQueryVariables = Exact<{
  productName: Scalars['String']['input'];
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetProductenQuery = { __typename?: 'Query', getProducten: { __typename?: 'ProductPage', totalElements: number, totalPages: number, content: Array<{ __typename?: 'Product', id?: any | null, naam: string, status: string, geldigVan: any, geldigTot?: any | null, productType?: { __typename?: 'ProductType', id?: any | null, naam: string, zaaktypen: Array<any> } | null }> } };

export type GetTaakByIdV2QueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetTaakByIdV2Query = { __typename?: 'Query', getTaakByIdV2: { __typename?: 'TaakV2', id: any, soort: string, titel: string, status: TaakStatus, verloopdatum?: any | null, version?: string | null, koppeling: { __typename?: 'TaakKoppeling', registratie: TaakKoppelingRegistratie, uuid: any }, url?: { __typename?: 'TaakUrl', uri: string } | null, formtaak?: { __typename?: 'TaakForm', data: any, formulier: { __typename?: 'TaakFormulierV2', soort: string, value: string } } | null } };

export type GetTaakByIdQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetTaakByIdQuery = { __typename?: 'Query', getTaakById: { __typename?: 'Taak', id: any, status: TaakStatus, date: string, data: any, formulier: { __typename?: 'TaakFormulier', formuliertype: string, value: string } } };

export type GetTakenV2QueryVariables = Exact<{
  zaakId?: InputMaybe<Scalars['UUID']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetTakenV2Query = { __typename?: 'Query', getTakenV2: { __typename?: 'TaakPageV2', totalElements: number, totalPages: number, content: Array<{ __typename?: 'TaakV2', id: any, soort: string, titel: string, status: TaakStatus, verloopdatum?: any | null, version?: string | null, koppeling: { __typename?: 'TaakKoppeling', registratie: TaakKoppelingRegistratie, uuid: any }, url?: { __typename?: 'TaakUrl', uri: string } | null, formtaak?: { __typename?: 'TaakForm', formulier: { __typename?: 'TaakFormulierV2', soort: string, value: string } } | null }> } };

export type GetTakenQueryVariables = Exact<{
  zaakId?: InputMaybe<Scalars['UUID']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetTakenQuery = { __typename?: 'Query', getTaken: { __typename?: 'TaakPage', totalElements: number, totalPages: number, content: Array<{ __typename?: 'Taak', id: any, objectId: any, title: string, status: TaakStatus, date: string, verloopdatum?: any | null, formulier: { __typename?: 'TaakFormulier', formuliertype: string, value: string } }> } };

export type GetZaakQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetZaakQuery = { __typename?: 'Query', getZaak: { __typename?: 'Zaak', uuid: any, url: string, omschrijving: string, identificatie: string, startdatum: any, zaaktype: { __typename?: 'ZaakType', identificatie: string, omschrijving: string }, status?: { __typename?: 'ZaakStatus', datumStatusGezet: string, statustype: { __typename?: 'ZaakStatusType', omschrijving: string, isEindstatus: boolean } } | null, statusGeschiedenis: Array<{ __typename?: 'ZaakStatus', datumStatusGezet: string, statustype: { __typename?: 'ZaakStatusType', omschrijving: string, isEindstatus: boolean } }>, statussen: Array<{ __typename?: 'StatusType', omschrijving?: string | null }>, documenten: Array<{ __typename?: 'Document', documentapi: string, bestandsnaam?: string | null, bestandsomvang?: number | null, creatiedatum?: string | null, formaat?: string | null, identificatie?: string | null, titel?: string | null, uuid: any }>, zaakdetails: { __typename?: 'ZaakDetails', data: Array<any>, zaak: string } } };

export type GetZakenQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  isOpen?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetZakenQuery = { __typename?: 'Query', getZaken: { __typename?: 'ZaakPage', totalElements: number, totalPages: number, content: Array<{ __typename?: 'Zaak', uuid: any, omschrijving: string, identificatie: string, startdatum: any, zaaktype: { __typename?: 'ZaakType', identificatie: string }, status?: { __typename?: 'ZaakStatus', statustype: { __typename?: 'ZaakStatusType', isEindstatus: boolean } } | null }> } };

export const FormulierFieldsFragmentDoc = gql`
    fragment FormulierFields on TaakFormulier {
  formuliertype
  value
}
    `;
export const SubmitTaskDocument = gql`
    mutation SubmitTask($id: UUID!, $submission: JSON!) {
  submitTask(id: $id, submission: $submission) {
    id
    objectId
    formId
    title
    status
    date
  }
}
    `;
export type SubmitTaskMutationFn = Apollo.MutationFunction<SubmitTaskMutation, SubmitTaskMutationVariables>;

/**
 * __useSubmitTaskMutation__
 *
 * To run a mutation, you first call `useSubmitTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitTaskMutation, { data, loading, error }] = useSubmitTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      submission: // value for 'submission'
 *   },
 * });
 */
export function useSubmitTaskMutation(baseOptions?: Apollo.MutationHookOptions<SubmitTaskMutation, SubmitTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitTaskMutation, SubmitTaskMutationVariables>(SubmitTaskDocument, options);
      }
export type SubmitTaskMutationHookResult = ReturnType<typeof useSubmitTaskMutation>;
export type SubmitTaskMutationResult = Apollo.MutationResult<SubmitTaskMutation>;
export type SubmitTaskMutationOptions = Apollo.BaseMutationOptions<SubmitTaskMutation, SubmitTaskMutationVariables>;
export const UpdateBurgerProfielDocument = gql`
    mutation UpdateBurgerProfiel($klant: KlantUpdateInput!) {
  updateBurgerProfiel(klant: $klant) {
    emailadres
    telefoonnummer
  }
}
    `;
export type UpdateBurgerProfielMutationFn = Apollo.MutationFunction<UpdateBurgerProfielMutation, UpdateBurgerProfielMutationVariables>;

/**
 * __useUpdateBurgerProfielMutation__
 *
 * To run a mutation, you first call `useUpdateBurgerProfielMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBurgerProfielMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBurgerProfielMutation, { data, loading, error }] = useUpdateBurgerProfielMutation({
 *   variables: {
 *      klant: // value for 'klant'
 *   },
 * });
 */
export function useUpdateBurgerProfielMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBurgerProfielMutation, UpdateBurgerProfielMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBurgerProfielMutation, UpdateBurgerProfielMutationVariables>(UpdateBurgerProfielDocument, options);
      }
export type UpdateBurgerProfielMutationHookResult = ReturnType<typeof useUpdateBurgerProfielMutation>;
export type UpdateBurgerProfielMutationResult = Apollo.MutationResult<UpdateBurgerProfielMutation>;
export type UpdateBurgerProfielMutationOptions = Apollo.BaseMutationOptions<UpdateBurgerProfielMutation, UpdateBurgerProfielMutationVariables>;
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
export function useGetBedrijfSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBedrijfQuery, GetBedrijfQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBedrijfQuery, GetBedrijfQueryVariables>(GetBedrijfDocument, options);
        }
export type GetBedrijfQueryHookResult = ReturnType<typeof useGetBedrijfQuery>;
export type GetBedrijfLazyQueryHookResult = ReturnType<typeof useGetBedrijfLazyQuery>;
export type GetBedrijfSuspenseQueryHookResult = ReturnType<typeof useGetBedrijfSuspenseQuery>;
export type GetBedrijfQueryResult = Apollo.QueryResult<GetBedrijfQuery, GetBedrijfQueryVariables>;
export const GetBurgerProfielDocument = gql`
    query GetBurgerProfiel {
  getBurgerProfiel {
    emailadres
    telefoonnummer
  }
}
    `;

/**
 * __useGetBurgerProfielQuery__
 *
 * To run a query within a React component, call `useGetBurgerProfielQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBurgerProfielQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBurgerProfielQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBurgerProfielQuery(baseOptions?: Apollo.QueryHookOptions<GetBurgerProfielQuery, GetBurgerProfielQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBurgerProfielQuery, GetBurgerProfielQueryVariables>(GetBurgerProfielDocument, options);
      }
export function useGetBurgerProfielLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBurgerProfielQuery, GetBurgerProfielQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBurgerProfielQuery, GetBurgerProfielQueryVariables>(GetBurgerProfielDocument, options);
        }
export function useGetBurgerProfielSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBurgerProfielQuery, GetBurgerProfielQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBurgerProfielQuery, GetBurgerProfielQueryVariables>(GetBurgerProfielDocument, options);
        }
export type GetBurgerProfielQueryHookResult = ReturnType<typeof useGetBurgerProfielQuery>;
export type GetBurgerProfielLazyQueryHookResult = ReturnType<typeof useGetBurgerProfielLazyQuery>;
export type GetBurgerProfielSuspenseQueryHookResult = ReturnType<typeof useGetBurgerProfielSuspenseQuery>;
export type GetBurgerProfielQueryResult = Apollo.QueryResult<GetBurgerProfielQuery, GetBurgerProfielQueryVariables>;
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
export function useGetDocumentenSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetDocumentenQuery, GetDocumentenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
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
export function useGetFormDefinitionByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetFormDefinitionByIdQuery, GetFormDefinitionByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
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
export function useGetFormDefinitionByObjectenApiUrlSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetFormDefinitionByObjectenApiUrlQuery, GetFormDefinitionByObjectenApiUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
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
export function useGetFormDefinitionByNameSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetFormDefinitionByNameQuery, GetFormDefinitionByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFormDefinitionByNameQuery, GetFormDefinitionByNameQueryVariables>(GetFormDefinitionByNameDocument, options);
        }
export type GetFormDefinitionByNameQueryHookResult = ReturnType<typeof useGetFormDefinitionByNameQuery>;
export type GetFormDefinitionByNameLazyQueryHookResult = ReturnType<typeof useGetFormDefinitionByNameLazyQuery>;
export type GetFormDefinitionByNameSuspenseQueryHookResult = ReturnType<typeof useGetFormDefinitionByNameSuspenseQuery>;
export type GetFormDefinitionByNameQueryResult = Apollo.QueryResult<GetFormDefinitionByNameQuery, GetFormDefinitionByNameQueryVariables>;
export const GetGemachtigdeDocument = gql`
    query GetGemachtigde {
  getGemachtigde {
    persoon {
      aanhef
      voorletters
      voornamen
      voorvoegsel
      geslachtsnaam
    }
    bedrijf {
      naam
    }
  }
}
    `;

/**
 * __useGetGemachtigdeQuery__
 *
 * To run a query within a React component, call `useGetGemachtigdeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGemachtigdeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGemachtigdeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGemachtigdeQuery(baseOptions?: Apollo.QueryHookOptions<GetGemachtigdeQuery, GetGemachtigdeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGemachtigdeQuery, GetGemachtigdeQueryVariables>(GetGemachtigdeDocument, options);
      }
export function useGetGemachtigdeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGemachtigdeQuery, GetGemachtigdeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGemachtigdeQuery, GetGemachtigdeQueryVariables>(GetGemachtigdeDocument, options);
        }
export function useGetGemachtigdeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetGemachtigdeQuery, GetGemachtigdeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGemachtigdeQuery, GetGemachtigdeQueryVariables>(GetGemachtigdeDocument, options);
        }
export type GetGemachtigdeQueryHookResult = ReturnType<typeof useGetGemachtigdeQuery>;
export type GetGemachtigdeLazyQueryHookResult = ReturnType<typeof useGetGemachtigdeLazyQuery>;
export type GetGemachtigdeSuspenseQueryHookResult = ReturnType<typeof useGetGemachtigdeSuspenseQuery>;
export type GetGemachtigdeQueryResult = Apollo.QueryResult<GetGemachtigdeQuery, GetGemachtigdeQueryVariables>;
export const GetKlantContactMomentenDocument = gql`
    query GetKlantContactMomenten {
  getKlantContactMomenten {
    content {
      tekst
      kanaal
      registratiedatum
    }
  }
}
    `;

/**
 * __useGetKlantContactMomentenQuery__
 *
 * To run a query within a React component, call `useGetKlantContactMomentenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetKlantContactMomentenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetKlantContactMomentenQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetKlantContactMomentenQuery(baseOptions?: Apollo.QueryHookOptions<GetKlantContactMomentenQuery, GetKlantContactMomentenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetKlantContactMomentenQuery, GetKlantContactMomentenQueryVariables>(GetKlantContactMomentenDocument, options);
      }
export function useGetKlantContactMomentenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetKlantContactMomentenQuery, GetKlantContactMomentenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetKlantContactMomentenQuery, GetKlantContactMomentenQueryVariables>(GetKlantContactMomentenDocument, options);
        }
export function useGetKlantContactMomentenSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetKlantContactMomentenQuery, GetKlantContactMomentenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetKlantContactMomentenQuery, GetKlantContactMomentenQueryVariables>(GetKlantContactMomentenDocument, options);
        }
export type GetKlantContactMomentenQueryHookResult = ReturnType<typeof useGetKlantContactMomentenQuery>;
export type GetKlantContactMomentenLazyQueryHookResult = ReturnType<typeof useGetKlantContactMomentenLazyQuery>;
export type GetKlantContactMomentenSuspenseQueryHookResult = ReturnType<typeof useGetKlantContactMomentenSuspenseQuery>;
export type GetKlantContactMomentenQueryResult = Apollo.QueryResult<GetKlantContactMomentenQuery, GetKlantContactMomentenQueryVariables>;
export const GetObjectContactMomentenDocument = gql`
    query GetObjectContactMomenten($objectUrl: String!) {
  getObjectContactMomenten(objectUrl: $objectUrl) {
    content {
      tekst
      kanaal
      registratiedatum
    }
  }
}
    `;

/**
 * __useGetObjectContactMomentenQuery__
 *
 * To run a query within a React component, call `useGetObjectContactMomentenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetObjectContactMomentenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetObjectContactMomentenQuery({
 *   variables: {
 *      objectUrl: // value for 'objectUrl'
 *   },
 * });
 */
export function useGetObjectContactMomentenQuery(baseOptions: Apollo.QueryHookOptions<GetObjectContactMomentenQuery, GetObjectContactMomentenQueryVariables> & ({ variables: GetObjectContactMomentenQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetObjectContactMomentenQuery, GetObjectContactMomentenQueryVariables>(GetObjectContactMomentenDocument, options);
      }
export function useGetObjectContactMomentenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetObjectContactMomentenQuery, GetObjectContactMomentenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetObjectContactMomentenQuery, GetObjectContactMomentenQueryVariables>(GetObjectContactMomentenDocument, options);
        }
export function useGetObjectContactMomentenSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetObjectContactMomentenQuery, GetObjectContactMomentenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetObjectContactMomentenQuery, GetObjectContactMomentenQueryVariables>(GetObjectContactMomentenDocument, options);
        }
export type GetObjectContactMomentenQueryHookResult = ReturnType<typeof useGetObjectContactMomentenQuery>;
export type GetObjectContactMomentenLazyQueryHookResult = ReturnType<typeof useGetObjectContactMomentenLazyQuery>;
export type GetObjectContactMomentenSuspenseQueryHookResult = ReturnType<typeof useGetObjectContactMomentenSuspenseQuery>;
export type GetObjectContactMomentenQueryResult = Apollo.QueryResult<GetObjectContactMomentenQuery, GetObjectContactMomentenQueryVariables>;
export const GetPersoonDataDocument = gql`
    query GetPersoonData {
  getPersoon {
    burgerservicenummer
    geslachtsaanduiding
    bewonersAantal
    naam {
      aanhef
      voorletters
      voornamen
      voorvoegsel
      geslachtsnaam
    }
    verblijfplaats {
      straat
      huisnummer
      huisletter
      huisnummertoevoeging
      postcode
      woonplaats
    }
    geboorte {
      datum {
        datum
        jaar
        maand
        dag
      }
      land {
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
 * __useGetPersoonDataQuery__
 *
 * To run a query within a React component, call `useGetPersoonDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPersoonDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPersoonDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPersoonDataQuery(baseOptions?: Apollo.QueryHookOptions<GetPersoonDataQuery, GetPersoonDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPersoonDataQuery, GetPersoonDataQueryVariables>(GetPersoonDataDocument, options);
      }
export function useGetPersoonDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPersoonDataQuery, GetPersoonDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPersoonDataQuery, GetPersoonDataQueryVariables>(GetPersoonDataDocument, options);
        }
export function useGetPersoonDataSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPersoonDataQuery, GetPersoonDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPersoonDataQuery, GetPersoonDataQueryVariables>(GetPersoonDataDocument, options);
        }
export type GetPersoonDataQueryHookResult = ReturnType<typeof useGetPersoonDataQuery>;
export type GetPersoonDataLazyQueryHookResult = ReturnType<typeof useGetPersoonDataLazyQuery>;
export type GetPersoonDataSuspenseQueryHookResult = ReturnType<typeof useGetPersoonDataSuspenseQuery>;
export type GetPersoonDataQueryResult = Apollo.QueryResult<GetPersoonDataQuery, GetPersoonDataQueryVariables>;
export const GetPersoonDocument = gql`
    query GetPersoon {
  getPersoon {
    naam {
      voornamen
      voorvoegsel
      geslachtsnaam
    }
  }
}
    `;

/**
 * __useGetPersoonQuery__
 *
 * To run a query within a React component, call `useGetPersoonQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPersoonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPersoonQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPersoonQuery(baseOptions?: Apollo.QueryHookOptions<GetPersoonQuery, GetPersoonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPersoonQuery, GetPersoonQueryVariables>(GetPersoonDocument, options);
      }
export function useGetPersoonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPersoonQuery, GetPersoonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPersoonQuery, GetPersoonQueryVariables>(GetPersoonDocument, options);
        }
export function useGetPersoonSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPersoonQuery, GetPersoonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPersoonQuery, GetPersoonQueryVariables>(GetPersoonDocument, options);
        }
export type GetPersoonQueryHookResult = ReturnType<typeof useGetPersoonQuery>;
export type GetPersoonLazyQueryHookResult = ReturnType<typeof useGetPersoonLazyQuery>;
export type GetPersoonSuspenseQueryHookResult = ReturnType<typeof useGetPersoonSuspenseQuery>;
export type GetPersoonQueryResult = Apollo.QueryResult<GetPersoonQuery, GetPersoonQueryVariables>;
export const GetProductTakenDocument = gql`
    query GetProductTaken($productName: String!, $pageSize: Int) {
  getProductTaken(productName: $productName, pageSize: $pageSize) {
    id
    soort
    koppeling {
      registratie
      uuid
    }
    url {
      uri
    }
    formtaak {
      formulier {
        soort
        value
      }
    }
    titel
    status
    verloopdatum
    version
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
export function useGetProductTakenSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProductTakenQuery, GetProductTakenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
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
export function useGetProductVerbruiksObjectenSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProductVerbruiksObjectenQuery, GetProductVerbruiksObjectenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
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
export function useGetProductZakenSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProductZakenQuery, GetProductZakenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
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
        uuid
      }
      url {
        uri
      }
      formtaak {
        formulier {
          soort
          value
        }
      }
      titel
      status
      verloopdatum
      version
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
export function useGetProductSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
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
export function useGetProductenSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProductenQuery, GetProductenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
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
      uuid
    }
    url {
      uri
    }
    formtaak {
      formulier {
        soort
        value
      }
      data
    }
    titel
    status
    verloopdatum
    version
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
export function useGetTaakByIdV2SuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTaakByIdV2Query, GetTaakByIdV2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTaakByIdV2Query, GetTaakByIdV2QueryVariables>(GetTaakByIdV2Document, options);
        }
export type GetTaakByIdV2QueryHookResult = ReturnType<typeof useGetTaakByIdV2Query>;
export type GetTaakByIdV2LazyQueryHookResult = ReturnType<typeof useGetTaakByIdV2LazyQuery>;
export type GetTaakByIdV2SuspenseQueryHookResult = ReturnType<typeof useGetTaakByIdV2SuspenseQuery>;
export type GetTaakByIdV2QueryResult = Apollo.QueryResult<GetTaakByIdV2Query, GetTaakByIdV2QueryVariables>;
export const GetTaakByIdDocument = gql`
    query GetTaakById($id: UUID!) {
  getTaakById(id: $id) {
    id
    formulier {
      ...FormulierFields
    }
    status
    date
    data
  }
}
    ${FormulierFieldsFragmentDoc}`;

/**
 * __useGetTaakByIdQuery__
 *
 * To run a query within a React component, call `useGetTaakByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaakByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaakByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTaakByIdQuery(baseOptions: Apollo.QueryHookOptions<GetTaakByIdQuery, GetTaakByIdQueryVariables> & ({ variables: GetTaakByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTaakByIdQuery, GetTaakByIdQueryVariables>(GetTaakByIdDocument, options);
      }
export function useGetTaakByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTaakByIdQuery, GetTaakByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTaakByIdQuery, GetTaakByIdQueryVariables>(GetTaakByIdDocument, options);
        }
export function useGetTaakByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTaakByIdQuery, GetTaakByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTaakByIdQuery, GetTaakByIdQueryVariables>(GetTaakByIdDocument, options);
        }
export type GetTaakByIdQueryHookResult = ReturnType<typeof useGetTaakByIdQuery>;
export type GetTaakByIdLazyQueryHookResult = ReturnType<typeof useGetTaakByIdLazyQuery>;
export type GetTaakByIdSuspenseQueryHookResult = ReturnType<typeof useGetTaakByIdSuspenseQuery>;
export type GetTaakByIdQueryResult = Apollo.QueryResult<GetTaakByIdQuery, GetTaakByIdQueryVariables>;
export const GetTakenV2Document = gql`
    query GetTakenV2($zaakId: UUID, $pageNumber: Int, $pageSize: Int) {
  getTakenV2(zaakUUID: $zaakId, pageNumber: $pageNumber, pageSize: $pageSize) {
    content {
      id
      soort
      koppeling {
        registratie
        uuid
      }
      url {
        uri
      }
      formtaak {
        formulier {
          soort
          value
        }
      }
      titel
      status
      verloopdatum
      version
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
export function useGetTakenV2SuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTakenV2Query, GetTakenV2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTakenV2Query, GetTakenV2QueryVariables>(GetTakenV2Document, options);
        }
export type GetTakenV2QueryHookResult = ReturnType<typeof useGetTakenV2Query>;
export type GetTakenV2LazyQueryHookResult = ReturnType<typeof useGetTakenV2LazyQuery>;
export type GetTakenV2SuspenseQueryHookResult = ReturnType<typeof useGetTakenV2SuspenseQuery>;
export type GetTakenV2QueryResult = Apollo.QueryResult<GetTakenV2Query, GetTakenV2QueryVariables>;
export const GetTakenDocument = gql`
    query GetTaken($zaakId: UUID, $pageNumber: Int, $pageSize: Int) {
  getTaken(zaakUUID: $zaakId, pageNumber: $pageNumber, pageSize: $pageSize) {
    content {
      id
      objectId
      formulier {
        ...FormulierFields
      }
      title
      status
      date
      verloopdatum
    }
    totalElements
    totalPages
  }
}
    ${FormulierFieldsFragmentDoc}`;

/**
 * __useGetTakenQuery__
 *
 * To run a query within a React component, call `useGetTakenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTakenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTakenQuery({
 *   variables: {
 *      zaakId: // value for 'zaakId'
 *      pageNumber: // value for 'pageNumber'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useGetTakenQuery(baseOptions?: Apollo.QueryHookOptions<GetTakenQuery, GetTakenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTakenQuery, GetTakenQueryVariables>(GetTakenDocument, options);
      }
export function useGetTakenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTakenQuery, GetTakenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTakenQuery, GetTakenQueryVariables>(GetTakenDocument, options);
        }
export function useGetTakenSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTakenQuery, GetTakenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTakenQuery, GetTakenQueryVariables>(GetTakenDocument, options);
        }
export type GetTakenQueryHookResult = ReturnType<typeof useGetTakenQuery>;
export type GetTakenLazyQueryHookResult = ReturnType<typeof useGetTakenLazyQuery>;
export type GetTakenSuspenseQueryHookResult = ReturnType<typeof useGetTakenSuspenseQuery>;
export type GetTakenQueryResult = Apollo.QueryResult<GetTakenQuery, GetTakenQueryVariables>;
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
    }
    statusGeschiedenis {
      datumStatusGezet
      statustype {
        omschrijving
        isEindstatus
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
export function useGetZaakSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetZaakQuery, GetZaakQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetZaakQuery, GetZaakQueryVariables>(GetZaakDocument, options);
        }
export type GetZaakQueryHookResult = ReturnType<typeof useGetZaakQuery>;
export type GetZaakLazyQueryHookResult = ReturnType<typeof useGetZaakLazyQuery>;
export type GetZaakSuspenseQueryHookResult = ReturnType<typeof useGetZaakSuspenseQuery>;
export type GetZaakQueryResult = Apollo.QueryResult<GetZaakQuery, GetZaakQueryVariables>;
export const GetZakenDocument = gql`
    query GetZaken($page: Int, $isOpen: Boolean) {
  getZaken(page: $page, isOpen: $isOpen) {
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
 *      isOpen: // value for 'isOpen'
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
export function useGetZakenSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetZakenQuery, GetZakenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetZakenQuery, GetZakenQueryVariables>(GetZakenDocument, options);
        }
export type GetZakenQueryHookResult = ReturnType<typeof useGetZakenQuery>;
export type GetZakenLazyQueryHookResult = ReturnType<typeof useGetZakenLazyQuery>;
export type GetZakenSuspenseQueryHookResult = ReturnType<typeof useGetZakenSuspenseQuery>;
export type GetZakenQueryResult = Apollo.QueryResult<GetZakenQuery, GetZakenQueryVariables>;