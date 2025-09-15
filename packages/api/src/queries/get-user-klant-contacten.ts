import { gql } from "@apollo/client";

export const QUERY_GET_USER_KLANT_CONTACTEN = gql`
  query GetUserKlantContacten(
    $identificatorType: OnderwerpObjectIndentificatorType!
    $identificatorId: UUID!
  ) {
    getUserKlantContacten(
      identificatorType: $identificatorType
      identificatorId: $identificatorId
    ) {
      uuid
      inhoud
      kanaal
      onderwerp
      plaatsgevondenOp
      hadBetrokkenActoren {
        indicatieActief
        naam
      }
    }
  }
`;
