import { gql } from "@apollo/client";

export const QUERY_GET_BEWONER_AANTAL = gql`
  query GetBewonersAantal($adresseerbaarObjectIdentificatie: String!) {
    getBewonersAantal(
      adresseerbaarObjectIdentificatie: $adresseerbaarObjectIdentificatie
    )
  }
`;
