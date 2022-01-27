import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query {
    me {
      id
      image
      name
      bio
      phone
      email
    }
  }
`;
