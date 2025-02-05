import { QUERY_GET_ZAKEN } from "@nl-portal/nl-portal-api";

const getContent = (pageSize?: number, isOpen?: boolean) => {
  let arrayCases = [
    {
      uuid: "0c6c5300-fd08-4fae-977d-c85a2c7535e8",
      omschrijving: "",
      identificatie: "ZAAK-2024-0000001324",
      zaaktype: {
        identificatie: "GESLOTENZAAK1",
        __typename: "ZaakType",
      },
      startdatum: "2024-02-01",
      status: {
        statustype: {
          isEindstatus: true,
          __typename: "ZaakStatusType",
        },
        __typename: "ZaakStatus",
      },
      __typename: "Zaak",
    },
    {
      uuid: "6f268986-17c2-4045-9340-94101bfad3ca",
      omschrijving: "",
      identificatie: "ZAAK-2024-0000001317",
      zaaktype: {
        identificatie: "OPENZAAK1",
        __typename: "ZaakType",
      },
      startdatum: "2024-01-01",
      status: {
        statustype: {
          isEindstatus: false,
          __typename: "ZaakStatusType",
        },
        __typename: "ZaakStatus",
      },
      __typename: "Zaak",
    },
    {
      uuid: "009e2451-44b3-4969-91e3-205d8b261fe1",
      omschrijving: "",
      identificatie: "ZAAK-2024-0000001263",
      zaaktype: {
        identificatie: "OPENZAAK2",
        __typename: "ZaakType",
      },
      startdatum: "2024-01-02",
      status: {
        statustype: {
          isEindstatus: false,
          __typename: "ZaakStatusType",
        },
        __typename: "ZaakStatus",
      },
      __typename: "Zaak",
    },
    {
      uuid: "e7c34f50-1d2e-4269-8eef-18da509358f4",
      omschrijving: "",
      identificatie: "ZAAK-2024-0000001261",
      zaaktype: {
        identificatie: "GESLOTENZAAK2",
        __typename: "ZaakType",
      },
      startdatum: "2024-02-02",
      status: {
        statustype: {
          isEindstatus: true,
          __typename: "ZaakStatusType",
        },
        __typename: "ZaakStatus",
      },
      __typename: "Zaak",
    },
    {
      uuid: "5ea91f84-49c3-4343-9278-c63db0944d39",
      omschrijving: "",
      identificatie: "ZAAK-2024-0000004448",
      zaaktype: {
        identificatie: "aanvraag-financiele-ondersteuning-ondernemers-beha",
        __typename: "ZaakType",
      },
      startdatum: "2024-04-03",
      status: {
        statustype: {
          isEindstatus: false,
          __typename: "ZaakStatusType",
        },
        __typename: "ZaakStatus",
      },
      __typename: "Zaak",
    },
    {
      uuid: "fdaf4a9a-3ba0-4e5b-9f4c-60a65a7e4b2a",
      omschrijving: "",
      identificatie: "ZAAK-2024-0000004427",
      zaaktype: {
        identificatie: "B0756",
        __typename: "ZaakType",
      },
      startdatum: "2024-04-03",
      status: {
        statustype: {
          isEindstatus: true,
          __typename: "ZaakStatusType",
        },
        __typename: "ZaakStatus",
      },
      __typename: "Zaak",
    },
    {
      uuid: "69449e87-a2a9-4fda-b04b-fb52d8e20c2a",
      omschrijving: "",
      identificatie: "ZAAK-2024-0000004424",
      zaaktype: {
        identificatie: "B0756",
        __typename: "ZaakType",
      },
      startdatum: "2024-04-03",
      status: {
        statustype: {
          isEindstatus: true,
          __typename: "ZaakStatusType",
        },
        __typename: "ZaakStatus",
      },
      __typename: "Zaak",
    },
    {
      uuid: "e31b05ea-4747-4257-a68d-bc29048c4d2f",
      omschrijving: "",
      identificatie: "ZAAK-2024-0000004417",
      zaaktype: {
        identificatie: "B0756",
        __typename: "ZaakType",
      },
      startdatum: "2024-04-02",
      status: {
        statustype: {
          isEindstatus: true,
          __typename: "ZaakStatusType",
        },
        __typename: "ZaakStatus",
      },
      __typename: "Zaak",
    },
    {
      uuid: "bbf7d96e-eea9-4379-aff6-09a5576913c1",
      omschrijving: "",
      identificatie: "ZAAK-2024-0000004414",
      zaaktype: {
        identificatie: "B0756",
        __typename: "ZaakType",
      },
      startdatum: "2024-04-02",
      status: {
        statustype: {
          isEindstatus: true,
          __typename: "ZaakStatusType",
        },
        __typename: "ZaakStatus",
      },
      __typename: "Zaak",
    },
    {
      uuid: "e5ece739-f221-4a0c-b45a-0d3624a3256b",
      omschrijving: "",
      identificatie: "ZAAK-2024-0000004410",
      zaaktype: {
        identificatie: "B0756",
        __typename: "ZaakType",
      },
      startdatum: "2024-04-02",
      status: {
        statustype: {
          isEindstatus: true,
          __typename: "ZaakStatusType",
        },
        __typename: "ZaakStatus",
      },
      __typename: "Zaak",
    },
    {
      uuid: "edfb7b88-b202-40aa-9a3a-c6dd93939df5",
      omschrijving: "",
      identificatie: "ZAAK-2024-0000004406",
      zaaktype: {
        identificatie: "B0756",
        __typename: "ZaakType",
      },
      startdatum: "2024-04-02",
      status: {
        statustype: {
          isEindstatus: true,
          __typename: "ZaakStatusType",
        },
        __typename: "ZaakStatus",
      },
      __typename: "Zaak",
    },
    {
      uuid: "b5ffd864-7e62-4b09-95de-5e47093f4273",
      omschrijving: "",
      identificatie: "ZAAK-2024-0000004404",
      zaaktype: {
        identificatie: "aanvraag-financiele-ondersteuning-ondernemers-beha",
        __typename: "ZaakType",
      },
      startdatum: "2024-04-02",
      status: {
        statustype: {
          isEindstatus: false,
          __typename: "ZaakStatusType",
        },
        __typename: "ZaakStatus",
      },
      __typename: "Zaak",
    },
    {
      uuid: "c921d614-339b-4a3e-afc2-24d1e247bb3e",
      omschrijving: "",
      identificatie: "ZAAK-2024-0000004402",
      zaaktype: {
        identificatie: "aanvraag-financiele-ondersteuning-ondernemers-beha",
        __typename: "ZaakType",
      },
      startdatum: "2024-04-02",
      status: {
        statustype: {
          isEindstatus: false,
          __typename: "ZaakStatusType",
        },
        __typename: "ZaakStatus",
      },
      __typename: "Zaak",
    },
    {
      uuid: "9d0b51c8-b0ec-4e94-b142-9549dedadf06",
      omschrijving: "",
      identificatie: "ZAAK-2024-0000004398",
      zaaktype: {
        identificatie: "aanvraag-financiele-ondersteuning-ondernemers-beha",
        __typename: "ZaakType",
      },
      startdatum: "2024-04-02",
      status: {
        statustype: {
          isEindstatus: false,
          __typename: "ZaakStatusType",
        },
        __typename: "ZaakStatus",
      },
      __typename: "Zaak",
    },
    {
      uuid: "7c1d2226-b4ab-49c9-8405-3261c2edb7df",
      omschrijving: "",
      identificatie: "ZAAK-2024-0000004397",
      zaaktype: {
        identificatie: "aanvraag-financiele-ondersteuning-ondernemers-beha",
        __typename: "ZaakType",
      },
      startdatum: "2024-04-02",
      status: {
        statustype: {
          isEindstatus: false,
          __typename: "ZaakStatusType",
        },
        __typename: "ZaakStatus",
      },
      __typename: "Zaak",
    },
    {
      uuid: "8c6bbd96-23d1-4695-9479-f1d7e13e633e",
      omschrijving: "",
      identificatie: "ZAAK-2024-0000004396",
      zaaktype: {
        identificatie: "aanvraag-financiele-ondersteuning-ondernemers-beha",
        __typename: "ZaakType",
      },
      startdatum: "2024-04-02",
      status: {
        statustype: {
          isEindstatus: false,
          __typename: "ZaakStatusType",
        },
        __typename: "ZaakStatus",
      },
      __typename: "Zaak",
    },
    {
      uuid: "0b03b796-c996-4291-be75-a2f3ef36f12c",
      omschrijving: "",
      identificatie: "ZAAK-2024-0000004387",
      zaaktype: {
        identificatie: "aanvraag-financiele-ondersteuning-ondernemers-beha",
        __typename: "ZaakType",
      },
      startdatum: "2024-04-02",
      status: {
        statustype: {
          isEindstatus: false,
          __typename: "ZaakStatusType",
        },
        __typename: "ZaakStatus",
      },
      __typename: "Zaak",
    },
    {
      uuid: "a606b02e-0d6b-4244-85f5-1a8513232818",
      omschrijving: "",
      identificatie: "ZAAK-2024-0000004386",
      zaaktype: {
        identificatie: "aanvraag-financiele-ondersteuning-ondernemers-beha",
        __typename: "ZaakType",
      },
      startdatum: "2024-04-02",
      status: {
        statustype: {
          isEindstatus: false,
          __typename: "ZaakStatusType",
        },
        __typename: "ZaakStatus",
      },
      __typename: "Zaak",
    },
    {
      uuid: "03e4a609-d619-4172-b272-fce9da3a270a",
      omschrijving: "",
      identificatie: "ZAAK-2024-0000004385",
      zaaktype: {
        identificatie: "aanvraag-financiele-ondersteuning-ondernemers-beha",
        __typename: "ZaakType",
      },
      startdatum: "2024-04-02",
      status: {
        statustype: {
          isEindstatus: false,
          __typename: "ZaakStatusType",
        },
        __typename: "ZaakStatus",
      },
      __typename: "Zaak",
    },
    {
      uuid: "04b244a9-c46b-4648-9e5e-a30e2569aa81",
      omschrijving: "",
      identificatie: "ZAAK-2024-0000004384",
      zaaktype: {
        identificatie: "aanvraag-financiele-ondersteuning-ondernemers-beha",
        __typename: "ZaakType",
      },
      startdatum: "2024-04-02",
      status: {
        statustype: {
          isEindstatus: false,
          __typename: "ZaakStatusType",
        },
        __typename: "ZaakStatus",
      },
      __typename: "Zaak",
    },
  ];

  if (isOpen === true)
    arrayCases = arrayCases.filter((c) => !c.status?.statustype.isEindstatus);
  if (isOpen === false)
    arrayCases = arrayCases.filter((c) => c.status?.statustype.isEindstatus);

  return arrayCases.slice(0, pageSize);
};

interface Props {
  pageSize?: number;
  isOpen?: boolean;
  totalElements?: number;
}

export const getZaken = ({ pageSize, isOpen, totalElements = 10 }: Props) => {
  let variables = {};
  const content = getContent(pageSize, isOpen);

  if (pageSize) variables = { ...variables, pageSize };
  if (typeof isOpen == "boolean") variables = { ...variables, isOpen };

  return {
    request: {
      query: QUERY_GET_ZAKEN,
      variables,
    },
    result: {
      data: {
        getZaken: {
          content,
          totalElements,
          totalPages: 1,
        },
      },
    },
  };
};
