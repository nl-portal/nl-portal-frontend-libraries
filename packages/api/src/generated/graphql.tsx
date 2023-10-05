import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date */
  Date: any;
  /** A type representing a formatted JSON */
  JSON: any;
  /** A local date time */
  LocalDateTime: any;
  /** A type representing a formatted java.util.UUID */
  UUID: any;
};

export type ContactMoment = {
  __typename?: 'ContactMoment';
  bronorganisatie?: Maybe<Scalars['String']>;
  initiatiefnemer?: Maybe<Scalars['String']>;
  kanaal: Scalars['String'];
  medewerker?: Maybe<Scalars['String']>;
  registratiedatum: Scalars['String'];
  tekst: Scalars['String'];
  volgendContactmoment?: Maybe<Scalars['String']>;
  voorkeurskanaal?: Maybe<Scalars['String']>;
  voorkeurstaal?: Maybe<Scalars['String']>;
  vorigContactmoment?: Maybe<Scalars['String']>;
};

export type ContactMomentPage = {
  __typename?: 'ContactMomentPage';
  content: Array<ContactMoment>;
  number: Scalars['Int'];
  /** The number of elements on this page */
  numberOfElements: Scalars['Int'];
  totalElements: Scalars['Int'];
};

export type Document = {
  __typename?: 'Document';
  bestandsnaam?: Maybe<Scalars['String']>;
  bestandsomvang?: Maybe<Scalars['Int']>;
  creatiedatum?: Maybe<Scalars['String']>;
  formaat?: Maybe<Scalars['String']>;
  identificatie?: Maybe<Scalars['String']>;
  titel?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

export type DocumentContent = {
  __typename?: 'DocumentContent';
  content: Scalars['String'];
};

export type Form = {
  __typename?: 'Form';
  name: Scalars['String'];
  uuid: Scalars['UUID'];
};

export type FormDefinition = {
  __typename?: 'FormDefinition';
  formDefinition: Scalars['JSON'];
};

export type Gemachtigde = {
  __typename?: 'Gemachtigde';
  bedrijf?: Maybe<MaatschappelijkeActiviteit>;
  persoon?: Maybe<PersoonNaam>;
};

export type Klant = {
  __typename?: 'Klant';
  emailadres?: Maybe<Scalars['String']>;
  telefoonnummer?: Maybe<Scalars['String']>;
};

export type KlantUpdateInput = {
  emailadres?: Maybe<Scalars['String']>;
  telefoonnummer?: Maybe<Scalars['String']>;
};

export type MaatschappelijkeActiviteit = {
  __typename?: 'MaatschappelijkeActiviteit';
  naam: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Submit a task */
  submitTaak: Taak;
  /** Submit a task */
  submitTask: Taak;
  /** Updates the profile for the user */
  updateBurgerProfiel?: Maybe<Klant>;
};


export type MutationSubmitTaakArgs = {
  id: Scalars['UUID'];
  submission: Scalars['JSON'];
};


export type MutationSubmitTaskArgs = {
  id: Scalars['UUID'];
  submission: Scalars['JSON'];
};


export type MutationUpdateBurgerProfielArgs = {
  klant: KlantUpdateInput;
};

export type Persoon = {
  __typename?: 'Persoon';
  burgerservicenummer?: Maybe<Scalars['String']>;
  geboorte?: Maybe<PersoonGeboorte>;
  geslachtsaanduiding?: Maybe<Scalars['String']>;
  naam?: Maybe<PersoonNaam>;
  nationaliteiten?: Maybe<Array<PersoonNationaliteiten>>;
  verblijfplaats?: Maybe<PersoonVerblijfplaats>;
};

export type PersoonGeboorte = {
  __typename?: 'PersoonGeboorte';
  datum?: Maybe<PersoonGeboorteDatum>;
  land?: Maybe<PersoonGeboorteLand>;
};

export type PersoonGeboorteDatum = {
  __typename?: 'PersoonGeboorteDatum';
  dag?: Maybe<Scalars['Int']>;
  datum?: Maybe<Scalars['String']>;
  jaar?: Maybe<Scalars['Int']>;
  maand?: Maybe<Scalars['Int']>;
};

export type PersoonGeboorteLand = {
  __typename?: 'PersoonGeboorteLand';
  code?: Maybe<Scalars['String']>;
  omschrijving?: Maybe<Scalars['String']>;
};

export type PersoonNaam = {
  __typename?: 'PersoonNaam';
  aanhef?: Maybe<Scalars['String']>;
  geslachtsnaam?: Maybe<Scalars['String']>;
  voorletters?: Maybe<Scalars['String']>;
  voornamen?: Maybe<Scalars['String']>;
  voorvoegsel?: Maybe<Scalars['String']>;
};

export type PersoonNationaliteit = {
  __typename?: 'PersoonNationaliteit';
  code?: Maybe<Scalars['String']>;
  omschrijving?: Maybe<Scalars['String']>;
};

export type PersoonNationaliteiten = {
  __typename?: 'PersoonNationaliteiten';
  nationaliteit?: Maybe<PersoonNationaliteit>;
};

export type PersoonVerblijfplaats = {
  __typename?: 'PersoonVerblijfplaats';
  huisletter?: Maybe<Scalars['String']>;
  huisnummer?: Maybe<Scalars['String']>;
  huisnummertoevoeging?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  straat?: Maybe<Scalars['String']>;
  woonplaats?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /**
   * find all form definitions from repository
   * @deprecated This method is not used by the NL Portal frontend and is not being replaced.
   */
  allFormDefinitions: Array<FormDefinition>;
  /** Gets the bedrijf data */
  getBedrijf?: Maybe<MaatschappelijkeActiviteit>;
  /** Gets the number of people living in the same house as the person that makes the requests */
  getBewonersAantal?: Maybe<Scalars['Int']>;
  /** Gets the profile for the user */
  getBurgerProfiel?: Maybe<Klant>;
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
  /** Gets the forms available to the user */
  getFormList: Array<Form>;
  /** Gets the data of the gemachtigde */
  getGemachtigde: Gemachtigde;
  /** Gets the contactmomenten of a klant */
  getKlantContactMomenten?: Maybe<ContactMomentPage>;
  /** Gets the persoon data */
  getPersoon?: Maybe<Persoon>;
  /** Get task by id */
  getTaakById: Taak;
  /** Get a list of tasks. Optional filter for zaak */
  getTaken: TaakPage;
  /**
   * Get a list of tasks
   * @deprecated Replaced by getTaken
   */
  getTasks: TaakPage;
  /** Gets a zaak by id */
  getZaak: Zaak;
  /** Gets all zaken for the user */
  getZaken: Array<Zaak>;
};


export type QueryGetDocumentContentArgs = {
  id: Scalars['UUID'];
};


export type QueryGetFormDefinitionByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetFormDefinitionByNameArgs = {
  name: Scalars['String'];
};


export type QueryGetFormDefinitionByObjectenApiUrlArgs = {
  url: Scalars['String'];
};


export type QueryGetKlantContactMomentenArgs = {
  pageNumber?: Maybe<Scalars['Int']>;
};


export type QueryGetTaakByIdArgs = {
  id: Scalars['UUID'];
};


export type QueryGetTakenArgs = {
  pageNumber?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  zaakUUID?: Maybe<Scalars['UUID']>;
};


export type QueryGetTasksArgs = {
  pageNumber?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
};


export type QueryGetZaakArgs = {
  id: Scalars['UUID'];
};


export type QueryGetZakenArgs = {
  page?: Maybe<Scalars['Int']>;
};

export type StatusType = {
  __typename?: 'StatusType';
  isEindstatus?: Maybe<Scalars['Boolean']>;
  omschrijving?: Maybe<Scalars['String']>;
};

export type Taak = {
  __typename?: 'Taak';
  data: Scalars['JSON'];
  date: Scalars['String'];
  /** @deprecated Use formulier type/value */
  formId: Scalars['String'];
  formulier: TaakFormulier;
  id: Scalars['UUID'];
  identificatie: TaakIdentificatie;
  objectId: Scalars['UUID'];
  status: TaakStatus;
  title: Scalars['String'];
  verloopdatum?: Maybe<Scalars['LocalDateTime']>;
  zaak?: Maybe<Scalars['String']>;
};

export type TaakFormulier = {
  __typename?: 'TaakFormulier';
  type: Scalars['String'];
  value: Scalars['String'];
};

export type TaakIdentificatie = {
  __typename?: 'TaakIdentificatie';
  type: Scalars['String'];
  value: Scalars['String'];
};

export type TaakPage = {
  __typename?: 'TaakPage';
  content: Array<Taak>;
  number: Scalars['Int'];
  /** The number of elements on this page */
  numberOfElements: Scalars['Int'];
  results: Array<Taak>;
  size: Scalars['Int'];
  totalElements: Scalars['Int'];
  /** The total number of available pages */
  totalPages: Scalars['Int'];
};

export enum TaakStatus {
  Gesloten = 'GESLOTEN',
  Ingediend = 'INGEDIEND',
  Open = 'OPEN',
  Verwerkt = 'VERWERKT'
}

export type Zaak = {
  __typename?: 'Zaak';
  documenten: Array<Document>;
  identificatie: Scalars['String'];
  omschrijving: Scalars['String'];
  startdatum: Scalars['Date'];
  status?: Maybe<ZaakStatus>;
  statusGeschiedenis: Array<ZaakStatus>;
  statussen: Array<StatusType>;
  url: Scalars['String'];
  uuid: Scalars['UUID'];
  zaakdetails: ZaakDetails;
  zaaktype: ZaakType;
};

export type ZaakDetails = {
  __typename?: 'ZaakDetails';
  data: Array<Scalars['JSON']>;
  zaak: Scalars['String'];
};

export type ZaakStatus = {
  __typename?: 'ZaakStatus';
  datumStatusGezet: Scalars['String'];
  statustype: ZaakStatusType;
};

export type ZaakStatusType = {
  __typename?: 'ZaakStatusType';
  isEindstatus: Scalars['Boolean'];
  omschrijving: Scalars['String'];
};

export type ZaakType = {
  __typename?: 'ZaakType';
  identificatie: Scalars['String'];
  omschrijving: Scalars['String'];
};

export type SubmitTaskMutationVariables = Exact<{
  id: Scalars['UUID'];
  submission: Scalars['JSON'];
}>;


export type SubmitTaskMutation = { __typename?: 'Mutation', submitTask: { __typename?: 'Taak', id: any, objectId: any, formId: string, title: string, status: TaakStatus, date: string } };

export type UpdateBurgerProfielMutationVariables = Exact<{
  klant: KlantUpdateInput;
}>;


export type UpdateBurgerProfielMutation = { __typename?: 'Mutation', updateBurgerProfiel?: Maybe<{ __typename?: 'Klant', emailadres?: Maybe<string>, telefoonnummer?: Maybe<string> }> };

export type GetBedrijfQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBedrijfQuery = { __typename?: 'Query', getBedrijf?: Maybe<{ __typename?: 'MaatschappelijkeActiviteit', naam: string }> };

export type GetBewonersAantalQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBewonersAantalQuery = { __typename?: 'Query', getBewonersAantal?: Maybe<number> };

export type GetBurgerProfielQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBurgerProfielQuery = { __typename?: 'Query', getBurgerProfiel?: Maybe<{ __typename?: 'Klant', emailadres?: Maybe<string>, telefoonnummer?: Maybe<string> }> };

export type GetKlantContactMomentenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetKlantContactMomentenQuery = { __typename?: 'Query', getKlantContactMomenten?: Maybe<{ __typename?: 'ContactMomentPage', content: Array<{ __typename?: 'ContactMoment', tekst: string, kanaal: string, registratiedatum: string }> }> };

export type GetDocumentenQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type GetDocumentenQuery = { __typename?: 'Query', getZaak: { __typename?: 'Zaak', zaaktype: { __typename?: 'ZaakType', identificatie: string }, documenten: Array<{ __typename?: 'Document', bestandsnaam?: Maybe<string>, bestandsomvang?: Maybe<number>, creatiedatum?: Maybe<string>, formaat?: Maybe<string>, identificatie?: Maybe<string>, titel?: Maybe<string>, uuid: any }> } };

export type GetFormDefinitionByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetFormDefinitionByIdQuery = { __typename?: 'Query', getFormDefinitionById?: Maybe<{ __typename?: 'FormDefinition', formDefinition: any }> };

export type GetFormDefinitionByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GetFormDefinitionByNameQuery = { __typename?: 'Query', getFormDefinitionByName?: Maybe<{ __typename?: 'FormDefinition', formDefinition: any }> };

export type GetFormsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFormsQuery = { __typename?: 'Query', getFormList: Array<{ __typename?: 'Form', name: string, uuid: any }> };

export type GetGemachtigdeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGemachtigdeQuery = { __typename?: 'Query', getGemachtigde: { __typename?: 'Gemachtigde', persoon?: Maybe<{ __typename?: 'PersoonNaam', aanhef?: Maybe<string>, voorletters?: Maybe<string>, voornamen?: Maybe<string>, voorvoegsel?: Maybe<string>, geslachtsnaam?: Maybe<string> }>, bedrijf?: Maybe<{ __typename?: 'MaatschappelijkeActiviteit', naam: string }> } };

export type GetPersoonDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPersoonDataQuery = { __typename?: 'Query', getPersoon?: Maybe<{ __typename?: 'Persoon', burgerservicenummer?: Maybe<string>, geslachtsaanduiding?: Maybe<string>, naam?: Maybe<{ __typename?: 'PersoonNaam', aanhef?: Maybe<string>, voorletters?: Maybe<string>, voornamen?: Maybe<string>, voorvoegsel?: Maybe<string>, geslachtsnaam?: Maybe<string> }>, verblijfplaats?: Maybe<{ __typename?: 'PersoonVerblijfplaats', straat?: Maybe<string>, huisnummer?: Maybe<string>, huisletter?: Maybe<string>, huisnummertoevoeging?: Maybe<string>, postcode?: Maybe<string>, woonplaats?: Maybe<string> }>, geboorte?: Maybe<{ __typename?: 'PersoonGeboorte', datum?: Maybe<{ __typename?: 'PersoonGeboorteDatum', datum?: Maybe<string>, jaar?: Maybe<number>, maand?: Maybe<number>, dag?: Maybe<number> }>, land?: Maybe<{ __typename?: 'PersoonGeboorteLand', code?: Maybe<string>, omschrijving?: Maybe<string> }> }>, nationaliteiten?: Maybe<Array<{ __typename?: 'PersoonNationaliteiten', nationaliteit?: Maybe<{ __typename?: 'PersoonNationaliteit', code?: Maybe<string>, omschrijving?: Maybe<string> }> }>> }> };

export type GetPersoonQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPersoonQuery = { __typename?: 'Query', getPersoon?: Maybe<{ __typename?: 'Persoon', naam?: Maybe<{ __typename?: 'PersoonNaam', voornamen?: Maybe<string>, voorvoegsel?: Maybe<string>, geslachtsnaam?: Maybe<string> }> }> };

export type GetTaakByIdQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type GetTaakByIdQuery = { __typename?: 'Query', getTaakById: { __typename?: 'Taak', id: any, formId: string, status: TaakStatus, date: string, data: any, formulier: { __typename?: 'TaakFormulier', type: string, value: string } } };

export type GetTakenQueryVariables = Exact<{
  zaakId?: Maybe<Scalars['UUID']>;
}>;


export type GetTakenQuery = { __typename?: 'Query', getTaken: { __typename?: 'TaakPage', content: Array<{ __typename?: 'Taak', id: any, objectId: any, formId: string, title: string, status: TaakStatus, date: string, data: any, verloopdatum?: Maybe<any>, formulier: { __typename?: 'TaakFormulier', type: string, value: string } }> } };

export type GetZaakQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type GetZaakQuery = { __typename?: 'Query', getZaak: { __typename?: 'Zaak', uuid: any, omschrijving: string, identificatie: string, startdatum: any, zaaktype: { __typename?: 'ZaakType', identificatie: string, omschrijving: string }, status?: Maybe<{ __typename?: 'ZaakStatus', datumStatusGezet: string, statustype: { __typename?: 'ZaakStatusType', omschrijving: string, isEindstatus: boolean } }>, statusGeschiedenis: Array<{ __typename?: 'ZaakStatus', datumStatusGezet: string, statustype: { __typename?: 'ZaakStatusType', omschrijving: string, isEindstatus: boolean } }>, statussen: Array<{ __typename?: 'StatusType', omschrijving?: Maybe<string> }>, documenten: Array<{ __typename?: 'Document', bestandsnaam?: Maybe<string>, bestandsomvang?: Maybe<number>, creatiedatum?: Maybe<string>, formaat?: Maybe<string>, identificatie?: Maybe<string>, titel?: Maybe<string>, uuid: any }>, zaakdetails: { __typename?: 'ZaakDetails', data: Array<any>, zaak: string } } };

export type GetZakenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetZakenQuery = { __typename?: 'Query', getZaken: Array<{ __typename?: 'Zaak', uuid: any, omschrijving: string, identificatie: string, startdatum: any, zaaktype: { __typename?: 'ZaakType', identificatie: string }, status?: Maybe<{ __typename?: 'ZaakStatus', statustype: { __typename?: 'ZaakStatusType', isEindstatus: boolean } }> }> };


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
export const GetBedrijfDocument = gql`
    query GetBedrijf {
  getBedrijf {
    naam
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
export type GetBedrijfQueryHookResult = ReturnType<typeof useGetBedrijfQuery>;
export type GetBedrijfLazyQueryHookResult = ReturnType<typeof useGetBedrijfLazyQuery>;
export type GetBedrijfQueryResult = Apollo.QueryResult<GetBedrijfQuery, GetBedrijfQueryVariables>;
export const GetBewonersAantalDocument = gql`
    query GetBewonersAantal {
  getBewonersAantal
}
    `;

/**
 * __useGetBewonersAantalQuery__
 *
 * To run a query within a React component, call `useGetBewonersAantalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBewonersAantalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBewonersAantalQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBewonersAantalQuery(baseOptions?: Apollo.QueryHookOptions<GetBewonersAantalQuery, GetBewonersAantalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBewonersAantalQuery, GetBewonersAantalQueryVariables>(GetBewonersAantalDocument, options);
      }
export function useGetBewonersAantalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBewonersAantalQuery, GetBewonersAantalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBewonersAantalQuery, GetBewonersAantalQueryVariables>(GetBewonersAantalDocument, options);
        }
export type GetBewonersAantalQueryHookResult = ReturnType<typeof useGetBewonersAantalQuery>;
export type GetBewonersAantalLazyQueryHookResult = ReturnType<typeof useGetBewonersAantalLazyQuery>;
export type GetBewonersAantalQueryResult = Apollo.QueryResult<GetBewonersAantalQuery, GetBewonersAantalQueryVariables>;
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
export type GetBurgerProfielQueryHookResult = ReturnType<typeof useGetBurgerProfielQuery>;
export type GetBurgerProfielLazyQueryHookResult = ReturnType<typeof useGetBurgerProfielLazyQuery>;
export type GetBurgerProfielQueryResult = Apollo.QueryResult<GetBurgerProfielQuery, GetBurgerProfielQueryVariables>;
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
export type GetKlantContactMomentenQueryHookResult = ReturnType<typeof useGetKlantContactMomentenQuery>;
export type GetKlantContactMomentenLazyQueryHookResult = ReturnType<typeof useGetKlantContactMomentenLazyQuery>;
export type GetKlantContactMomentenQueryResult = Apollo.QueryResult<GetKlantContactMomentenQuery, GetKlantContactMomentenQueryVariables>;
export const GetDocumentenDocument = gql`
    query GetDocumenten($id: UUID!) {
  getZaak(id: $id) {
    zaaktype {
      identificatie
    }
    documenten {
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
export function useGetDocumentenQuery(baseOptions: Apollo.QueryHookOptions<GetDocumentenQuery, GetDocumentenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDocumentenQuery, GetDocumentenQueryVariables>(GetDocumentenDocument, options);
      }
export function useGetDocumentenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDocumentenQuery, GetDocumentenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDocumentenQuery, GetDocumentenQueryVariables>(GetDocumentenDocument, options);
        }
export type GetDocumentenQueryHookResult = ReturnType<typeof useGetDocumentenQuery>;
export type GetDocumentenLazyQueryHookResult = ReturnType<typeof useGetDocumentenLazyQuery>;
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
export function useGetFormDefinitionByIdQuery(baseOptions: Apollo.QueryHookOptions<GetFormDefinitionByIdQuery, GetFormDefinitionByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFormDefinitionByIdQuery, GetFormDefinitionByIdQueryVariables>(GetFormDefinitionByIdDocument, options);
      }
export function useGetFormDefinitionByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFormDefinitionByIdQuery, GetFormDefinitionByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFormDefinitionByIdQuery, GetFormDefinitionByIdQueryVariables>(GetFormDefinitionByIdDocument, options);
        }
export type GetFormDefinitionByIdQueryHookResult = ReturnType<typeof useGetFormDefinitionByIdQuery>;
export type GetFormDefinitionByIdLazyQueryHookResult = ReturnType<typeof useGetFormDefinitionByIdLazyQuery>;
export type GetFormDefinitionByIdQueryResult = Apollo.QueryResult<GetFormDefinitionByIdQuery, GetFormDefinitionByIdQueryVariables>;
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
export function useGetFormDefinitionByNameQuery(baseOptions: Apollo.QueryHookOptions<GetFormDefinitionByNameQuery, GetFormDefinitionByNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFormDefinitionByNameQuery, GetFormDefinitionByNameQueryVariables>(GetFormDefinitionByNameDocument, options);
      }
export function useGetFormDefinitionByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFormDefinitionByNameQuery, GetFormDefinitionByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFormDefinitionByNameQuery, GetFormDefinitionByNameQueryVariables>(GetFormDefinitionByNameDocument, options);
        }
export type GetFormDefinitionByNameQueryHookResult = ReturnType<typeof useGetFormDefinitionByNameQuery>;
export type GetFormDefinitionByNameLazyQueryHookResult = ReturnType<typeof useGetFormDefinitionByNameLazyQuery>;
export type GetFormDefinitionByNameQueryResult = Apollo.QueryResult<GetFormDefinitionByNameQuery, GetFormDefinitionByNameQueryVariables>;
export const GetFormsDocument = gql`
    query GetForms {
  getFormList {
    name
    uuid
  }
}
    `;

/**
 * __useGetFormsQuery__
 *
 * To run a query within a React component, call `useGetFormsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFormsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFormsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFormsQuery(baseOptions?: Apollo.QueryHookOptions<GetFormsQuery, GetFormsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFormsQuery, GetFormsQueryVariables>(GetFormsDocument, options);
      }
export function useGetFormsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFormsQuery, GetFormsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFormsQuery, GetFormsQueryVariables>(GetFormsDocument, options);
        }
export type GetFormsQueryHookResult = ReturnType<typeof useGetFormsQuery>;
export type GetFormsLazyQueryHookResult = ReturnType<typeof useGetFormsLazyQuery>;
export type GetFormsQueryResult = Apollo.QueryResult<GetFormsQuery, GetFormsQueryVariables>;
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
export type GetGemachtigdeQueryHookResult = ReturnType<typeof useGetGemachtigdeQuery>;
export type GetGemachtigdeLazyQueryHookResult = ReturnType<typeof useGetGemachtigdeLazyQuery>;
export type GetGemachtigdeQueryResult = Apollo.QueryResult<GetGemachtigdeQuery, GetGemachtigdeQueryVariables>;
export const GetPersoonDataDocument = gql`
    query GetPersoonData {
  getPersoon {
    burgerservicenummer
    geslachtsaanduiding
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
export type GetPersoonDataQueryHookResult = ReturnType<typeof useGetPersoonDataQuery>;
export type GetPersoonDataLazyQueryHookResult = ReturnType<typeof useGetPersoonDataLazyQuery>;
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
export type GetPersoonQueryHookResult = ReturnType<typeof useGetPersoonQuery>;
export type GetPersoonLazyQueryHookResult = ReturnType<typeof useGetPersoonLazyQuery>;
export type GetPersoonQueryResult = Apollo.QueryResult<GetPersoonQuery, GetPersoonQueryVariables>;
export const GetTaakByIdDocument = gql`
    query GetTaakById($id: UUID!) {
  getTaakById(id: $id) {
    id
    formulier {
      type
      value
    }
    formId
    status
    date
    data
  }
}
    `;

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
export function useGetTaakByIdQuery(baseOptions: Apollo.QueryHookOptions<GetTaakByIdQuery, GetTaakByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTaakByIdQuery, GetTaakByIdQueryVariables>(GetTaakByIdDocument, options);
      }
export function useGetTaakByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTaakByIdQuery, GetTaakByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTaakByIdQuery, GetTaakByIdQueryVariables>(GetTaakByIdDocument, options);
        }
export type GetTaakByIdQueryHookResult = ReturnType<typeof useGetTaakByIdQuery>;
export type GetTaakByIdLazyQueryHookResult = ReturnType<typeof useGetTaakByIdLazyQuery>;
export type GetTaakByIdQueryResult = Apollo.QueryResult<GetTaakByIdQuery, GetTaakByIdQueryVariables>;
export const GetTakenDocument = gql`
    query GetTaken($zaakId: UUID) {
  getTaken(zaakUUID: $zaakId) {
    content {
      id
      objectId
      formulier {
        type
        value
      }
      formId
      title
      status
      date
      data
      verloopdatum
    }
  }
}
    `;

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
export type GetTakenQueryHookResult = ReturnType<typeof useGetTakenQuery>;
export type GetTakenLazyQueryHookResult = ReturnType<typeof useGetTakenLazyQuery>;
export type GetTakenQueryResult = Apollo.QueryResult<GetTakenQuery, GetTakenQueryVariables>;
export const GetZaakDocument = gql`
    query GetZaak($id: UUID!) {
  getZaak(id: $id) {
    uuid
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
export function useGetZaakQuery(baseOptions: Apollo.QueryHookOptions<GetZaakQuery, GetZaakQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetZaakQuery, GetZaakQueryVariables>(GetZaakDocument, options);
      }
export function useGetZaakLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetZaakQuery, GetZaakQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetZaakQuery, GetZaakQueryVariables>(GetZaakDocument, options);
        }
export type GetZaakQueryHookResult = ReturnType<typeof useGetZaakQuery>;
export type GetZaakLazyQueryHookResult = ReturnType<typeof useGetZaakLazyQuery>;
export type GetZaakQueryResult = Apollo.QueryResult<GetZaakQuery, GetZaakQueryVariables>;
export const GetZakenDocument = gql`
    query GetZaken {
  getZaken {
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
export type GetZakenQueryHookResult = ReturnType<typeof useGetZakenQuery>;
export type GetZakenLazyQueryHookResult = ReturnType<typeof useGetZakenLazyQuery>;
export type GetZakenQueryResult = Apollo.QueryResult<GetZakenQuery, GetZakenQueryVariables>;