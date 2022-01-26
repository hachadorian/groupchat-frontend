import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ... on User {
        id
        email
        image
        name
        bio
        phone
      }
      ... on Errors {
        message
      }
    }
  }
`;
