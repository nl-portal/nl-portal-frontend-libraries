import {FetchResult, GraphQLRequest} from '@apollo/client';
import {
  QUERY_GET_OBJECT_CONTACT_MOMENTEN,
  QUERY_GET_PERSOON,
  QUERY_GET_TAKEN,
  QUERY_GET_ZAKEN,
} from '@nl-portal/nl-portal-api';
import {cloneDeep} from 'lodash';

const getZaken: {request: GraphQLRequest; result: FetchResult<Record<string, any>>} = {
  request: {
    query: QUERY_GET_ZAKEN,
    variables: {
      id: '82cb13cf-d2f9-4e3e-ac07-751373035ecb',
    },
  },
  result: {
    data: {
      getZaak: {
        uuid: '82cb13cf-d2f9-4e3e-ac07-751373035ecb',
        url: 'https://openzaak-zgw.test.denhaag.nl/zaken/api/v1/zaken/82cb13cf-d2f9-4e3e-ac07-751373035ecb',
        omschrijving: '',
        identificatie: 'ZAAK-2023-0000007947',
        zaaktype: {
          identificatie: 'B0756',
          omschrijving: 'Bezwaarschrift',
          __typename: 'ZaakType',
        },
        startdatum: '2023-10-26',
        status: {
          datumStatusGezet: '2023-10-26T05:59:04.182077Z',
          statustype: {
            omschrijving: 'In behandeling genomen',
            isEindstatus: false,
            __typename: 'ZaakStatusType',
          },
          __typename: 'ZaakStatus',
        },
        statusGeschiedenis: [
          {
            datumStatusGezet: '2023-10-26T05:59:04.182077Z',
            statustype: {
              omschrijving: 'In behandeling genomen',
              isEindstatus: false,
              __typename: 'ZaakStatusType',
            },
            __typename: 'ZaakStatus',
          },
          {
            datumStatusGezet: '2023-10-26T05:57:46.333350Z',
            statustype: {
              omschrijving: 'Geregistreerd',
              isEindstatus: false,
              __typename: 'ZaakStatusType',
            },
            __typename: 'ZaakStatus',
          },
        ],
        statussen: [
          {
            omschrijving: 'Geregistreerd',
            __typename: 'StatusType',
          },
          {
            omschrijving: 'Geaccepteerd',
            __typename: 'StatusType',
          },
          {
            omschrijving: 'In behandeling genomen',
            __typename: 'StatusType',
          },
          {
            omschrijving: 'Afgehandeld',
            __typename: 'StatusType',
          },
        ],
        documenten: [
          {
            documentapi: 'openzaak',
            bestandsnaam: 'Certificaat WWJB.pdf',
            bestandsomvang: 60198,
            creatiedatum: '2023-10-26',
            formaat: '',
            identificatie: 'DOCUMENT-2023-0000007124',
            titel: 'Gegenereerd document',
            uuid: 'e7b6851c-4208-4ac0-8623-a087186850e5',
            __typename: 'Document',
          },
          {
            documentapi: 'openzaak',
            bestandsnaam: 'open-forms-Bezwaar maken overige zaken - DigiD.pdf',
            bestandsomvang: 31148,
            creatiedatum: '2023-10-26',
            formaat: 'application/pdf',
            identificatie: 'DOCUMENT-2023-0000007123',
            titel: 'Bezwaar maken overige zaken - DigiD',
            uuid: '613c6e1c-67fb-498d-97a4-966bd3d38cda',
            __typename: 'Document',
          },
        ],
        zaakdetails: {
          data: [
            {
              waarde: [
                {
                  key: 'Locatie',
                  waarde: 'Spui 70',
                  omschrijving: 'Locatie waar...',
                },
                {
                  key: 'Bedrag',
                  waarde: '€250',
                },
                {
                  type: 'table',
                  waarde: {
                    rows: [
                      [
                        {
                          key: 'periode',
                          type: 'date',
                          waarde: '2023-6-1',
                        },
                        {
                          key: 'bedrag',
                          waarde: '€250',
                        },
                        {
                          key: 'status',
                          waarde: 'Openstaand',
                        },
                      ],
                      [
                        {
                          key: 'periode',
                          type: 'date',
                          waarde: '2023-5-1',
                        },
                        {
                          key: 'bedrag',
                          waarde: '€250',
                        },
                        {
                          key: 'status',
                          waarde: 'Openstaand',
                        },
                      ],
                      [
                        {
                          key: 'periode',
                          type: 'date',
                          waarde: '2023-4-1',
                        },
                        {
                          key: 'bedrag',
                          waarde: '€250',
                        },
                        {
                          key: 'status',
                          waarde: 'Openstaand',
                        },
                      ],
                      [
                        {
                          key: 'periode',
                          type: 'date',
                          waarde: '2023-3-1',
                        },
                        {
                          key: 'bedrag',
                          waarde: '€250',
                        },
                        {
                          key: 'status',
                          waarde: 'Betaald',
                        },
                      ],
                      [
                        {
                          key: 'periode',
                          waarde: '',
                          omschrijving:
                            'Een voorbeeld van een lege row. Deze omschrijving is niet nodig voor een lege row.',
                        },
                      ],
                      [
                        {
                          key: 'periode',
                          type: 'bold',
                          waarde: 'Totaal',
                        },
                        {
                          key: 'bedrag',
                          waarde: '€1000',
                        },
                        {
                          key: 'status',
                          waarde: ['list', 'voorbeeld'],
                        },
                      ],
                    ],
                    headers: [
                      {
                        key: 'periode',
                        waarde: 'Periode',
                        omschrijving: 'Periode waarover betaald is',
                      },
                      {
                        key: 'bedrag',
                        waarde: 'Bedrag',
                      },
                      {
                        key: 'status',
                        waarde: 'Status',
                        omschrijving: 'Is het betaald?',
                      },
                    ],
                  },
                  heading: 'Betaalgeschiedenis',
                },
              ],
              heading: 'Kosten',
            },
            {
              waarde: [
                {
                  key: 'Locatie',
                  waarde: 'Spui 70',
                  omschrijving: 'Locatie waar...',
                },
                {
                  key: 'Bedrag',
                  waarde: '€250',
                },
              ],
              heading: 'Kosten nested',
            },
          ],
          zaak: 'https://openzaak-zgw.test.denhaag.nl/zaken/api/v1/zaken/82cb13cf-d2f9-4e3e-ac07-751373035ecb',
          __typename: 'ZaakDetails',
        },
        __typename: 'Zaak',
      },
    },
  },
};

const getObjectContactMomenten = {
  request: {
    query: QUERY_GET_OBJECT_CONTACT_MOMENTEN,
    variables: {
      objectUrl:
        'https://openzaak-zgw.test.denhaag.nl/zaken/api/v1/zaken/82cb13cf-d2f9-4e3e-ac07-751373035ecb',
    },
  },
  result: {
    data: {
      getObjectContactMomenten: {
        content: [
          {
            tekst: 'Gewoon een normaal bericht',
            kanaal: 'email',
            registratiedatum: '2023-10-26T06:02:19Z',
            __typename: 'ContactMoment',
          },
          {
            tekst: 'Beste inwoner, Uw zaak is in behandeling genomen',
            kanaal: 'emailjgkhseafdgxytuerl6tnkgfy8dddfdfdfassafgiuahmh',
            registratiedatum: '2023-10-05T12:54:24Z',
            __typename: 'ContactMoment',
          },
          {
            tekst: 'Beste inwoner; Er staat een taak voor U klaar',
            kanaal: 'sms',
            registratiedatum: '2023-10-05T12:53:08Z',
            __typename: 'ContactMoment',
          },
          {
            tekst: 'Dit is een sms',
            kanaal: 'sms',
            registratiedatum: '2023-10-05T12:48:18Z',
            __typename: 'ContactMoment',
          },
          {
            tekst: 'Hallo dit is een test',
            kanaal: 'email',
            registratiedatum: '2023-10-05T12:27:32Z',
            __typename: 'ContactMoment',
          },
          {
            tekst: 'Dit is een test',
            kanaal: 'MAIL',
            registratiedatum: '2023-10-05T08:56:17.320554Z',
            __typename: 'ContactMoment',
          },
          {
            tekst: 'Test tekst',
            kanaal: 'MAIL',
            registratiedatum: '2023-04-03T09:34:28Z',
            __typename: 'ContactMoment',
          },
        ],
        __typename: 'ContactMomentPage',
      },
    },
  },
};

const getTaken = {
  request: {
    query: QUERY_GET_TAKEN,
    variables: {
      zaakId: '82cb13cf-d2f9-4e3e-ac07-751373035ecb',
    },
  },
  result: {
    data: {
      getTaken: {
        content: [
          {
            id: '1a20092f-8d24-11ee-a314-d2c27970fbf4',
            objectId: '497e0c6b-ca5a-4603-882b-332e0b183322',
            formulier: {
              formuliertype: 'objecturl',
              value:
                'https://objecten-zgw.test.denhaag.nl/api/v2/objects/99697f7e-4c2b-4dd5-9bdd-bc9e7336ac02',
              __typename: 'TaakFormulier',
            },
            title: 'Aanleveren informatie',
            status: 'OPEN',
            date: '2023-11-27',
            data: {
              informatieverzoeken: [
                {
                  deadline: '2023-12-04T22:59:59.999Z',
                  toelichting: '',
                  hersteltermijn: true,
                  dagtekeningBrief: '2023-11-27T12:48:30.000Z',
                  stopHersteltermijn: '2023-11-27T12:51:27.626210570Z',
                  startHersteltermijn: '2023-11-27T12:48:43.589109572Z',
                  datumInformatieverzoek: '2023-11-27T12:48:30.000Z',
                  opleidingVolgendePersonen: '',
                  opTeVragenBenodigdeInformatie: {
                    partnerID: true,
                    jaarrekening: false,
                    balansrekening: false,
                    specificatiePensioen: false,
                    bewijsVanInschrijving: true,
                    laatsteInkomstenSpecificatie: false,
                    bankafschriftenAfgelopenMaand: false,
                    belastingaanslagAfgelopenJaar: false,
                    belastingaangifteAfgelopenJaar: false,
                    laatsteInkomstenSpecificatiePartner: false,
                    specifiekeBankafschriftenPerPeriode: true,
                    specifiekeBankafschriftenAfgelopenMaand: false,
                  },
                  bankrekeningNummersSpecifiekePeriode: '',
                },
                {
                  deadline: '2023-12-04T22:59:59.999Z',
                  toelichting: '',
                  hersteltermijn: true,
                  dagtekeningBrief: '2023-11-27T12:53:00.000Z',
                  startHersteltermijn: '2023-11-27T12:54:25.021822783Z',
                  datumInformatieverzoek: '2023-11-27T12:53:00.000Z',
                  opleidingVolgendePersonen: '',
                  opTeVragenBenodigdeInformatie: {
                    partnerID: true,
                    jaarrekening: true,
                    balansrekening: true,
                    specificatiePensioen: false,
                    bewijsVanInschrijving: true,
                    laatsteInkomstenSpecificatie: false,
                    bankafschriftenAfgelopenMaand: false,
                    belastingaanslagAfgelopenJaar: false,
                    belastingaangifteAfgelopenJaar: true,
                    laatsteInkomstenSpecificatiePartner: false,
                    specifiekeBankafschriftenPerPeriode: false,
                    specifiekeBankafschriftenAfgelopenMaand: false,
                  },
                },
              ],
            },
            verloopdatum: '2023-12-04T12:54:29.211',
            __typename: 'Taak',
          },
        ],
        __typename: 'TaakPage',
      },
    },
  },
};

const getPersoon = {
  request: {
    query: QUERY_GET_PERSOON,
    variables: {},
  },
  result: {
    data: {
      getPersoon: null,
    },
    errors: [],
  },
};

export const mocksRequestWithAll = [getZaken, getObjectContactMomenten, getTaken, getPersoon];

const cloneZaken = () => {
  const clone = cloneDeep(getZaken);
  if (clone.result.data) {
    clone.result.data.getZaak.documenten = [];
  }
  return clone;
};

const cloneContactmomenten = () => {
  const cloneConctactmomenten = cloneDeep(getObjectContactMomenten);
  if (cloneConctactmomenten.result.data) {
    cloneConctactmomenten.result.data.getObjectContactMomenten.content = [];
  }
  return cloneConctactmomenten;
};

export const mocksRequestWithoutDocuments = [
  cloneZaken(),
  getObjectContactMomenten,
  getTaken,
  getPersoon,
];

export const mocksRequestWithoutContactMomenten = [
  getZaken,
  cloneContactmomenten(),
  getTaken,
  getPersoon,
];
