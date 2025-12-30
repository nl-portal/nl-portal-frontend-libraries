import { gql } from "@apollo/client";

export const OPEN_PRODUCT_FIELDS = gql`
  fragment openProductFields on OpenProductProduct {
    uuid
    url
    naam
    startDatum
    eindDatum
    gepubliceerd
    aanmaakDatum
    updateDatum
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
    acties {
      uuid
      naam
      productTypeUuid
    }
  }
`;
