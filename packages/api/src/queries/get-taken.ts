import {gql} from '@apollo/client';
import {FORMULIER_FIELDS} from '../fragments/formulier';

export const QUERY_GET_TAKEN = gql`
  ${FORMULIER_FIELDS}
  query GetTaken($zaakId: UUID) {
    getTaken(zaakUUID: $zaakId) {
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
    }
  }
`;
