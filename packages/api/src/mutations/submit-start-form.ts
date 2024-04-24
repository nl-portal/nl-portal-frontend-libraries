import { gql } from "@apollo/client";

export const MUTATION_SUBMIT_START_FORM = gql`
  mutation SaveStartFormToObjectsApi($submission: JSON!, $name: String!) {
    saveStartFormToObjectsApi(submission: $submission, name: $name)
  }
`;
