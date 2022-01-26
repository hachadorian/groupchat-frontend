import { gql } from "@apollo/client";

export const CHANGEPASSWORD_MUT = gql`
  mutation Login($token: String!, $password: String!) {
    changePassword(token: $token, password: $password) {
      ... on Success {
        message
      }
      ... on Errors {
        message
      }
    }
  }
`;
