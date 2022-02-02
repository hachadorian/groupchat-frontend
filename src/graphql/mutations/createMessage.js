import { gql } from "@apollo/client";

export const CREATEMESSAGE_MUT = gql`
  mutation CreateMessage($channelID: String!, $message: String!) {
    createMessage(channelID: $channelID, message: $message) {
      ... on Message {
        id
        user_id
        name
        image
        message
        created_at
      }
      ... on Errors {
        message
      }
    }
  }
`;
