import { gql } from "@apollo/client";

export const QUERY_GET_FORM_DEFINITION_BY_TASK_ID = gql`
  query GetFormDefinitionByTaskId($taskId: UUID!) {
    getFormDefinitionByTaskId(taskId: $taskId) {
      formDefinition
    }
  }
`;
