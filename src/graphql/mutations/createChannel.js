import { gql } from "@apollo/client";

export const CREATECHANNEL_MUT = gql`
  mutation CreateChannel($name: String!, $description: String!) {
    createChannel(name: $name, description: $description) {
      ... on Channel {
        id
        name
        description
      }
      ... on Errors {
        message
      }
    }
  }
`;
