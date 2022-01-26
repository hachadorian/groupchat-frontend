import { gql } from "@apollo/client";

export const UPDATE_MUT = gql`
  mutation Update(
    $image: Upload
    $name: String
    $bio: String
    $phone: String
    $email: String
    $password: String
  ) {
    update(
      name: $name
      bio: $bio
      phone: $phone
      email: $email
      password: $password
      image: $image
    ) {
      ... on User {
        id
        password
        name
        bio
        phone
        email
        image
      }
      ... on Errors {
        message
      }
    }
  }
`;
