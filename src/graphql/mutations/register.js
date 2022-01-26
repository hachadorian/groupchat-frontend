import { gql } from "@apollo/client";

export const REGISTER_MUT = gql`
  mutation register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      ... on User {
        id
        email
      }
      ... on Errors {
        message
      }
    }
  }
`;
