import { gql } from "@apollo/client";

export const MESSAGE_ADDED = gql`
  subscription {
    messageAdded {
      id
      channel_id
      user_id
      name
      image
      message
      created_at
    }
  }
`;
