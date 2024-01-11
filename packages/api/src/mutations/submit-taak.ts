import {gql} from '@apollo/client';

export const MUTATION_SUBMIT_TAAK = gql`
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
